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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"

export function AddNotice() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Notice</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Notice</DialogTitle>
          <DialogDescription>
            ADD notice Page
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="subject" className="text-right">
              Subject
            </Label>
            <Input id="subject" placeholder="Subject"  className="border border-gray-400 col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <textarea name="description" placeholder="Description" className="border border-gray-400 col-span-3 rounded-md indent-1" cols={20}  id=""></textarea>
          </div>
          <Select defaultValue="Employee">
          <SelectTrigger
            className="flex justify-between w-fit"
            size="sm"
            id="view-selector"
          >
            <SelectValue placeholder="Select a view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="employee">Employee</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
          </SelectContent>
        </Select>
        </div>
        <DialogFooter>
          <Button type="submit">Add notice</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
