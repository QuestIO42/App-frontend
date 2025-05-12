import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Question } from '@/interfaces/Quiz';
import { postVerilogAnswer } from '@/services/api/answer';
import ReactMarkdown from 'react-markdown'
import CodeSpace from "@/components/verilogIDE/CodeSpace";
import ResponseBox from "@/components/verilogIDE/ResponseBox";
import IconGroup from "@/components/verilogIDE/IconGroup";


interface Size{
  width: string;
  height: string;
}

interface PracticeProps {
  question: Question;
  id_quiz: string | undefined;
}

export default function Practice({ question, id_quiz }: PracticeProps) {
  const { user } = useAuth();
  const divRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<Size>({width: "0", height: "0"});
  // Enunciado sem o código base
  const [questionContent, setQuestionContent] = useState<string>("");
  // Código exibido em CodeSpace
  const [verilogAnswer, setVerilog] = useState("");
  // Feedback exibido em ResponseBox
  const [feedback, setFeedback] = useState<string>("Aguardando execução...");

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
      console.log("QUESTÃO: " + question.content)
      // Código base em Markdown - ```verilog ... ```
      const regex = /```verilog\s*([\s\S]*?)\s*```/;
      const match = question.content.match(regex);

      if (match) {
        console.log("MARKDOWN" + match[1].trim());
        const code = match[1].trim();
        setVerilog(code);

        const cleaned = question.content.replace(regex, "").trim();
        setQuestionContent(cleaned);
      } else {
        setQuestionContent(question.content);
      }
    }
  }, [question.content]);

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

      const textualFeedback = typeof result.feedback === 'string'
        ? result.feedback
        : Object.values(result.feedback).join('\n');

      setFeedback(prev => `${prev}\n\nResultado: ${result.result}\nScore: ${result.score}\n${textualFeedback}`);
    } catch (err) {
      console.error("Erro ao corrigir Verilog:", err);
      setFeedback("Erro ao conectar com o servidor ou ao corrigir.");
    }
  };

  // Funções dos ícones
  const handleIconClick = (value: string) => {
    switch(value){
      case 'waveform':
        // Função para criar gráfico
        break;
      case 'save':
        // Função para salvar resposta
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
          <div>
            <ReactMarkdown>{questionContent}</ReactMarkdown>
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
                <IconGroup onIconClick={handleIconClick}/>
              </div>

              <CodeSpace verilogLang={verilogAnswer} setVerilog={setVerilog} width={size.width} height="500px" />
            </div>
          </div>
        </div>

        {/* Console */}
        <div className="w-full mt-6">
          <div className="flex justify-start">
            <div className="flex flex-col mb-4 gap-12 bg-white border-[3px] px-6 py-1 border-preto-default shadow-default-preto text-cinza">
              <div className="flex flex-row w-full h-[200px] py-4">
                  <ResponseBox verilog_code={feedback} width={size.width} height="130px"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
