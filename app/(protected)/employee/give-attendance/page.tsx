'use client'

import React from 'react';
import './styles/ShipNavigator.css'; // For custom keyframes
import SectionTitle from '@/components/blocks/headers/SectionTitle';
import { Button } from '@/components/ui/button';
import { serverUser } from '@/lib/auth';
import { giveAtt } from '@/app/actions/give-attendance';

const GiveAttendance = () => {

  

  const Clicked = () =>{
    console.log("Clicked")
    giveAtt().then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    });
  }

  return (
    <>
      <SectionTitle title='Employee attendance' description='Employee can give attendace ' />
    <div className="flex justify-center flex-col items-center py-20 bg-gray-950 rounded-md">
      <div className="relative w-64 h-64 rounded-full border-[6px] border-cyan-500 shadow-xl flex items-center justify-center">
        {/* Rotating line (radar arm) */}
        <div className="absolute left-1/2 top-0 w-[2px] h-32 bg-cyan-300 opacity-30 origin-bottom animate-spin-slow shadow-lg" />

        {/* Decorative ring */}
        <div className="absolute w-48 h-48 rounded-full border border-cyan-600 opacity-40" />

        {/* Inner Circle */}
        <div className="w-24 h-24 rounded-full border border-cyan-400 bg-cyan-950 flex items-center justify-center shadow-inner">
          {/* Center Dot */}
          <div className="w-3 h-3 rounded-full bg-cyan-300" />
        </div>
      </div>
    </div>
    <Button onClick={Clicked}>give Attendance</Button>
    </>
  )
}

export default GiveAttendance