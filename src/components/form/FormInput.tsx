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
    <div className="mb-4">
      <label className="mb-2 block font-mono text-sm font-semibold text-preto-texto sm:text-base md:text-lg lg:text-xl">
        {label}
      </label>
      <input
        className={`border-2 border-roxo-300 px-2 py-1 text-base font-semibold text-preto-texto shadow-default-roxo-300 focus:border-roxo-900 focus:shadow-roxo-900 sm:border-[2.5px] sm:px-3 sm:text-lg md:border-4 md:px-4 md:text-xl lg:text-2xl`}
        type={type}
        {...registerProps}
      />
    </div>
  )
}

export default FormInput
