
import { ReactNode } from 'react';
import Button from '../utility/Button';

export default function QuestionBox({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex flex-col bg-white p-10 gap-20 justify-start shadow-default-preto-900
                      border-4 border-solid border-black
                      lg:w-[1200px]  min-h-[400px]">
        {children}
        <div className="mt-auto flex justify-center">
          <Button variant="primary" text="verificar" />
        </div>
      </div>
    </>
  )
}
