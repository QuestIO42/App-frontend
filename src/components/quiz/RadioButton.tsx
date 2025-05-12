import { cva } from 'class-variance-authority';

interface RadioButtonProps {
  label: string;
  name: string;
  optionId: string;
  displayText: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const squareStyles = cva(
  'flex active:scale-90 cursor-pointer items-center justify-center border-[3px] h-8 w-8 text-cinza border-roxo-900 text-center font-bold transition-all duration-200 ease-in-out',
  {
    variants: {
      checked: {
        true: 'bg-roxo-500',
        false: 'bg-branco',
      },
    },
  }
);

export default function RadioButton ({
  label,
  name,
  optionId,
  displayText,
  checked,
  onChange,
  disabled = false,
}: RadioButtonProps) {
  return (
    <label className='flex text-xl items-center cursor-pointer m-[20px]'>
      <input
        type="radio"
        name={name}
        value={optionId}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="hidden"
      />

      <span
        className={ squareStyles({checked}) }
        style={{boxShadow: '3px 3px #3e347b'}}
      >
        <span style={{opacity: 0.69}}>{label}</span>
      </span>

      <span className="ml-[15px] text-cinza font-bold">{displayText}</span>
    </label>
  )
}
