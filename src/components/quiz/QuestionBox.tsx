
import { ReactNode } from 'react';

export default function QuestionBox({ children }: { children: ReactNode }) {
  return (
    <div className="w-full">
      <div className="flex flex-col p-10 justify-start bg-cinza-300 shadow-default-cinza-300
                      border-solid border-2 border-[#DDDDDD]">
        {children}
      </div>
    </div>
  )
}
