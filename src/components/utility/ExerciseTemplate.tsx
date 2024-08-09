import { ButtonHTMLAttributes } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/utils/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string
    className?: string
    buttonDisabled?: 'active' | 'disactive'
    size?: 'small' | 'medium' | 'large'
}

const buttonVariants = cva(
    'flex active:scale-90 cursor-pointer items-center justify-center border-[3px] px-6 py-1 text-center font-bold transition-all duration-200 ease-in-out border-preto-default shadow-default-preto text-cinza',
    {
      variants: {
        size: {
          small: 'text-lg',
          medium: 'text-2xl',
          large: 'text-3xl',
        },
        buttonDisabled: {
          active:
            'cursor-not-allowed bg-roxo-300 opacity-50 shadow-default-roxo-500',
          disactive: '',
        },
      },
      defaultVariants: {
        size: 'medium',
        buttonDisabled: 'disactive',
      },
    }
)

export default function ExerciseTemplate({
    text,
    className,
    buttonDisabled,
    size,
    ...rest
  }: ButtonProps){

    return(
        <button
        className={cn(
          buttonVariants({
            buttonDisabled: rest.disabled ? 'active' : 'disactive',
            size,
          }),
          className
        )}
        {...rest}
      >
        {text}
        {/* svg */}
      </button>
    )
}