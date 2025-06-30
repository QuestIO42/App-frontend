import { ButtonHTMLAttributes, ElementType } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/utils/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  className?: string
  size?: 'small' | 'medium' | 'large'
  Icon: ElementType
  disabled?: boolean
  current_try: number
  max_tries: number
}

const buttonVariants = cva(
  'flex w-full h-16 bg-white items-center justify-center border-[3px] px-6 py-1 text-center font-bold transition-all duration-200 ease-in-out',
  {
    variants: {
      size: {
        small: 'text-lg',
        medium: 'pt-2 pb-2 text-2xl',
        large: 'p-5 text-3xl',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  }
)

export default function ExerciseTemplate({
  text,
  className,
  size,
  Icon,
  disabled,
  current_try,
  max_tries,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(
        buttonVariants({ size }),
        !disabled && 'hover:scale-[102%] cursor-pointer border-preto-default shadow-default-preto text-cinza',
        disabled && 'border-[#BBB] shadow-default-cinza text-[#888]',
        className
      )}
      disabled={disabled}
      {...rest}
    >
      <div className="flex-grow justify-between items-center flex gap-8">
        <span className='flex whitespace-nowrap'>{text}</span>
        <div className="flex flex-row gap-4">
          <span className="flex items-center justify-center text-black">{current_try}/{max_tries}</span>
          <Icon className="flex h-10 w-7 shrink-0"></Icon>
        </div>
      </div>
    </button>
  )
}
