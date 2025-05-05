
import { ReactNode } from 'react';
import Button from '../utility/Button';

export default function QuestionBox({ children, handlePrint }: { children: ReactNode, handlePrint: () => void }) {
  const handleClick = () => {
    console.log('Verificar');
    handlePrint();
  }
  return (
    <>
      <div className="flex flex-col bg-white p-10 gap-20 justify-start shadow-default-preto-900
                      border-4 border-solid border-black
                      w-[90%] min-h-[400px]">
        {children}
        <div className="mt-auto flex justify-center">
          <Button onClick={handleClick} variant="primary" text="verificar" />
        </div>
      </div>
    </>
  )
}
