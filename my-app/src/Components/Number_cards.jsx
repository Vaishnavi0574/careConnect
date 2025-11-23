import React from 'react'

const Number_cards = ({Number,title,icon:Icon}) => {
  return (
    <div className=' text-white min-h-[5rem] sm:min-h-[7rem] md:min-h-[15rem] w-full  flex flex-col items-center justify-between  md:py-6 text-wrap '>
        {Icon && <Icon className="w-6 h-6 sm:w-8 sm:h-8 md:w-11 md:h-11 xl:w-13 xl:h-13 xl:mb-4 " />}
        <h3 className='text-md sm:text-[1.5rem] md:text-[2.5rem] xl:text-5xl font-bold xl:mb-4'>{Number}</h3>
      <p className='text-[0.68rem] sm:text-[0.85rem] lg:text-[1rem] xl:text-lg md:text-sm text-center'>{title}</p>
    </div>
  )
}

export default Number_cards
