import { type ClassValue, clsx } from "clsx"
import { useEffect } from "react"
import { UseFormReturn } from "react-hook-form"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const cnt = (...values: string[]) => values.map(value => value.replace(/\n/g, '').replace(/ +/g, ' ').trim()).join(' ')

export const timer = (timer: number = 500) => new Promise(resolve => setTimeout(resolve, timer))

export const randomRange = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min

export const useAsyncEffect = (effect: Function, deps: any[] = []) => {

  useEffect(() => {

    effect()

  }, deps)

}

export const onSubmitted = (form: UseFormReturn<any>, callback: () => any) => {

  useEffect(() => {

    form.formState.isSubmitSuccessful && callback()

  }, [form.reset, form.formState.isSubmitSuccessful])

}


export type anyObj = { [key: string | number | symbol]: any }

export const isObj = (value: any) => typeof value === 'object' && !Array.isArray(value) && value != null

export const getMonthInterval = (date = new Date()) => {

  return [new Date(date.getFullYear(), date.getMonth(), 1), new Date(date.getFullYear(), date.getMonth() + 1, 0)]

}

export const valideCPF = (CPF: string) => {

  const strCPF = CPF.replace(/[^0-9]/g, '')

  if ((/(\d)\1{10}/).test(strCPF)) return false

  let sum = 0;

  for (let i = 0; i < 9; i++) sum += strCPF[i] as any * (10 - i)
  if (((sum * 10) % 11) % 10 != strCPF[9] as any) return false;

  sum = 0;
  for (let i = 1; i < 10; i++) sum += strCPF[i] as any * (11 - i)
  if (((sum * 10) % 11) % 10 != strCPF[10] as any) return false;

  return true;

}

export const valideCNPJ = (cnpj: string) => {
  var b = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

  var c = cnpj.replace(/[^\d]/g, '')

  if (c.length !== 14)
    return false

  if (/0{14}/.test(c))
    return false

  for (var i = 0, n = 0; i < 12; n += (c[i] as any) * b[++i]);
  if ((c[12] as any) != (((n %= 11) < 2) ? 0 : 11 - n))
    return false

  for (var i = 0, n = 0; i <= 12; n += (c[i] as any) * b[i++]);
  if ((c[13] as any) != (((n %= 11) < 2) ? 0 : 11 - n))
    return false

  return true
}

export const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export const monthsShort = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Maio',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
]

export const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

export const weekShort = [
  'Dom',
  'Seg',
  'Ter',
  'Qua',
  'Qui',
  'Sex',
  'Sab',
]
