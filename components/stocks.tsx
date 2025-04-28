'use client'
import React from 'react'
import StocksContainer from './stocks-container'
import { useStockQuery } from '@/queries/useStockQuery'
import { SkeletonDemo } from './blocks/Skeleton'

const Stocks = () => {
    
    
    const {data, isPending} = useStockQuery()

    console.log(data)



  return (
    <div className='grid grid-cols-2 gap-2'>
        {
            isPending ?
            <>
            <SkeletonDemo /> <SkeletonDemo /> 
            </>  :
            data?.map((e)=>{
                return(

                    <StocksContainer name={e.name} id={e.id} cage={e.cage} cost={e.cost} mrp={e.mrp} quantity={e.quantity} />
                )
            })
        }
    </div>
  )
}

export default Stocks