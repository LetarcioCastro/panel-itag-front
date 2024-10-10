import { createContext, ReactNode, useContext } from "react";

import {
  Form as FormUi,
  FormControl,
  FormDescription,
  FormField as FormFieldUi,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { twMerge } from "tailwind-merge";
import { ControllerProps, FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import { Input, InputProps } from "../ui/input";
import { Button, ButtonProps } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Matcher } from "react-day-picker";
import { Textarea, TextareaProps } from "../ui/textarea";
import { useNumberFormat } from "@react-input/number-format";
import { Checkbox } from "../ui/checkbox";
import { useMask } from "@react-input/mask";
import { InputPassword } from "../Inputs/Password";
import { Switch } from "../ui/switch";

const FormContext = createContext<Partial<UseFormReturn<any>>>({})

export const useFormContext = () => useContext(FormContext)

export function Form({ children, onSubmit, className, ...props }: UseFormReturn<any> & { className?: string, children: ReactNode, onSubmit?: (data: any) => any }) {

  return (
    <FormContext.Provider value={props} >
      <FormUi {...props}>
        <form onSubmit={props.handleSubmit((data) => { onSubmit?.(data) })} {...props} className={twMerge('flex flex-col gap-3', className)}>
          {children}
        </form>
      </FormUi>
    </FormContext.Provider>
  )

}

export function FormRow({ children }: { children: ReactNode }) {

  return (
    <div className="flex flex-col gap-4 gap-y-3 sm:flex-row">
      {children}
    </div>
  )

}

Form.Row = FormRow

type FormFielType = ControllerProps<FieldValues, FieldPath<FieldValues>>

export function FormField({ control: ctl, name, children }: Omit<FormFielType, 'render'> & { children: FormFielType['render'] }) {

  const { control = ctl } = useFormContext()

  return (
    <FormFieldUi
      control={control}
      name={name}
      render={children}
    />
  )

}

export function FormFooter({ children }: { children: ReactNode }) {

  return (
    <div className="flex gap-2 mt-2 justify-end">
      {children}
    </div>
  )

}

export function FormInputField({ name, children, ...props }: InputProps & { name: string, placeholder?: string }) {

  return (
    <FormField name={name}>
      {({ field }) => (
        <FormItem className="flex-1">
          <FormLabel>
            {children} <Form.Message />
          </FormLabel>
          <FormControl>
            <Input {...props} {...field} />
          </FormControl>
        </FormItem>
      )}
    </FormField>
  )

}


export function FormInputPassword({
  name,
  children,
  ...props
}: InputProps & { name: string; placeholder?: string }) {
  return (
    <FormField name={name}>
      {({ field }) => (
        <FormItem className="flex-1">
          <FormLabel>
            {children} <Form.Message />
          </FormLabel>
          <FormControl>
            <InputPassword {...props} {...field} />
          </FormControl>
        </FormItem>
      )}
    </FormField>
  );
}

export function FormInputFieldPhone({ name, children, ...props }: InputProps & { name: string, placeholder?: string }) {

  const cell = useMask({
    mask: '(__) ____-_____', replacement: { _: /\d/ }, modify: (string: string) => {

      return {
        mask: string.length == 11 ? '(__) _____-____' : '(__) ____-_____'
      }

    }
  })

  return (
    <FormField name={name}>
      {({ field }) => (
        <FormItem>
          <FormLabel>
            {children} <Form.Message />
          </FormLabel>
          <FormControl>
            <Input
              {...props}
              {...field}
              ref={cell}
            />
          </FormControl>
        </FormItem>
      )}
    </FormField>
  )

}



export function FormInputDateFiled({ name, children, placeholder, disabled }: { name: string, children: ReactNode, placeholder?: string, disabled?: Matcher | Matcher[] }) {

  const form = useFormContext()

  return (
    <FormField name={name}>
      {({ field }) => (
        <FormItem>
          <FormLabel>
            {children} <FormMessage />
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <button
                  className={cn(
                    "hover:bg-zinc-100 focus:outline-primary text-sm dark:hover:bg-zinc-900/80 data-[state=open]:ring-2 data-[state=open]:ring-primary w-full pl-3 text-left font-normal h-10 flex justify-between items-center px-3 border border-border rounded-md bg-card",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, 'dd/MM/yyyy')
                  ) : (
                    <span>{placeholder}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={(date) => {
                  date ? field.onChange(date) : form.resetField?.(name)
                }}
                disabled={disabled}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    </FormField>
  )

}

export function FormTextareaFiled({ name, children, ...props }: TextareaProps & { name: string, placeholder?: string }) {
  return (
    <FormField name={name}>
      {({ field }) => (
        <FormItem>
          <FormLabel>
            {children} <Form.Message />
          </FormLabel>
          <FormControl>
            <Textarea
              {...props}
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    </FormField>
  )

}


export function FormBtnSubmit({ children, ...props }: ButtonProps) {

  return (
    <Button {...props} type="submit">
      {children}
    </Button>
  )

}

export function FormCheckbox({ children, name }: InputProps & { name: string, children?: ReactNode }) {

  return (
    <FormField name={name}>
      {({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <FormLabel className="text-sm font-normal">
            {children}
          </FormLabel>
        </FormItem>
      )}
    </FormField>

  )

}


export function FormSwitch({ children, name }: InputProps & { name: string, children?: ReactNode }) {

  return (
    <FormField name={name}>
      {({ field }) => (
        <label className="contents">
          <FormItem className="flex items-center gap-3 space-y-0 mt-2">
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel className="font-medium cursor-pointer">
              {children} <FormMessage />
            </FormLabel>
          </FormItem>
        </label>
      )}
    </FormField>

  )

}


export function FormInputBrCoin({ children, name, onChange, ...props }: InputProps & { name: string, placeholder?: string }) {

  const format = useNumberFormat({ currency: 'BRL', format: 'currency' });

  return (
    <FormField name={name}>
      {({ field }) => (
        <FormItem>
          <FormLabel>
            {children} <Form.Message />
          </FormLabel>
          <FormControl>
            <Input {...props} {...field} placeholder="R$ 0,00" ref={format} />
          </FormControl>
        </FormItem>
      )}
    </FormField>
  )

}

Form.Footer = FormFooter
Form.BtnSubmit = FormBtnSubmit
Form.Field = FormField
Form.Input = FormInputField
Form.Password = FormInputPassword;
Form.Date = FormInputDateFiled
Form.Textarea = FormTextareaFiled
Form.Phone = FormInputFieldPhone
Form.Control = FormControl
Form.InputBrCoin = FormInputBrCoin
Form.Checkbox = FormCheckbox
Form.Switch = FormSwitch
Form.Desc = FormDescription
Form.Item = FormItem
Form.Label = FormLabel
Form.Message = FormMessage
