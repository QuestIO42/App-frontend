
import { ReactNode } from 'react';

export default function QuestionBox({ children }: { children: ReactNode }) {
  return (
    <div className="w-full">
      <div className="flex flex-col bg-white p-10 justify-start shadow-default-preto-900
                      border-[3px] border-solid border-black">
        {children}
      </div>
    </div>
  )
}
