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

      <div className={`relative flex h-fit w-fit items-center justify-center ${IsRectangle ? 'p-1':''} `}>
        <div className={` absolute h-[104%] w-[105%] border-4 border-cinza ${IsRectangle ? 'bottom-[3px] left-[3px] ' : 'bottom-0 left-0'} `}> </div>
        <div className={` absolute h-[104%] w-[105%] border-4 border-cinza ${IsRectangle ? 'right-[3px] top-[3px]' : 'right-0 top-0'} `}></div>
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
