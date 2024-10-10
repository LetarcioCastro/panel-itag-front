import { authorizeRest } from "@/api"
import createEvent from "./event"
import { redirect, useNavigate } from "react-router-dom"
import { ReactNode, useEffect } from "react"
import { toast } from "sonner"

const user_type_id_panel = 1

const tryGetAuthStorage = () => JSON.parse(localStorage.getItem('auth') as string) || { authorize: false }

let auth = tryGetAuthStorage()

export const getAuth = () => auth

const [useListener, dispatch] = createEvent(getAuth)

const preparePermissions = (roles: any[]) => {

  const permissions: any = {}
  let permissionsDisable = true

  roles?.forEach?.((data) => {

    permissionsDisable = false

    data.permissions?.forEach?.(({ name }: any) => {

      permissions[name] = true

    })

  })

  return {
    permissions,
    permissionsDisable,
  }

}

export const authorizeUser = ({ user, token }: { user: any, token: string }) => {

  authorizeRest({ token })

  auth = {
    user,
    ...preparePermissions(user.roles),
    token,
    admin: user.user_type_id == user_type_id_panel,
    authorize: true
  }

  localStorage.setItem('auth', JSON.stringify({
    user, token, authorize: true
  }))

  dispatch()
}

auth?.authorize && (authorizeUser({
  user: auth.user,
  token: auth.token
}))

export const logout = () => {
  localStorage.removeItem('auth')
  auth = {
    authorize: false
  }
  redirect('/login')
  dispatch()
}

export const useAuth = () => useListener()

export const isPanel = () => !!auth?.admin

export const userCan = (...permissions: string[]) => {

  if (auth.permissionsDisable) return true

  for (let name of permissions) if (!auth.permissions?.[name]) return false

  return true

}

export const userCanAny = (...permissions: string[]) => {

  if (permissions.length <= 0 || auth.permissionsDisable) return true

  for (let name of permissions) if (auth.permissions?.[name] == true) return true

  return false

}

export const canAction = <T extends (permissions: string[], callback: () => ReactNode) => ReactNode | boolean>(action: T, permissions: string[]) => (callback: () => ReactNode) => action(permissions, callback)

export const panelCan = (permissions: string[], callback: () => ReactNode) => isPanel() ? userCan(...permissions) ? callback() : true : false

export const panelCanAny = (permissions: string[], callback: () => ReactNode) => isPanel() ? userCanAny(...permissions) ? callback() : true : false

export const clientCan = (callback: () => ReactNode) => !isPanel() ? callback() : false

export const bothCan = (permissions: string[], callback: () => ReactNode) => !isPanel() || userCan(...permissions) ? callback() : false

export const bothCanAny = (permissions: string[], callback: () => ReactNode) => !isPanel() || userCanAny(...permissions) ? callback() : false

export const useMiddleware = (...deps: any[]) => {

  const redirect = useNavigate()

  useEffect(() => {

    if (auth?.authorize) return

    toast.error('Acesso negado')
    redirect('/login')

  }, deps)

  return !auth?.authorize

}
