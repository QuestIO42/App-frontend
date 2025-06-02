import React, { useState } from 'react';
import CheckIcon from '@/components/svgComponents/icons/CheckIcon';
import RedCrossIcon from '@/components/svgComponents/icons/RedCrossIcon';

interface OpenAnswerProps {
  id_question: string;
  initialValue: string;
  handleAnswer: (value: string) => void;
  verified?: boolean;
  correct?: boolean;
}

export default function OpenAnswer({ initialValue, handleAnswer, verified, correct }: OpenAnswerProps) {
  const [answer, setAnswer] = useState(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setAnswer(newValue);
    handleAnswer(newValue.trim());
    console.log('component', newValue);
  };

  return (
    <div className="w-full h-full mt-6">
      <form action="" autoComplete="off" className="w-full h-full relative">
        <textarea
          name="answer"
          value={answer}
          onChange={handleChange}
          placeholder="Resposta"
          required
          className={`border-[2px] border-[#CCC] resize-none p-4 w-full focus:outline-none ${verified ? "pr-20" : ""}`}
          rows={3}
        />
        {(verified && correct) && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
            <CheckIcon className="h-5 w-5 text-green-500" />
          </div>
        )}
        {(verified && !correct) && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
            <RedCrossIcon className="h-5 w-5 text-red-500" />
          </div>
        )}
      </form>
    </div>
  );
}
