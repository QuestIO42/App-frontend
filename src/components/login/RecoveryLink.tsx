import { HTMLAttributes } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/utils/cn'

interface RecoveryLinkProps extends HTMLAttributes<HTMLDivElement> {
  text: string
  className?: string
	variant?: 'primary' | 'secondary'
  size?: 'small' | 'medium' | 'large'
  height?: 'small' | 'medium' | 'large'
}

const recoveryLinkVariants = cva(
  'flex items-center justify-center border-[3px] px-6 py-1 text-center font-bold',
  {
    variants: {
      variant: {
        primary:
          'bg-verde-300 border-verde-300 text-preto-text-300 shadow-default-verde-900',
        secondary:
          'bg-roxo-300 border-roxo-300 text-preto-text-300 shadow-default-roxo-300',
      },
      size: {
        small: 'text-lg',
        medium: 'text-2xl',
        large: 'text-3xl',
      },
      height: {
        small: 'h-16',
        medium: 'h-24',
        large: 'h-32',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'small',
      height: 'small'
    },
  }
)

export default function RecoveryLink({
  text,
  className,
  variant,
  size,
  height,
  ...rest
}: RecoveryLinkProps) {
  return (
    <div
    className={cn(
      recoveryLinkVariants({
        variant,
        size,
        height,
      }),
      className
    )}
    {...rest}
    >
      {text}
    </div>
  )
}
