
import { ReactNode } from 'react';

export default function QuestionBox({ children, questionType }: { children: ReactNode, questionType: number }) {
  const getTitle = (type: number) => {
    switch (type) {
      case 1:
        return 'Múltipla Escolha';
      case 2:
        return 'Resposta Aberta';
      default:
        return 'Questão';
    }
  };

  const bgColor =
    questionType === 1
      ? "bg-roxo-300"
      : questionType === 2
      ? "bg-verde-300"
      : "bg-gray-300";

  const shadowColor =
    questionType === 1
      ? "shadow-default-roxo-500"
      : questionType === 2
      ? "shadow-default-verde-900"
      : "shadow-md";

  const textColor =
    questionType === 1
      ? "text-[#bab1fc]"
      : questionType === 2
      ? "text-[#2f6e4e]"
      : "text-gray-800";

  return (
    <div className="w-[90%] my-3">
      <div className={`w-fit flex self-start justify-center px-8 py-2 mb-6 font-bold ${bgColor} ${shadowColor} ${textColor}`}>
          <p className="text-left text-2xl">{getTitle(questionType)}</p>
      </div>

      <div className="flex flex-col bg-white p-10 justify-start shadow-default-preto-900
                      border-[3px] border-solid border-black">
        {children}
      </div>
    </div>
  )
}
