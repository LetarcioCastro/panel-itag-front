import { createContext, ReactNode, useContext } from "react"

const StateContext = createContext({ value: 'default' })

export function State({ value, children }: { value: string, children: ReactNode }) {

  return (
    <StateContext.Provider value={{ value }}>
      {children}
    </StateContext.Provider>
  )

}

export function StateContent({ state, children }: { state: string, children: ReactNode }) {

  const { value } = useContext(StateContext)

  return state == value && children

}

State.Content = StateContent

export function StateDefault({ children }: { children: ReactNode }) {

  return (
    <StateContent state="default">
      {children}
    </StateContent>
  )

}

State.Default = StateDefault

export function StateLoading({ children }: { children: ReactNode }) {

  return (
    <StateContent state="loading">
      {children}
    </StateContent>
  )

}

State.Loading = StateLoading

export function StateSuccess({ children }: { children: ReactNode }) {

  return (
    <StateContent state="success">
      {children}
    </StateContent>
  )

}

State.Success = StateSuccess

export function StateError({ children }: { children: ReactNode }) {

  return (
    <StateContent state="error">
      {children}
    </StateContent>
  )

}

State.Error = StateError