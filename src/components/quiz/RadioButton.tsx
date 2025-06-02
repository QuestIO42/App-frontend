import { cva } from 'class-variance-authority';

interface RadioButtonProps {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

const squareStyles = cva(
  'flex cursor-pointer items-center justify-center border-[3px] h-10 w-10 text-cinza border-roxo-900 text-center font-bold',
  {
    variants: {
      checked: {
        true: 'bg-roxo-500 text-white',
        false: 'bg-branco',
      },
      disabled: {
        true: '',
        false: 'active:scale-90 transition-all duration-200 ease-in-out',
      }
    },
  }
);

export default function RadioButton ({
  label,
  name,
  value,
  checked,
  onChange,
  disabled,
}: RadioButtonProps) {
  return (
    <label className='flex text-xl items-center cursor-pointer my-4 mr-4'>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="hidden"
        disabled={disabled}
      />

      <span
        className={ squareStyles({checked, disabled}) }
        style={{boxShadow: '3px 3px #3e347b'}}
      >
        <span>{label}</span>
      </span>

      <span className="ml-6 text-cinza">{value}</span>
    </label>
  )
}
