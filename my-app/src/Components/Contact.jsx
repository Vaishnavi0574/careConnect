import React from 'react'

const Contact = ({contactInfo,tagline,icon:Icon}) => {
  return (
    <div className='min-h-[4rem] sm:min-h-[7rem] w-full  flex flex-col items-center justify-between  md:py-3 text-wrap '>
        {Icon && <Icon  className="bg-[#052659] text-white w-7 h-7 p-1 md:w-9 md:h-8 md:p-2 rounded-t-full"/>}
        <p className='font-semibold text-[0.8rem] md:text-[.95rem] text-wrap text-center'>{contactInfo}</p>
        <p className='hidden sm:block text-[0.7rem] md:text-[.8rem] text-wrap text-center'>{tagline}</p>
    </div>
  )
}

export default Contact
