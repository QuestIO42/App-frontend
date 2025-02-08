import React, {forwardRef } from 'react'

interface FormInputGeralProps  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  type: React.HTMLInputTypeAttribute
}

const FormInputGeral = forwardRef<HTMLInputElement, FormInputGeralProps>(
  ({ label, ...props }, ref) => {
  return (
    <div className="mb-4">
      <label className="mb-2 block font-mono text-sm font-semibold text-preto-texto sm:text-[12px] md:text-base lg:text-base">
        {label}
      </label>
      <input
        ref={ref}
        className={`border-2 border-roxo-300 px-2 py-1 text-base font-semibold text-preto-texto shadow-default-roxo-300 focus:border-roxo-900 focus:shadow-roxo-900 sm:border-[2.5px] sm:px-3 sm:text-lg md:border-4 md:px-4 md:text-xl lg:text-2xl`}
        {...props}
      />
    </div>
  )
})

export default FormInputGeral;
