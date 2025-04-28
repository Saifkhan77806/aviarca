// 'use client'

import React from 'react';
import './styles/ShipNavigator.css'; // For custom keyframes
import SectionTitle from '@/components/blocks/headers/SectionTitle';
import { Button } from '@/components/ui/button';
import { serverUser } from '@/lib/auth';
import { giveAtt } from '@/app/actions/give-attendance';
import { LocationChecker } from '@/components/LocationChecker';

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
    <LocationChecker
              // Example coordinates - replace with your target location
              targetLat={19.044819}
              targetLng={72.85228}
            />
    </>
  )
}

export default GiveAttendance