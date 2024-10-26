import React from 'react'

interface ModalSquareFormProps {
  children: React.ReactNode
  courseName?: string
  courseTeacher?: string
}

export default function ModalSquareForm({ children, courseName, courseTeacher }: ModalSquareFormProps) {
  return (
    <div className="relative flex h-fit w-fit p-1 items-center justify-center">
      <div className="absolute bottom-[2px] left-[2px] h-[104%] w-[105%] border-4 border-cinza"></div>
      <div className="absolute right-[2px] top-[2px] h-[104%] w-[105%] border-4 border-cinza"></div>
      {children}
    </div>
  )
}
