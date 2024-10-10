import { createAdvancedEvent } from "@/hooks/event"

let dialogsState: { [key: string]: { open: boolean, data?: any } } = {}

const [useListener, dispatch] = createAdvancedEvent<boolean>({
  get: (name) => !!dialogsState[name]?.open,
  die: () => dialogsState = {}
})

export const useDialog = (name: string) => [useListener(name), dialogsState[name]?.data]

export const openDialog = (name: string, open: boolean = true, data?: any) => {

  dialogsState[name] ??= {
    open,
    data,
  }

  dialogsState[name].open = open
  data != undefined && (dialogsState[name].data = data)

  dispatch(({ data }) => data == name)
}

export const setOpenDialog = (name: string) => (value: boolean) => openDialog(name, value)

export const clearDialogData = (name: string) => delete dialogsState[name]?.data

export const dialogEvent = (name: string = crypto.randomUUID()) => ({
  use: () => useDialog(name),
  open: (value: boolean, data?: any) => openDialog(name, value, data),
  clear: () => clearDialogData(name),
  get: () => dialogsState[name]?.data
})