import React, { ComponentProps } from "react"

interface ButtonProps extends ComponentProps<'button'>{
    variant?:{clrName:string, shade:string}
    clr?:{clrName:string, shade:string}
}

export const Button:React.FC<ButtonProps> = ({variant, clr, children, ...props}) => {
  return (
    <button className={`flex p-2 bg-${variant?`${variant.clrName}-${variant.shade}`:'sky-400'} justify-center align-middle rounded-full`} {...props}>
        {children}
    </button>
  )
}