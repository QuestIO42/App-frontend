import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface FormInputProps {
  label: string
  type: React.HTMLInputTypeAttribute
  registerProps?: UseFormRegisterReturn
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  registerProps,
}) => {
  return (
    <div className="mb-4 w-full">
      <label className="mb-2 block font-mono text-[14px] uppercase tracking-wider text-roxo-500">
        {label}
      </label>

      <input
        className={`w-full border-2 border-roxo-300 p-2 text-base font-medium text-roxo-900 shadow-default-roxo-300 focus:outline-none focus:ring-0 focus:border-roxo-300`}
        type={type}
        {...registerProps}
      />
    </div>
  )
}

export default FormInput
