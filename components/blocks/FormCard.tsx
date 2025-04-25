import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { cn } from '@/lib/utils'

interface props{
    title: String
    description: String
    children: React.ReactNode
}

const FormCard = ({title, description, children}: props) => {
  return (
    <div className={cn("flex flex-col gap-6")} >
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
         {children}
        </CardContent>
      </Card>
    </div>
  )
}

export default FormCard