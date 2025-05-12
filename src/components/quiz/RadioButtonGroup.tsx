// RadioButtonGroup.tsx
import { useState, useEffect } from 'react'; // Adicionado useEffect
import RadioButton from './RadioButton';
import CheckIcon from '@/components/svgComponents/icons/CheckIcon';
import RedCrossIcon from '@/components/svgComponents/icons/RedCrossIcon';

// NOVO: Interface para cada opção
interface Option {
  id: string;
  label: string; // Ou description, o texto que o usuário vê
}

interface RadioButtonGroupProps {
  options: Option[]; // ALTERADO: Antes era values: string[]
  name: string;
  verified: boolean; // Indica se o grupo de questões foi verificado
  // A prop 'correct' em RadioButtonGroup pode ser ambígua se se refere
  // à questão inteira ou a uma opção específica.
  // Se 'correct' é para o feedback geral do grupo após a verificação, mantenha.
  // Se o feedback de certo/errado é por opção, ele viria do RadioButton individualmente ou do estado UserAnswer.
  // Para este exemplo, vou assumir que 'correct' e 'verifiedValue' se referem à resposta selecionada
  // que foi verificada.
  correctDisplayForSelected?: boolean; // NOVO/Opcional: para mostrar check/cross na opção SELECIONADA E verificada
  handleAnswer: (optionId: string) => void; // ALTERADO: Agora espera optionId
  selectedValueProp?: string; // NOVO/Opcional: Para controlar o valor selecionado de fora (ex: respostas carregadas)
  disabled?: boolean;
}

export default function RadioButtonGroup({
  options,
  name,
  handleAnswer,
  verified, // Se este QuestionBox/grupo foi verificado
  correctDisplayForSelected, // Se a RESPOSTA SELECIONADA está correta (após verificação)
  selectedValueProp, // O ID da opção que deveria estar selecionada (vindo do Quiz.tsx UserAnswers.answer)
  disabled = false,
}: RadioButtonGroupProps) {
  const itemLabels = ['a', 'b', 'c', 'd', 'e', 'f', 'g']; // Para os quadradinhos a, b, c

  // selectedValue agora armazena o ID da opção
  const [selectedValue, setSelectedValue] = useState<string>(selectedValueProp || '');

  // Sincronizar o estado interno se a prop selectedValueProp mudar
  useEffect(() => {
    if (selectedValueProp !== undefined) {
      setSelectedValue(selectedValueProp);
    }
  }, [selectedValueProp]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentOptionId = e.target.value; // e.target.value agora é o optionId, graças à mudança no RadioButton.tsx
    if (!disabled) { // Só processa se não estiver desabilitado globalmente
        setSelectedValue(currentOptionId);
        handleAnswer(currentOptionId); // Passa o ID para o componente pai (Quiz.tsx)
    }
  };

  return (
    <div>
      {options.map((option, index) => {
        const isCurrentlySelected = selectedValue === option.id;
        // Mostra o ícone de check/cross APENAS se este grupo foi verificado E esta opção é a que estava selecionada no momento da verificação
        const showFeedbackIcon = verified && isCurrentlySelected;

        return (
          <div key={option.id} className="flex items-center my-2"> {/* Ajustado espaçamento */}
            <RadioButton
              label={itemLabels[index % itemLabels.length]} // Usa o itemLabel (a,b,c)
              name={name}
              optionId={option.id} // Passa o ID da opção
              displayText={option.label} // Passa o texto de exibição da opção
              checked={isCurrentlySelected}
              onChange={handleChange}
              // Desabilita o RadioButton individual se o grupo todo está desabilitado (verified),
              // ou se a prop 'disabled' geral do RadioButtonGroup for true.
              disabled={disabled || verified}
            />
            {/* Feedback visual (check/cross) ao lado da opção selecionada APÓS a verificação do grupo */}
            {showFeedbackIcon && (
              <div className="ml-2">
                {correctDisplayForSelected ? <CheckIcon /> : <RedCrossIcon />}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}