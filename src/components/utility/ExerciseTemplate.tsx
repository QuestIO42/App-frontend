import { ButtonHTMLAttributes, ElementType } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/utils/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  className?: string
  size?: 'small' | 'medium' | 'large'
  Icon: ElementType
  disabled?: boolean;
}

const buttonVariants = cva(
  'flex gap-28 bg-white items-center justify-center border-[3px] px-6 py-1 text-center font-bold transition-all duration-200 ease-in-out',
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
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(
        buttonVariants({ size }),
        !disabled && 'active:scale-90 cursor-pointer border-preto-default shadow-default-preto text-cinza',
        disabled && 'border-[#a8a8a8] shadow-default-cinza text-[#636363]',
        className
      )}
      disabled={disabled}
      {...rest}
    >
      <div className="flex-grow justify-between items-center flex">
        <span className='flex whitespace-nowrap'>{text}</span>
        <Icon className=" flex ml-5 h-10 w-7 shrink-0"></Icon>
      </div>
    </button>
  )
}
