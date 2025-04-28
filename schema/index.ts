import * as z from 'zod'

export const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  phone: z.number().min(1000000000, { message: "You must be at least 10 number." }),
  position: z.enum(["EMPLOYEE", "MANAGER"], {
    invalid_type_error: "Position must be either EMPLOYEE or MANAGER."
  }),
  salary: z.number().min(1000, { message: "Salary must be at least 1,000." }),
  address: z.string().min(10, {
    message: "Address must be at least 10 characters."
  })
})


export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
})

export const forgotPasswordSchema = z.object({
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  cpassword: z.string().min(6, { message: "Password must be at least 6 characters." }),
})

export const forgotPasswordEmailSChema = z.object({
  email: z.string().email({message: "Invalid email address"})
})

export const itemSchema = z.object({
  quantity: z.string().regex(/^\d+$/, { message: 'Quantity must be a number string' }),
  productName: z.string().min(1, { message: 'Product Name is required' }),
  hsnCode: z.string().min(1, { message: 'HSN Code is required' }),
  gst: z.string().regex(/^\d+(\.\d+)?$/, { message: 'GST must be a number string' }),
  rate: z.string().regex(/^\d+(\.\d+)?$/, { message: 'Rate must be a number string' }),
  gstAmount: z.number(),
  total: z.number(),
});

export const billSchema = z.object({
  partyName: z.string(),
  address: z.string(),
  billNo: z.string().min(1, { message: 'Bill No is required' }),
  items: z.array(itemSchema).min(1, { message: 'At least one item is required' }),
  totalAmount: z.number(),
});

export const stockSchema = z.object({
  name: z.string().min(1, {message: 'Name is required'}),
  mrp: z.number().min(1, {message: 'Mrp is required'}),
  cost: z.number().min(1, {message: 'Cost is required'}),
  quantity: z.number()

})

export const stockSchemaWithImg = z.object({
  name: z.string().min(1, {message: 'Name is required'}),
  mrp: z.number().min(1, {message: 'Mrp is required'}),
  cost: z.number().min(1, {message: 'Cost is required'}),
  quantity: z.number(),
  cage: z.string().min(3, {message: "Cage image url is required"})
})

export const saleSchemaFrontend = z.object({
  stockName: z.string().min(1,{message: "Stock name is required"}),
  quantity: z.number().min(1,{message: "Sales quantity is required"})
})

export const saleSchema = z.object({
  quantity: z.number().min(1,{message: "Sales quantity is required"})
})

export const noticeSchema = z.object({
  subject: z.string().min(5, {message: "Notice subject is required"}),
  description: z.string().min(10, {message: "Description is required"}),
  role: z.enum(["EMPLOYEE", "MANAGER"],{
    invalid_type_error: "Role is required it can be EMPLOYEE and  MANAGER"
  })
})

