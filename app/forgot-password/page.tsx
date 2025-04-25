'use client'
import FormCard from '@/components/blocks/FormCard'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { forgotPasswordEmailSChema } from '@/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { reset } from '../actions/reset'

const page = () => {

    const form = useForm<z.infer<typeof forgotPasswordEmailSChema>>({
         resolver: zodResolver(forgotPasswordEmailSChema),
              defaultValues: {
                email: ""
              }
    })

    const onSubmit = (values: z.infer<typeof forgotPasswordEmailSChema>) =>{
        console.log(values)

        reset(values).then((res)=>{
          console.log(res)
        }).catch((err)=>{
          console.log(err)
        })


    }

  return (
    <FormCard title={"Forgot password"} description={"Enter email for sneding verification link"}>
             <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                  <Input placeholder="saifkhanfaisalsidd@mfc.com" type='email' {...field} />
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

export default page