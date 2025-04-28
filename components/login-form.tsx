'use client';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import * as z from 'zod'
import { useForm } from "react-hook-form"
import { loginSchema } from "@/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { login } from "@/app/actions/login";
import Link from "next/link";
import { useState, useTransition } from "react";
import {BeatLoader} from "react-spinners"
import { AlertBox } from "./blocks/Alert";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState<string | undefined>("")
  const [error, setError] = useState<string | undefined>("")

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  function onSubmit(values: z.infer<typeof loginSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)

    startTransition(()=>{
      login(values).then((res)=>{

        if(res?.error){
          setError(res?.error)
        }

        if(res?.success){
          setSuccess(res?.success)
        }

        console.log(res)
      }).catch((err)=>{
        console.log("login error", err)
      })
    })







  }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                      <Input placeholder="*************" disabled={isPending} type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                    <Link href="/forgot-password">Forgot Password ?</Link>
                  </FormItem>
                )}
              />

              <AlertBox  text={error} />
              <AlertBox type="default" text={success} />

              <Button className="w-full cursor-pointer" disabled={isPending} type="submit">{isPending?<BeatLoader className="text-black" />: "Login"}</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
