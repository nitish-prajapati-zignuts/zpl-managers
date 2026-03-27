"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useChangePassword } from "@/app/services/query"
import { useAuthStore } from "@/lib/store"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  oldPassword: z.string().min(1, "Old password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
})

interface ChangePasswordDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ChangePasswordDialog({ open, onOpenChange }: ChangePasswordDialogProps) {
  const { user } = useAuthStore()
  const { mutate, isPending } = useChangePassword()
  const [error, setError] = React.useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user?.id) return

    setError(null)
    mutate(
      {
        id: user.id,
        originalPassword: values.oldPassword,
        newPassword: values.newPassword,
      },
      {
        onSuccess: () => {
          onOpenChange(false)
          form.reset()
          alert("Password changed successfully!")
        },
        onError: (err: any) => {
          setError(err.message || "Something went wrong")
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Enter your old password and a new password to update your credentials.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Old Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              {...form.register("oldPassword")}
            />
            {form.formState.errors.oldPassword && (
              <p className="text-[0.8rem] font-medium text-destructive">
                {form.formState.errors.oldPassword.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">New Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              {...form.register("newPassword")}
            />
            {form.formState.errors.newPassword && (
              <p className="text-[0.8rem] font-medium text-destructive">
                {form.formState.errors.newPassword.message}
              </p>
            )}
          </div>

          {error && <p className="text-sm font-medium text-destructive">{error}</p>}
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Change Password
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
