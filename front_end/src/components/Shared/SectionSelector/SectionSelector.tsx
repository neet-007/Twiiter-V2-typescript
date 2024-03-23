import React, { ComponentProps } from 'react'

export interface SectionSelectorProps extends ComponentProps<'div'>{
    section?:string
    sectionClick:(item:any) => void
    buttonsArray:string[]
}

export const SectionSelector:React.FC<SectionSelectorProps> = ({section, sectionClick, buttonsArray, className}) => {
  return (
    <div className={`flex ${className}`}>
        {buttonsArray.map(item => {
            return <button key={item} onClick={() => sectionClick(item)} className={`basis-full flex justify-center align-middle hover:bg-slate-200 transition-colors ease-in-out duration-200`}>
                    <p className={`${section === item ? 'border-b-4 border-blue-500':''} p-2`}>{item}</p>
                   </button>
        })}
    </div>
  )
}
