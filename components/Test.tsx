import React from 'react'

interface testProps {
    name: string
    email: string
    phone: number
    icon: React.ReactNode
}

const Test = ({name, email, phone, icon}: testProps) => {
  return (
    <div>
      TEst
      {name}
      {email}
      {phone}
      {icon}
    </div>
  )
}

export default Test
