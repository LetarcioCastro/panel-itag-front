const storageKey = 'data-storage'

const getLocalStorage = () => {

  try {
    return JSON.parse(localStorage.getItem(storageKey) || '{}') || {}
  } catch {
    return {}
  }

}

const storage = getLocalStorage()

export const removeStorage = (name: string) => delete storage[name]

export const setStorage = (name: string, value: any) => storage[name] = value

export const saveStorage = () => localStorage.setItem(storageKey, JSON.stringify(storage))

export const saveInStorage = (name: string, value: any) => {
  setStorage(name, value)
  saveStorage()
}

export const removeInStorage = (name: string) => {
  removeStorage(name)
  saveStorage()
}

export const getStorage = (name: string) => storage[name]
