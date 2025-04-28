'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"
import { useAddNoticeData } from "@/queries/useNoticeQuery"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { noticeSchema } from "@/schema"
import { useState, useTransition } from "react"
import { AlertBox } from "../blocks/Alert"
import {BeatLoader} from 'react-spinners'

export function AddNotice() {

  const {mutate, isPending: isLoading, data} = useAddNoticeData()
  
    const [isPending, startTransition] = useTransition()
    const [success, setSuccess] = useState<string | undefined>("")
    const [error, setError] = useState<string | undefined>("")
  

  const form = useForm<z.infer<typeof noticeSchema>>({
    resolver: zodResolver(noticeSchema),
    defaultValues: {
      subject: "",
      description: "",
      role: "EMPLOYEE"
    },
  })


  const onSubmit = (values: z.infer<typeof noticeSchema>) =>{

    console.log(values)

    startTransition(()=>{
      mutate(values)

      if(data?.success){
        setSuccess(data?.success)
      }

      if(data?.error){
        setError(data?.error)
      }

    })




  }
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Notice</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Notice</DialogTitle>
          <DialogDescription>
            Add notice Page
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="Subject" disabled={isPending} {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Description" disabled={isPending} {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>For Who</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="EMPLOYEE">Employee</SelectItem>
                  <SelectItem value="MANAGER">Manager</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <AlertBox type="default" text={success} />
        <AlertBox text={error} />

        <Button type="submit" disabled={isPending} >{isPending? <BeatLoader /> : "Submit"}</Button>
      </form>
    </Form>
      </DialogContent>
    </Dialog>
  )
}
