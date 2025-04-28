import { AlertCircle, Terminal } from "lucide-react"

import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert"


interface alertProps {
    type?: string
    text?: string
    
}

export function AlertBox({type, text}: alertProps) {

    if( !text ){
        return null
    }

    if(type == "default"){
        return (
            <Alert variant={"default"}>
            <Terminal className="h-4 w-4" />
            <AlertDescription>
              {text}.
            </AlertDescription>
          </Alert>
        )
    }

    

  return (
    <Alert variant={"destructive"}>
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        {text}.
      </AlertDescription>
    </Alert>
  )
}
