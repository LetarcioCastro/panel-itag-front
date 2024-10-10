import { useEffect, useSyncExternalStore } from "react"

export default function createEvent<DataType>(get: (value?: any) => DataType): [(value?: any) => DataType, () => void] {

  let listeners: Function[] = []

  const addListener = (listener: any) => (
    listeners.push(listener),
    () => { listeners = listeners.filter(l => l != listener) }
  )

  const useListen = (value?: any): DataType => useSyncExternalStore(addListener, () => get(value))

  const dispatch = () => listeners.forEach(l => l())

  return [useListen, dispatch]

}

type listenerType = { listener: Function, data: any }

export const createAdvancedEvent = <DataType>({ get, listenDie, die }: { get: (value?: any) => DataType, listenDie?: (value: any) => any, die?: () => any }): [(value?: any) => DataType, (filter?: (listener: listenerType) => boolean) => void] => {

  let listeners: listenerType[] = []

  const addListener = (listener: listenerType) => (
    listeners.push(listener),
    () => { listeners = listeners.filter(l => l.listener != listener.listener) }
  )

  const useListen = (value?: any): DataType => {

    useEffect(() => {

      return () => {
        listenDie?.(value)
        listeners.length == 0 && die?.()
      }

    }, [])

    return useSyncExternalStore((listener: any) => addListener({ listener, data: value }), () => get(value))
  }

  const dispatch = (filter: (listener: listenerType) => boolean = () => true) => listeners.filter(filter).forEach(({ listener }) => listener())

  return [useListen, dispatch]

}