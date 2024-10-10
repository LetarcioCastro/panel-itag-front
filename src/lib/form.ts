import { FieldValues, useForm as useFormPrimitive, UseFormProps } from "react-hook-form";
import { zodResolver as zr } from "@hookform/resolvers/zod"
import { z } from "zod";

export const useForm = ({ zodResolver, ...props }: UseFormProps<FieldValues, any> & { zodResolver: z.Schema<any, any>}) => useFormPrimitive({ resolver: zr(zodResolver), ...props })

