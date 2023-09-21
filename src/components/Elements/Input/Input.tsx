import React from "react";
import './Input.styles.css'

interface InputProps {
  type: string;
  placeholder: string;
  className: string;
  id: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  name?: string;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  className,
  id,
  onChange,
  value,
  name
}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className={className}
        id={id}
        onChange={onChange}
        value={value}
        name={name}
      />
    </>
  );
};

export default Input;
