import React from 'react'

interface ModalSquareFormProps {
  children: React.ReactNode
  courseName?: string
  courseTeacher?: string
}

export default function ModalSquareForm({ children, courseName, courseTeacher }: ModalSquareFormProps) {
  return (
    <div className="flex flex-col h-fit w-fit">

      <div className="relative flex h-fit w-fit items-center justify-center">
        <div className="absolute bottom-0 left-0 h-[104%] w-[105%] border-4 border-cinza"></div>
        <div className="absolute right-0 top-0 h-[104%] w-[105%] border-4 border-cinza"></div>
        {children}

      </div>
      
        <p className="mt-3 text-xl text-left font-bold underline text-cinza"> 
        { courseName }
        </p>
        <p className="mt-1 text-left font-bold text-cinzaClaro">
          { courseTeacher }
        </p>
    </div>
  )
}
