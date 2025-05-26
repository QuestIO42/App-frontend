import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Question } from '@/interfaces/Quiz';
import { postVerilogAnswer } from '@/services/api/answer';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import CodeSpace from "@/components/verilogIDE/CodeSpace";
import ResponseBox from "@/components/verilogIDE/ResponseBox";
import IconGroup from "@/components/verilogIDE/IconGroup";
import WaveformView from './WaveformView';

interface Size{
  width: string;
  height: string;
}

interface PracticeProps {
  question: Question;
  id_quiz: string ;
}

interface FeedbackEntry {
  message: string;
  error?: string;
  dump?: any;
}

export default function Practice({ question, id_quiz }: PracticeProps) {
  const { user } = useAuth();
  const divRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<Size>({width: "0", height: "0"});

  // Enunciado sem o código base
  const [questionContent, setQuestionContent] = useState<string>("");

  // Código exibido em CodeSpace
  const [verilogAnswer, setVerilog] = useState("");
  const [savedCode, setSavedCode] = useState<string>("");
  const [isModified, setIsModified] = useState<boolean>(false);

  // Feedback exibido em ResponseBox
  const [feedback, setFeedback] = useState<React.ReactNode>("Aguardando execução...");

  // Waveform
  const [showWaveform, setShowWaveform] = useState(false);
  const [waveformDumps, setWaveformDumps] = useState<any[]>([]);

  // Mapa de cores para o feedback
  const colorMap = {
    wrong: 'text-red-600',
    partial: 'text-yellow-600',
    right: 'text-green-600',
  };

  useEffect(() => {
    const handleResize = () => {
      if(divRef.current){
        setSize({
          width: `${divRef.current.offsetWidth}px`,
          height: `${divRef.current.offsetHeight}px`
        })
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

  // Separa o enunciado da questão do código base do execício
  // Código base é inserido direto no CodeSpace
  useEffect(() => {
    if (question.content) {
      // Código base em Markdown - ```verilog ... ```
      const regex = /```verilog\s*([\s\S]*?)\s*```/;
      const match = question.content.match(regex);

      if (match) {
        const code = match[1].trim();
        setVerilog(code);

        const cleaned = question.content.replace(regex, "").trim();
        setQuestionContent(cleaned);
      } else {
        setQuestionContent(question.content);
      }
    }
  }, [question.content]);

  // Verifica alterações no CodeSpace
  useEffect(() => {
    setIsModified(verilogAnswer !== savedCode);
  }, [verilogAnswer, savedCode]);

  // Carrega o código salvo no LocalStorage
  useEffect(() => {
    const key = `quiz_${id_quiz}_q${question.id}_user${user?.id}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      setVerilog(stored);
      setSavedCode(stored);
    }
  }, [id_quiz, question.id, user?.id]);

  // Função para o ícone de save
  const handleSave = () => {
    // salva o estado atual no localStorage, usando uma chave única por questão e usuário
    const key = `quiz_${id_quiz}_q${question.id}_user${user?.id}`;
    localStorage.setItem(key, verilogAnswer);
    setSavedCode(verilogAnswer);
    setIsModified(false);
  };

  // Função para o ícone de play
  const handleVerilogSubmit = async () => {
    if (!question?.id || !id_quiz) {
      setFeedback("Erro: questão ou quiz não encontrados.");
      return;
    }

    setFeedback("Executando testes...");

    try {
      const result = await postVerilogAnswer(
        user?.id.toString() || '',
        id_quiz,
        question.id,
        verilogAnswer,
      );

      const resultClass = colorMap[result.result as keyof typeof colorMap] || 'text-gray-600';

      // Processa o feedback dependendo da estrutura
      const feedbackEntries = Object.values(result.feedback ?? {}) as FeedbackEntry[];

      // Pega os dumps para criar os waveforms
      const dumps = feedbackEntries
        .filter(entry => entry.dump)
        .map(entry => entry.dump)
        .flat();

      setWaveformDumps(dumps);

      // Detecta erro de compilação
      const firstWithError = feedbackEntries.find((entry: any) => entry?.error);
      const hasSyntaxError = !!firstWithError;

      let formattedFeedback;

      if (hasSyntaxError) {
        // Apenas uma mensagem de erro exibida
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
        // Exibe todos os feedbacks de testes
        formattedFeedback = feedbackEntries.map((entry: any, index: number) => (
          <div key={index} className="mb-4">
            <p className="font-semibold text-sm text-preto-default">Mensagem do teste {index + 1}:</p>
            <pre className="text-xs whitespace-pre-wrap text-[#5c5b5b]">{entry.message}</pre>


            {entry.dump && (
              <div className="mt-2 border border-gray-300 p-2 rounded">
                <WaveformView idx={index} dump={entry.dump} />
              </div>
            )}
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

  // Funções dos ícones
  const handleIconClick = (value: string) => {
    switch(value){
      case 'waveform':
        setShowWaveform(prev => !prev);
        break;

      case 'save':
        if (isModified) handleSave();
        break;

      case 'play':
        handleVerilogSubmit();
        break;

      default:
        console.log("oh no")
    }
  }

  return(
    <div className="grid w-full overflow-x-hidden grid-cols-4 grid-rows-[auto,1fr,auto]">
      <div className="w-[90%] mx-auto col-span-4 flex flex-col items-center justify-center">
        {/* Enunciado */}
        <div className="w-full flex flex-col gap-4 items-center px-16 py-12 border-2 border-[#a8a8a8] bg-white">
          <h1 className="text-3xl font-bold text-preto-default uppercase">{question.name}</h1>
          <div className="text-[15px] prose prose-sm max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{questionContent}</ReactMarkdown>
          </div>
        </div>

        {/* Área de código */}
        <div className="w-full flex flex-col justify-start mt-10">
          <div className="w-[180px] flex justify-center bg-[#F2953F] px-6 py-2 mb-6 font-bold border-preto-default shadow-default-laranja text-cinza">
            <p className="text-left text-2xl">Solução</p>
          </div>

          <div className="flex flex-col gap-12 bg-white border-[3px] px-6 py-1 font-bold border-preto-default shadow-default-preto text-cinza">
            <div className="flex flex-col h-[100%]" ref={divRef}>
              <div className="flex flex-row mt-4 mb-2 justify-end">
                <IconGroup onIconClick={handleIconClick} isModified={isModified}/>
              </div>

              <CodeSpace verilogLang={verilogAnswer} setVerilog={setVerilog} width={size.width} height="500px" />
            </div>
          </div>
        </div>

        {/* Console */}
        <div className="w-full mt-6">
          <div className="flex justify-start">
            <div className="flex flex-col mb-4 gap-12 bg-white border-[3px] px-6 py-1 border-preto-default shadow-default-preto text-cinza">
              <div className="flex flex-row w-full h-[240px] py-4">
                  <ResponseBox verilog_code={feedback} width={size.width} height="170px"/>
              </div>
            </div>
          </div>
        </div>

        {/* Gráficos Waveform */}
        {showWaveform && waveformDumps.length > 0 && (
          <div className="w-full mt-6">
            <div className="flex justify-start">
              <div className="flex flex-col mb-4 gap-12 bg-white border-[3px] px-6 py-1 border-preto-default shadow-default-preto text-cinza">
                <div className="flex flex-col w-full py-4">
                  <p className="font-bold mb-2">Sinais de simulação:</p>
                  {waveformDumps.map((dump, index) => (
                    <div key={index} className="mb-4">
                      <WaveformView idx={index} dump={dump} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
