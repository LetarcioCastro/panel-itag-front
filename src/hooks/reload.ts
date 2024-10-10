import createEvent, { createAdvancedEvent } from './event';

let reloads: { [key: string]: number } = {}

const [useListener, dispatch] = createAdvancedEvent({
  get: (name) => reloads[name],
  die: () => reloads = {}
})

export const useReload = (name: string) => useListener(name)

export const reload = (name: string) => {
  reloads[name] ??= 0
  reloads[name]++
  dispatch(({ data }) => data == name)
}

export const createReload = () => {

  let count = 0

  const [useListener, dispatch] = createEvent(() => count)

  return [useListener, () => {
    count++
    dispatch()
  }]


}