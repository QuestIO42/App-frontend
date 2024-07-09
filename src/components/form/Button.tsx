import { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  className?: string;
}

export default function Button({ text, className, ...rest }: ButtonProps) {
  return (
    <button
      className={twMerge(className, 'btn_primary text-base sm:text-2xl')}
      {...rest}
    >
      {text}
    </button>
  );
}
