import React from 'react'

const Cards = ({icon:Icon,title,desc}) => {
  return (
    <div className=' text-[#bdd8e9]  w-full lg:max-w-[94%] xl:max-w-[90%] flex flex-col items-start justify-between p-4 xl:p-6 border-[.5px] border-[#bdd8e9] shadow-md hover:shadow-[#bdd8e9] hover:scale-105 transition-transform duration-300 ease-in-out text-left rounded-sm text-wrap '>
        {Icon && <Icon className="w-11 h-11 xl:w-13 xl:h-13 mb-4 " />}
        <h3 className='text-[1.3rem] xl:text-2xl font-semibold mb-4'>{title}</h3>
      <p className='lg:text-[0.9rem] xl:text-md text-sm'>{desc}</p>
    </div>
  )
}

export default Cards 