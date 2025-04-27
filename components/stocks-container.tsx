import React from 'react'
import { Button } from './ui/button'
import { UpdateStock } from './update-stock'

interface stocksProps {
    id: string
    name: string
    cage: string 
    mrp: Number
    quantity: Number
    cost: Number
}

const StocksContainer = ({name, id, cage, cost, mrp, quantity}: stocksProps) => {
  return (
    <div className='bg-gray-300 flex flex-col shadow-2xl rounded-lg'>
        <div className='h-[60%]'>
            <img src={cage} className='w-full h-full' alt={name} />
        </div>
        <div className='h-[40%] flex flex-col gap-2 px-2'>
            <h1>Name: {name}</h1>
            <p>Cost: {cost as number}</p>
            <p>Mrp: {mrp as number}</p>
            <p>Quantity: {quantity as number}</p>
            <UpdateStock name={name} id={id} cage={cage} mrp={mrp as number} quantity={quantity as number} cost={cost as number} />
        </div>
    </div>
  )
}

export default StocksContainer