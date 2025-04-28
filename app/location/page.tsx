import { LocationChecker } from '@/components/LocationChecker'
import React from 'react'

const page = () => {
  return (
    <div>
         <LocationChecker
          // Example coordinates - replace with your target location
          targetLat={19.044819}
          targetLng={72.85228}
        />
    </div>
  )
}

export default page