import React from 'react'

const Service_card = ({title,icon:Icon}) => {
  return (
    <div className='w-[70%] sm:w-[100%] lg:w-[95%] bg-[#ececec]  rounded-l-[4rem] rounded-r-lg hover:scale-105 transition-transform duration-300 ease-in-out text-[#23689d]'>
        <div className=' text-black  flex items-center  gap-4 xl:gap-10 '>
            <div className='border-2 border-[#23689d] p-4 sm:p-5 rounded-full'>
                {Icon && <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#23689d]" />}
            </div>
            <p className='text-sm sm:text-md xl:text-xl text-[#153e5e]'>{title}</p>

        </div>
    </div>
  )
}

export default Service_card
