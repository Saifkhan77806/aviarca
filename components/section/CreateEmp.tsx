"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {  z } from "zod"
import {BeatLoader} from 'react-spinners'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import SectionTitle from "@/components/blocks/headers/SectionTitle"
import { formSchema } from "@/schema"
import { create } from "@/app/actions/create"
import { useState, useTransition } from "react"
import { AlertBox } from "../blocks/Alert"



export function CreateEmp() {


  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState<string | undefined>("")
  const [error, setError] = useState<string | undefined>("")


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      phone: undefined,
      position: undefined,
      salary: 1000,
      address: ""

    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)

    startTransition(() => {

      create(values).then((res) => {
        console.log(res)
        
      if(res?.error){
        setError(res?.error)
        form.reset()
      }

      if(res?.success){
        setSuccess(res?.success)
        form.reset()
      }

      }).catch((err) => {
        console.log("Something went wrong")
      })
    })

  }

  return (
    <div>
      <SectionTitle title="Employee or Manager Creation" description="Please fill out the form below to create a new employee." />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="saifkhanfaisalsiddique@mfc.com" disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="*************" type="password" disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>
                <FormControl>
                  <Input placeholder="Position" disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="salary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salary</FormLabel>
                <FormControl>
                  <Input placeholder="Salary" type="number" {...field} disabled={isPending} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="1234567890" type="number"  {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea placeholder="123, street City, State, ZIP Code, los angeles ,us" disabled={isPending}  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <AlertBox text={error} />
          <AlertBox type="default" text={success} />

          <Button className="w-full cursor-pointer" disabled={isPending} type="submit">{isPending ? <BeatLoader className="text-black" /> : "Create Staff"}</Button>
        </form>
      </Form>
    </div>
  )
}

