import { ButtonHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  className?: string
}

export default function Button({ text, className, ...rest }: ButtonProps) {
  return (
    <button
      className={twMerge(
        'text-base sm:text-2xl',
        rest.disabled ? 'btn_disable' : 'btn_primary',
        className
      )}
      {...rest}
    >
      {text}
    </button>
  )
}
