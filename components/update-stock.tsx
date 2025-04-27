import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import UpdateFormStock from "./update-stock-form"

interface updateStockProps {
    name: string
    cage: string
    mrp: number
    cost: number
    quantity: number
    id: string
  }

export function UpdateStock({name, id, cage, cost, mrp, quantity}: updateStockProps) {


  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Update stock</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="px-3">
        <UpdateFormStock name={name} id={id} cage={cage} mrp={mrp as number} quantity={quantity as number} cost={cost as number} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
