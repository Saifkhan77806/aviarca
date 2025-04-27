'use client'

import { DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { saleSchema } from "@/schema"
import { useState } from "react"
import { addStock } from "@/app/actions/add-stock"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command"
import { useStockQuery } from "@/queries/useStockQuery"
import { cn } from "@/lib/utils"
import { createSales } from "@/app/actions/create-sale"



const AddSaleForm = () => {

  
  const { data: frameworks = [], isPending } = useStockQuery()

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")


  const form = useForm<z.infer<typeof saleSchema>>({
    resolver: zodResolver(saleSchema),
    defaultValues: {
      quantity: undefined
    },
  })

console.log(value)

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof saleSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log({stockName: value, ...values })

    createSales({stockName: value, ...values }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log("error in adding cage")
    })


  }



  return (
    <div>
    
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {value
                  ? frameworks.find((framework) => framework.name === value)?.name
                  : "Select Stock..."}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search stock..." className="h-9" />
                <CommandList>
                  <CommandEmpty>No Stock found.</CommandEmpty>
                  <CommandGroup>
                    {frameworks.map((framework) => (
                      <CommandItem
                        key={framework.name}
                        value={framework.name}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue)
                          setOpen(false)
                        }}
                      >
                        {framework.name}
                        <Check
                          className={cn(
                            "ml-auto",
                            value === framework.name ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">

          <FormField
            control={form.control}
            name="quantity"

            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input placeholder="1000 /-" type="number"  {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button type="submit">Add Sales</Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  )
}


export default AddSaleForm