import React, { ComponentProps } from 'react'
import { createPortal } from 'react-dom'

interface ModalInterface extends ComponentProps<'div'>{
    isOpen:boolean
    allClassName?:string
}

export const Modal:React.FC<ModalInterface> = ({isOpen, allClassName, className, children}) => {
  if(!isOpen) return null
  return createPortal(
    <div className={` ${allClassName}`}>
        <div id='modal-overlay' className=' fixed inset-0 bg-[rgba(0,0,0,0.75)]'></div>
        <div className={` fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-5 bg-slate-400  ${className}`}>
            {children}
        </div>
    </div>
  ,
  document.getElementById('modal')!
  )
}
