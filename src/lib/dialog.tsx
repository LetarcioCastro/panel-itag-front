import {
  Dialog as Root,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { DialogProps } from "@radix-ui/react-dialog";

export function Dialog(props: DialogProps) {

  return (
    <Root {...props} />
  )

}

Dialog.Content = DialogContent
Dialog.Header = DialogHeader
Dialog.Title = DialogTitle
Dialog.Description = DialogDescription
Dialog.Trigger = DialogTrigger
Dialog.Footer = DialogFooter

