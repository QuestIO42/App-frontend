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
  'flex w-full min-h-[72px] items-center justify-center px-6 py-2 text-center font-bold transition-all duration-300 ease-in-out',
  {
    variants: {
      size: {
        small: 'text-base',
        medium: 'pt-2 pb-2 text-lg',
        large: 'p-5 text-2xl',
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
        !disabled && 'hover:scale-[1.005] cursor-pointer border-2 border-[#CACACA] bg-cinza-300 rounded-lg',
        disabled && 'border-[#BBB] shadow-default-cinza text-[#888]',
        className
      )}
      disabled={disabled}
      {...rest}
    >
      <div className="w-full justify-between items-center flex flex-wrap text-lg md:text-xl">
        <span className='flex'>{text}</span>
        <div className="flex flex-row items-center justify-center gap-6">
          <span className="flex">{current_try}/{max_tries}</span>
          <Icon className="flex aspect-square w-5 md:w-6 shrink-0"></Icon>
        </div>
      </div>
    </button>
  )
}
