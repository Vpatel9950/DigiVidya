import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

const Mycourse = () => {
    return (
   
    <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg
        hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
           <div className='relative'>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMAxla8Pj4GsVA2SIPWOwvkE-OiUC8i4Pbpw&s"
                     alt="course"
                    className='w-full h-36 object-cover rounded-t-lg'
                  />
           </div>
           <CardContent>
            <h1>class 9 complete couse in hindi</h1>
           </CardContent>
    </Card>
    
    )
}

export default Mycourse