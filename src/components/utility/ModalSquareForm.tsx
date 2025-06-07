import React from 'react'

interface ModalSquareFormProps {
  children: React.ReactNode
  courseName?: string
  courseTeacher?: string
  IsRectangle?: boolean
}

export default function ModalSquareForm({ children, courseName, courseTeacher, IsRectangle }: ModalSquareFormProps) {
  return (
    <div className="flex flex-col h-fit w-fit">

      <div className={`relative flex h-fit w-fit items-center justify-center ${IsRectangle ? 'p-1' : ''}`}>
        <div className={` absolute h-[105%] w-[105%] border-4 border-cinza ${IsRectangle ? 'bottom-[1px] left-0 ' : 'bottom-0 left-0'} `}> </div>
        <div className={` absolute h-[105%] w-[105%] border-4 border-cinza ${IsRectangle ? 'right-0 top-[1px]' : 'right-0 top-0'} `}></div>
        {children}

      </div>

        <p className="flex-wrap w-[260px] mt-4 text-xl text-left font-bold underline text-cinza">
          { courseName }
        </p>
        <p className="flex-wrap w-[260px] mt-1 text-left font-bold text-cinzaClaro">
          { courseTeacher }
        </p>
    </div>
  )
}
