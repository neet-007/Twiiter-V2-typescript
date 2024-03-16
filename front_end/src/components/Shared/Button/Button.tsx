import React, { ComponentProps } from "react"

interface ButtonProps extends ComponentProps<'button'>{
    variant?:{clrName:string, shade:string}
    clr?:{clrName:string, shade:string}
}

export const Button:React.FC<ButtonProps> = ({variant, clr, children, ...props}) => {
  return (
    <button className={`flex py-2 px-4 bg-sky-400 justify-center items-center rounded-full`} {...props}>
        {children}
    </button>
  )
}

//${variant?`${variant.clrName}-${variant.shade}`:'sky-400'}