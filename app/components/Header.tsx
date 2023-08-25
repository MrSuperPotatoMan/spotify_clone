import React from 'react'

type Props = {
    imgSrc: string,
    children: JSX.Element | string,
    title: string,
    year?: string | number
}

export default function Header({imgSrc,children,title,year}: Props) {
  return (
    <div className="flex flex-row sticky top-0 z-10 bg-base-gray p-2 mx-2">
        <img src={imgSrc} className="h-40"/>
        <div className="flex flex-col justify-between [&>p]:m-2">
            <p className="text-5xl line-clamp-2 h-full">
                {title}
                {year? <span className='text-font-gray text-xl'> {year}</span>:''}
            </p>
            <p className="text-gray-500">
                {children}
            </p>
        </div>
    </div>
  )
}