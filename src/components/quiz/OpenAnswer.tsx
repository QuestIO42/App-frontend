import React, { useState } from 'react';
import CheckIcon from '@/components/svgComponents/icons/CheckIcon';
import RedCrossIcon from '@/components/svgComponents/icons/RedCrossIcon';

interface OpenAnswerProps {
  handleAnswer: (value: string) => void;
  id_question: string;
  verified: boolean;
  correct: boolean;
  disabled?: boolean;
}

export default function OpenAnswer({ handleAnswer, verified, correct, disabled = false }: OpenAnswerProps) {
  const [answer, setAnswer] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setAnswer(newValue);
    handleAnswer(newValue.trim());
    console.log('component', newValue);
  };

  return (
    <div className="w-full h-full">
      <form action="" autoComplete="off" className="w-full h-full relative">
        <textarea
          name="answer"
          value={answer}
          onChange={handleChange}
          placeholder="Resposta"
          required
          className="border-[3px] border-roxo-900 shadow-default-roxo-500 resize-none p-2 w-full pr-10" // Add pr-10 for padding-right
          rows={3}
          disabled={disabled}
        />
        {(verified && correct) && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <CheckIcon className="h-5 w-5 text-green-500" />
          </div>
        )}
        {(verified && !correct) && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <RedCrossIcon className="h-5 w-5 text-red-500" />
          </div>
        )}
      </form>
    </div>
  );
}
