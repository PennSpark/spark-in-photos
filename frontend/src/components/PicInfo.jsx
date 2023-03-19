import React from 'react'
import locationPin from '../assets/locpin.svg'

const PicInfo = ({people, location, title, hover}) => {
  return (
    <div className={`absolute bottom-0 w-48 my-2 ${hover ? `z-[101]` : `z-30`}`}>
        <div className="font-spaceGrotesk font-bold text-xl flex justify-start z-auto">
          <img src={locationPin} className='m-0 z-auto'/>
          <p className='ml-1 z-auto'>{title}</p>
        </div>
        <p className='ml-1 font-spaceGrotesk font-normal z-auto  text-s'>{location}</p>
        <div className="flex w-full flex-wrap z-auto">{people.map(person => {
          return <p className='z-auto px-1 py-0.5 ml-1 mb-0.5 p-1 font-spaceGrotesk font-light text-xs text-white bg-stone-400 rounded-sm'>@{person}</p>
        })}</div>
        
        
    </div>
  )
}

export default PicInfo