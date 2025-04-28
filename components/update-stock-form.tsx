'use client'

import { DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { stockSchema } from "@/schema"
import { useState } from "react"
import { addStock } from "@/app/actions/add-stock"
import { updateStocks } from "@/app/actions/update-stock"
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface updateStockProps {
  name: string
  cage: string
  mrp: number
  cost: number
  quantity: number
  id: string
}



const UpdateFormStock = ({ name, cage, mrp, cost, quantity, id }: updateStockProps) => {
  const queryClient = useQueryClient();

  const updateStockMutation = useMutation({
    mutationFn: (values: any) => updateStocks(values, id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['stocks'] });
      return data
    },

  })

  const [file, setFile] = useState<File>();
  const [url, setUrl] = useState(cage);
  const [uploading, setUploading] = useState(false);

  const uploadFile = async () => {
    try {
      if (!file) {
        alert("No file selected");
        return;
      }

      setUploading(true);
      const data = new FormData();
      data.set("file", file);
      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const signedUrl = await uploadRequest.json();
      setUrl(signedUrl);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert("Trouble uploading file");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target?.files?.[0]);
  };

  const form = useForm<z.infer<typeof stockSchema>>({
    resolver: zodResolver(stockSchema),
    defaultValues: {
      name,
      mrp,
      cost,
      quantity


    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof stockSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log({ ...values, url }, id)

    updateStockMutation.mutate({ ...values, url })

    updateStocks({ ...values, cage: url }, id).then((res) => {
      console.log(res)

    }).catch((err) => {
      console.log("error in adding cage")
    })


  }



  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mrp"

            render={({ field }) => (
              <FormItem>
                <FormLabel>MRP</FormLabel>
                <FormControl>
                  <Input placeholder="1000 /-" type="number"  {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cost</FormLabel>
                <FormControl>
                  <Input placeholder="50" type="number"  {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input placeholder="0" type="number"  {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button type="submit">Save Product</Button>
          </DialogFooter>
        </form>
      </Form>

      <main className="w-full m-auto flex flex-col justify-center items-center">
        <img width={80} height={80} src={url} alt="" />
        <input type="file" className="cursor-pointer" onChange={handleChange} />
        <Button type="button" disabled={uploading} onClick={uploadFile} >
          {uploading ? "Uploading..." : "Upload"}
        </Button>
      </main>


    </div>
  )
}


export default UpdateFormStock