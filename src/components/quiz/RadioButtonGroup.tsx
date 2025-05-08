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
  disabled?: boolean;
}

export default function RadioButtonGroup({ values, name, handleAnswer, correct, verified, verifiedValue, disabled = false }: RadioButtonGroupProps) {
  const labels = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
  console.log("alternativas", values);

  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    handleAnswer(value);
  };

  return (
    <div>
      {values.map((value, index) => (
        <div key={value} className="flex items-center">
          <RadioButton
            label={labels[index]}
            name={name}
            value={value}
            checked={selectedValue === value}
            onChange={handleChange}
            disabled={disabled}
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
