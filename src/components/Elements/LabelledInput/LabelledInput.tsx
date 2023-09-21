import React from 'react'
import Input from '../Input/Input'

interface Props {
   labelText: string;
   type: string;
   placeholder: string;
   className: string;
}

const LabelledInput:React.FC<Props> = ({labelText, type, placeholder, className}) => {
  return (
    <div>
        <label htmlFor="">{labelText}</label>
        <Input
        type={type}
        placeholder={placeholder}
        className={className}
        />
    </div>
  )
}

export default LabelledInput