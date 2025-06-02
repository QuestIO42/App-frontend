import { useState } from 'react';
import RadioButton from './RadioButton';
import CheckIcon from '@/components/svgComponents/icons/CheckIcon';
import RedCrossIcon from '@/components/svgComponents/icons/RedCrossIcon';

interface RadioButtonGroupProps {
  values: string[];
  name: string;
  verified: boolean;
  correct: boolean;
  handleAnswer: (value: string) => void;
  verifiedValue?: string;
}

export default function RadioButtonGroup({ values, name, handleAnswer, correct, verified, verifiedValue }: RadioButtonGroupProps) {
  const labels = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    handleAnswer(value);
  };

  return (
    <div className="">
      {values.map((value, index) => (
        <div key={value} className="flex items-center justfify-center">
          <RadioButton
            label={labels[index]}
            name={name}
            value={value}
            checked={selectedValue === value}
            onChange={handleChange}
          />
          {verified && value === verifiedValue && (
            <div className="ml-2">
              {correct ? <CheckIcon /> : <RedCrossIcon />}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
