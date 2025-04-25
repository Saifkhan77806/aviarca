'use client';
import FormCard from '@/components/blocks/FormCard'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { forgotPasswordSchema } from '@/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { newPassword } from '../actions/new-password';

const ForgorPassword = () => {

  const searchParams = useSearchParams()

  const token = searchParams.get("token")
 

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
      resolver: zodResolver(forgotPasswordSchema),
      defaultValues: {
        password: "",
        cpassword: ""
      }
    })

    const onSubmit = (values: z.infer<typeof forgotPasswordSchema>) => {
      console.log(values)
      console.log("Token", token)

      newPassword(values, token).then((res)=>{
        console.log(res)
      }).catch((err)=>{
        console.log(err)
      })

    }

  return (
    <FormCard title={"Forgot Password"} description={"Sent email for forgot password"}>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="****************" type='password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cpassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input placeholder="*************" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full" type="submit">Submit</Button>
            </form>
          </Form>
    </FormCard>
  )
}

export default ForgorPassword