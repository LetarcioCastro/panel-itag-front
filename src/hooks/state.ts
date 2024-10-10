import { timer } from "@/utils"
import { useState } from "react"

export type stateType = 'default' | 'loading' | 'success' | 'error'

export const useRestState = (initState: stateType = 'default') => {

  const [state, setState] = useState(initState)

  return {
    current: state,
    set: setState,
    loading: () => setState('loading'),
    default: () => setState('default'),
    error: async (time?: number) => {

      setState('error')
      await timer(time)
      setState('default')

    },
    success: async (time?: number) => {

      setState('success')
      await timer(time)
      setState('default')

    },
  }

}