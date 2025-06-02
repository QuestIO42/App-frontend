import { useState, useRef, ChangeEvent, MouseEvent, ButtonHTMLAttributes } from 'react'
//import axios from 'axios';
import { Link } from 'react-router-dom';
import { cva } from 'class-variance-authority'
import { cn } from '@/utils/cn'
import { api } from '@/services/api/api';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'default';
  buttonDisabled?: 'active' | 'disactive';
  size?: 'small' | 'medium' | 'large';
  to?: string

  // Upload de arquivos
  upload?: boolean;
  uploadUrl?: string;
  fieldName?: string;
  courseId?: string;
  onUploadSuccess?: (response: any) => void;
  onUploadError?: (error: any) => void;
}

const buttonVariants = cva(
  'flex active:scale-90 cursor-pointer items-center justify-center border-[3px] px-6 py-1 text-center font-bold transition-all duration-200 ease-in-out',
  {
    variants: {
      variant: {
        primary:
          'border-roxo-300 shadow-default-roxo-300 text-roxo-300 hover:bg-roxo-300 hover:text-branco hover:shadow-default-roxo-500',
        secondary:
          'border-verde-300 text-verde-300 shadow-default-verde-300 text-cinza hover:bg-verde-300 hover:text-branco hover:shadow-default-verde-900',
        tertiary:
          'border-[#97581F] bg-white text-cinza shadow-default-laranja text-cinza hover:bg-laranja-300 hover:text-branco hover:bg-[#97581F] hover:shadow-default-orange-700',
        quaternary:
          'border-vermelho-300 bg-white text-vermelho-300 shadow-default-vermelho-300 hover:bg-vermelho-300 hover:text-branco hover:shadow-default-vermelho-900',
        default:
          'border-[#DDDDDD] bg-white shadow-default-cinza-300 text-[#999] hover:bg-[#DDDDDD] hover:text-[#777] hover:shadow-default-cinza'
      },
      size: {
        small: 'text-base',
        medium: 'text-xl',
        large: 'text-3xl',
      },
      buttonDisabled: {
        active:
          'cursor-not-allowed bg-roxo-300 opacity-50 shadow-default-roxo-500',
        disactive: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
      buttonDisabled: 'disactive',
    },
  }
)

export default function Button({
  text,
  className,
  variant,
  buttonDisabled,
  size,
  to,
  upload,
  uploadUrl,
  fieldName = 'file',
  courseId,
  onUploadSuccess,
  onUploadError,
  ...rest

}: ButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const isDisabled = rest.disabled;

  const classes = cn(
    buttonVariants({
      variant,
      buttonDisabled: isDisabled ? 'active' : 'disactive',
      size,
    }),
    className
  );

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !uploadUrl) return;
    const formData = new FormData();
    formData.append(fieldName, file);
    if (courseId) {                          // só faz o append se vier um courseId
      formData.append('course_id', courseId);
    }

    try {
      setIsUploading(true);
      const response = await api.post(uploadUrl, formData);
      onUploadSuccess?.(response);
    } catch (error) {
      onUploadError?.(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if(upload) {
      event.preventDefault();
      fileInputRef.current?.click();
    } else if (rest.onClick) {
      rest.onClick(event as any);
    }
  };

  // Renderiza input oculto para upload
  if (upload) {
    return (
      <>
        <input
          type="file"
          accept=".csv"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <button
          className={classes}
          disabled={isDisabled}
          onClick={handleClick}
          {...rest}
        >
          {isUploading ? 'Enviando...' : text}
        </button>
      </>
    );
  }

  if (to) {
    return (
      <Link to={to as string | undefined} className={classes} {...rest as any}>
        {text}
      </Link>
    )
  }

  // Renderiza um botão padrão caso contrário
  return (
    <button
      className={classes}
      disabled={isDisabled}
      onClick={handleClick}
      {...rest}
    >
      {text}
    </button>
  );
}
