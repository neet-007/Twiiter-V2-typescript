import React from "react";

export function modalClick(e:React.MouseEvent, setIsOpen:React.Dispatch<React.SetStateAction<boolean>>){
    if (e.target.id === 'modal-overlay')
    setIsOpen(false)
}