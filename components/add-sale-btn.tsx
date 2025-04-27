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
import AddStockForm from "@/components/add-stock-form"
import AddSaleForm from "./add-sale-form"

export function AddSalesBtn() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Sales</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add sales</DialogTitle>
          <DialogDescription>
            Make changes to your sales
          </DialogDescription>
        </DialogHeader>
        <AddSaleForm /> 
      </DialogContent>
    </Dialog>
  )
}
