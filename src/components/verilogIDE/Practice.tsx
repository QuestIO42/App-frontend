import { useState, useRef, useEffect } from 'react';
import { Question } from '@/interfaces/Quiz';
import { postVerilogAnswer } from '@/services/api/answer';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeSpace from "@/components/verilogIDE/CodeSpace";
import ResponseBox from "@/components/verilogIDE/ResponseBox";
import IconGroup from "@/components/verilogIDE/IconGroup";
import CheckIcon from '../svgComponents/icons/CheckIcon';
import RedCrossIcon from '../svgComponents/icons/RedCrossIcon';
import { useNavigate } from 'react-router-dom';

interface Size {
  width: string;
  height: string;
}

interface PracticeProps {
  question: Question;
  id_quiz?: string;
  initialCode: string;
  onChangeCode: (id_question: string, code: string) => void;
  disabled: boolean;
  score?: number;
}

interface FeedbackEntry {
  message: string;
  error?: string;
  dump?: any;
}

export default function Practice({ question, id_quiz, initialCode, onChangeCode, disabled, score }: PracticeProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<Size>({ width: "0", height: "0" });

  const [questionContent, setQuestionContent] = useState<string>("");
  const [verilogAnswer, setVerilog] = useState(initialCode);
  const [feedback, setFeedback] = useState<React.ReactNode>("Aguardando execução...");
  const [showWaveform, setShowWaveform] = useState(false);
  const [waveformDumps, setWaveformDumps] = useState<any[]>([]);

  const colorMap = {
    wrong: 'text-red-600',
    partial: 'text-yellow-600',
    right: 'text-green-600',
  };

  const navigate = useNavigate();

  const hasInitialized = useRef(false);

  useEffect(() => {
    // A condição para renderizar é:
    // 1. O usuário quer ver o waveform (showWaveform === true)
    // 2. Já recebemos os dados da API (waveformDumps.length > 0)
    if (showWaveform && waveformDumps.length > 0) {
      // Este efeito executa DEPOIS do React ter renderizado os WaveDromComponents no DOM.

      // Usamos um setTimeout com 0ms para empurrar a execução para o final
      // da fila de tarefas do navegador. Isso garante que o DOM esteja 100%
      // atualizado antes de tentarmos processá-lo. É um truque comum
      // para lidar com bibliotecas que manipulam o DOM diretamente.
      const timerId = setTimeout(() => {
        if (window.WaveDrom) {
          console.log("Practice.tsx: Chamando ProcessAll() porque os dumps estão prontos e visíveis.");
          window.WaveDrom.ProcessAll();
        }
      }, 0);

      // Função de limpeza
      return () => clearTimeout(timerId);
    }
  }, [showWaveform, waveformDumps]);

  // Feedback baseado no score
  useEffect(() => {
    if (score !== undefined && score !== null) {
      if (score !== 0) {
        setFeedback(
          <div className="flex items-center gap-3">
            <span className="text-green-600 font-semibold">Correto</span>
            <CheckIcon className="h-5 w-5 text-green-500" />
          </div>
        );
      } else {
        setFeedback(
          <div className="flex items-center gap-3">
            <span className="text-red-600 font-semibold">Incorreto</span>
            <RedCrossIcon className="h-5 w-5 text-red-500" />
          </div>
        );
      }
    } else {
      setFeedback("Aguardando execução...");
    }
  }, [score]);

  // Efeitos para inicialização e resize (inalterados)
  useEffect(() => {
    if (!hasInitialized.current) {
      setVerilog(initialCode);
      hasInitialized.current = true;
    }
  }, [initialCode]);

  useEffect(() => {
    const handleResize = () => {
      if (divRef.current) {
        setSize({
          width: `${divRef.current.offsetWidth}px`,
          height: `${divRef.current.offsetHeight}px`
        });
      }
    };
    const resizeObserver = new ResizeObserver(handleResize);
    if (divRef.current) {
      resizeObserver.observe(divRef.current);
    }
    return () => {
      if (divRef.current) {
        resizeObserver.unobserve(divRef.current);
      }
    };
  }, []);

  // Separa o enunciado do código base
  useEffect(() => {
    if (question.content) {
      const regex = /```verilog\s*([\s\S]*?)\s*```/;
      const match = question.content.match(regex);
      if (match) {
        const code = match[1].trim();
        if (!initialCode) {
          setVerilog(code);
        }
        const cleaned = question.content.replace(regex, "").trim();
        setQuestionContent(cleaned);
      } else {
        setQuestionContent(question.content);
      }
    }
  }, [question.content, initialCode]);

  // Submissão do código Verilog
  const handleVerilogSubmit = async () => {
    if (!question?.id || !id_quiz) {
      setFeedback("Erro: questão ou quiz não encontrados.");
      return;
    }
    setFeedback("Executando testes...");
    let verilogToSend = verilogAnswer?.trim() || "Código Verilog não fornecido.";
    try {
      const result = await postVerilogAnswer(id_quiz, question.id, verilogToSend);
      const resultClass = colorMap[result.result as keyof typeof colorMap] || 'text-gray-600';
      const feedbackEntries = Object.values(result.feedback ?? {}) as FeedbackEntry[];
      const dumps = feedbackEntries.filter(entry => entry.dump).map(entry => entry.dump).flat();
      console.log('API Dumps recebidos:', JSON.stringify(dumps, null, 2));
      setWaveformDumps(dumps);

      const firstWithError = feedbackEntries.find((entry: any) => entry?.error);
      const hasSyntaxError = !!firstWithError;
      let formattedFeedback;
      if (hasSyntaxError) {
        const { message, error } = firstWithError;
        formattedFeedback = (
          <div className="mb-4">
            <p className="font-semibold text-sm text-preto-default">Mensagem:</p>
            <pre className="text-xs whitespace-pre-wrap text-[#5c5b5b]">{message}</pre>
            <p className="font-semibold text-sm mt-2 text-preto-default">Erro de compilação:</p>
            <pre className="text-xs whitespace-pre-wrap text-red-600">{error}</pre>
          </div>
        );
      } else {
        formattedFeedback = feedbackEntries.map((entry: any, index: number) => (
          <div key={index} className="mb-4">
            <p className="font-semibold text-sm text-preto-default">Mensagem do teste {index + 1}:</p>
            <pre className="text-xs whitespace-pre-wrap text-[#5c5b5b]">{entry.message}</pre>
          </div>
        ));
      }
      setFeedback(
        <div className="whitespace-pre-wrap text-[#5c5b5b]">
          <div className="flex">
            <p className="font-semibold">Resultado:</p>
            <p className={`ml-2 ${resultClass}`}>{result.result}</p>
          </div>
          <div className="flex">
            <p className="font-bold">Score:</p>
            <p className={`ml-2 ${resultClass}`}>{result.score}</p>
          </div>
          <div className="mt-4">{formattedFeedback}</div>
        </div>
      );
    } catch (err) {
      console.error("Erro ao corrigir Verilog:", err);
      setFeedback("Erro ao conectar com o servidor ou ao corrigir.");
    }
  };

  const handleIconClick = (value: string) => {
    switch (value) {
      case 'waveform':
        if (waveformDumps && waveformDumps.length > 0) {
          // Cria um ID único para armazenar os dados temporariamente
          const sessionId = `waveform-${Date.now()}`;

          // Armazena os dados na sessionStorage
          sessionStorage.setItem(sessionId, JSON.stringify({
            dumps: waveformDumps,
            questionName: question.name
          }));

          const url = `${window.location.origin}${location.pathname}/waveform?sessionId=${sessionId}`;
          window.open(url, '_blank');
        } else {
          setFeedback("Execute a simulação para visualizar os waveforms.");
        }
        break;

      case 'play':
        handleVerilogSubmit();
        break;

      default:
        console.log("Ação de ícone não reconhecida:", value);
    }
  };

  return (
    <div className="grid w-full overflow-x-hidden grid-cols-4 grid-rows-[auto,1fr,auto]">
      <div className="w-[90%] mx-auto col-span-4 flex flex-col items-center justify-center">
        <div className="self-start w-fit flex justify-center bg-[#F2953F] px-8 py-2 mb-6 font-bold border-preto-default shadow-default-laranja text-[#6b3605]">
          <p className="text-left text-2xl">Verilog</p>
        </div>

        {/* Enunciado */}
        <div className="w-full flex flex-col gap-4 items-center px-8 py-12 border-2 border-[#a8a8a8] bg-white">
          <h1 className="text-3xl font-bold text-preto-default uppercase">{question.name}</h1>
          <div className="text-[15px] prose prose-sm max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{questionContent}</ReactMarkdown>
          </div>
        </div>

        {/* Área de código */}
        <div className="w-full flex flex-col justify-start mt-6">
          <div className="flex flex-col gap-12 bg-white border-[3px] px-6 py-1 font-bold border-preto-default shadow-default-preto text-cinza">
            <div className="flex flex-col h-[100%]" ref={divRef}>
              <div className="flex flex-row mt-4 mb-2 justify-end">
                <IconGroup onIconClick={handleIconClick} disabled={disabled} />
              </div>
              <CodeSpace
                verilogLang={verilogAnswer}
                setVerilog={(novoTexto: string) => {
                  setVerilog(novoTexto);
                  onChangeCode(question.id, novoTexto);
                }}
                width={size.width}
                height="500px"
                disabled={disabled}
              />
            </div>
          </div>
        </div>

        {/* Console */}
        <div className="w-full mt-6">
          <div className="flex justify-start">
            <div className="flex flex-col mb-4 bg-white border-[3px] px-6 py-1 border-preto-default shadow-default-preto text-cinza">
              <div className="flex flex-row w-full h-[240px] py-4">
                <ResponseBox verilog_code={feedback} width={size.width} height="170px" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
