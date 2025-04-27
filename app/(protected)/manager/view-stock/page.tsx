"use client";

import { AddStockBtn } from "@/components/add-stock-btn";
import Stocks from "@/components/stocks";

export default function Home() {
 

  

  return (
    
    <div className="flex flex-col gap-y-2">
        <div className="flex justify-end">
        <AddStockBtn />
        </div>
        <div>
            <Stocks />
        </div>
    </div>
  );
}