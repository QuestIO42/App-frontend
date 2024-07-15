import { ButtonHTMLAttributes } from 'react'
import SearchIcon from '../svgComponents/icons/SearchIcon'
import { twMerge } from 'tailwind-merge'

interface SearchButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

export default function SearchButton({ className, ...rest }: SearchButton) {
  return (
    <button
      className={twMerge(className, 'flex items-center justify-center')}
      {...rest}
    >
      <SearchIcon></SearchIcon>
    </button>
  )
}
