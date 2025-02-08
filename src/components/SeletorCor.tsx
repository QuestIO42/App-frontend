import {forwardRef } from 'react'

interface seletorCorProps {
  value: string
  name: string
}

const SeletorCor = forwardRef<HTMLInputElement, seletorCorProps>(
  ({ value, ...props }, ref) => {
  return (
    <div >
      <label className="cursor-pointer" >
        <input ref={ref} type="radio" value={value} {...props} className="hidden peer"  />
        <span className={`w-8 h-8 border-2 border-black flex items-center justify-center relative
        ${value === "verde"? `bg-verde-300` :
          value === "laranja"? `bg-laranja` : `bg-roxo-300`
        } peer-checked:after:content-["✔"] `}>
        </span>

      </label>
    </div>

  )
})

export default SeletorCor
