import React from 'react'

interface ModalSquareFormProps {
  children: React.ReactNode
}

export default function ModalSquareForm({ children }: ModalSquareFormProps) {
  return (
    <div className="relative flex h-fit w-fit items-center justify-center">
      <div className="absolute bottom-0 left-0 h-[105%] w-[105%] border-4 border-cinza"></div>
      <div className="absolute right-0 top-0 h-[105%] w-[105%] border-4 border-cinza"></div>
      {children}
    </div>
  )
}
