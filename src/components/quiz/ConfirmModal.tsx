import Button from '@/components/utility/Button';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmModal({
  isOpen,
  title,
  description,
  onCancel,
  onConfirm,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white shadow-default-preto-900 border-4 border-solid border-black p-12 w-[90%] max-w-lg text-center">
        <h2 className="text-xl font-bold text-black">{title}</h2>
        <p className="text-gray-600 mt-3">{description}</p>
        <div className="flex justify-center gap-8 mt-8">
          <Button onClick={onCancel} className="py-2" text="Cancelar" variant="default" />
          <Button onClick={onConfirm} className="py-2" text="Confirmar" variant="primary" />
        </div>
      </div>
    </div>
  );
}
