interface FormInputProps {
  label: string;
  type: React.HTMLInputTypeAttribute;
}

export default function FormInput({ label, type }: FormInputProps) {
  return (
    <div className="mb-4">
      <label className="mb-2 block font-mono text-sm font-semibold text-preto-texto sm:text-base md:text-lg lg:text-xl">
        {label}
      </label>
      <input
        className={`border-[2px] border-roxo-claro px-2 py-1 text-base font-semibold text-preto-texto shadow-default-btn focus:border-roxo-escuro focus:shadow-roxo-escuro sm:border-[2.5px] sm:px-3 sm:text-lg md:border-[3px] md:px-4 md:text-xl lg:text-2xl`}
        type={type}
      />
    </div>
  );
}
