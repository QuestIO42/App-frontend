import { useState } from 'react';
import RadioButton from './RadioButton';
import CheckIcon from '@/components/svgComponents/icons/CheckIcon';
import RedCrossIcon from '@/components/svgComponents/icons/RedCrossIcon';

interface RadioButtonGroupProps {
  initialValue?: string;
  values?: string[] | undefined;
  name: string;
  handleAnswer: (value: string) => void;
  verified: boolean;
  correct: boolean;
  verifiedValue?: string;
  disabled: boolean;
}

export default function RadioButtonGroup({ initialValue, values, name, handleAnswer, verified, correct, verifiedValue, disabled }: RadioButtonGroupProps) {
  const labels = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
  const [selectedValue, setSelectedValue] = useState<string>(initialValue || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const value = e.target.value;
    setSelectedValue(value);
    handleAnswer(value);
  };

  return (
    <div className="flex-col">
      {values?.map((value, index) => (
        <div key={value} className="flex items-center justfify-center">
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

      {verified && selectedValue === '' && (
        <div className="mt-4 flex items-center">
          <RedCrossIcon />
          <span className="ml-6 text-md text-red-600">Nenhuma opção selecionada</span>
        </div>
      )}
    </div>
  );
}
