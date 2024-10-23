import { useState } from 'react';
import RadioButton from './RadioButton';

interface RadioButtonGroupProps {
  values: string[];
  name: string;
}

export default function RadioButtonGroup ( {values, name}: RadioButtonGroupProps ) {
  const labels = ['a','b','c','d','e'];

  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.target.value);
  };

  return (
    <div>
      {values.map((value, index) => (
        <RadioButton
          key={value}
          label={labels[index]}
          name={name}
          value={value}
          checked={selectedValue === value}
          onChange={handleChange}
        />
      ))}
    </div>
  );
};
