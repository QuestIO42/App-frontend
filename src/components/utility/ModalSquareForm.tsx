import React from 'react'

interface ModalSquareFormProps {
  children: React.ReactNode
  courseName?: string
  courseTeacher?: string
  IsRectangle?: boolean
  borderColor?: string
}

export default function ModalSquareForm({ children, courseName, courseTeacher, IsRectangle, borderColor = '#BBBBBB' }: ModalSquareFormProps) {
  return (
    <div className="flex flex-col h-fit w-fit">
      <div className={`group relative flex h-fit w-fit items-center justify-center ${IsRectangle ? 'p-1' : ''}`}>
        <div style={{ border: `4px solid ${borderColor}` }} className={` absolute h-[105%] w-[105%] ${IsRectangle ? 'bottom-[1px] left-0 ' : 'bottom-0 left-0'} `}> </div>
        <div style={{ border: `4px solid ${borderColor}` }} className={` absolute h-[105%] w-[105%] border-4 ${IsRectangle ? 'right-0 top-[1px]' : 'right-0 top-0'} `}></div>
        {children}

      </div>

        <p className="flex-wrap w-[260px] mt-8 text-xl text-left font-bold text-cinza-900 hover:underline">
          { courseName }
        </p>
        <p className="flex-wrap w-[260px] mt-1 text-left font-bold text-cinza-500">
          { courseTeacher }
        </p>
    </div>
  )
}
