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