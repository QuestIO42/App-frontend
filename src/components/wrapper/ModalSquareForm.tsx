import React from 'react';

interface ModalSquareFormProps {
  children: React.ReactNode;
}

export default function ModalSquareForm({ children }: ModalSquareFormProps) {
  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="absolute h-full w-full translate-y-6 border-4 border-cinza"></div>
      <div className="flex translate-x-6 items-center justify-center border-4 border-cinza">
        {children}
      </div>
    </div>
  );
}
