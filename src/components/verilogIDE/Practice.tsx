import { useState, useRef, useEffect } from 'react';
import CodeSpace from "@/components/verilogIDE/CodeSpace";
import ResponseBox from "@/components/verilogIDE/ResponseBox";
import IconGroup from "@/components/verilogIDE/IconGroup";
import { Question } from '@/interfaces/Quiz';

interface Size{
  width: string;
  height: string;
}

interface PracticeProps {
  question: Question;
}

export default function Practice({ question }: PracticeProps) {
  // Código padrão carregado ao abrir a página
  const [verilogLang, setVerilog] = useState("module top(\n  input a, \n  input b, \n  output c \n); \n\nassign c = a & b; \n\nendmodule;");
  const divRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<Size>({width: "0", height: "0"});

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

  // Funções dos ícones
  const handleIconClick = (value: string) => {
    switch(value){
      case 'waveform':
        console.log('waaaave')
        break;
      case 'save':
        console.log('saaave')
        break;
      case 'play':
        console.log('plllaayy')
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
          <p className="text-[#454545]">{question.content}</p>
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

              <CodeSpace verilogLang={verilogLang} setVerilog={setVerilog} width={size.width} height="500px" />
            </div>
          </div>
        </div>

        {/* Console */}
        <div className="w-full mt-6">
          <div className="flex justify-start">
            <div className="flex flex-col mb-4 gap-12 bg-white border-[3px] px-6 py-1 border-preto-default shadow-default-preto text-cinza">
              <div className="flex flex-row w-full h-[200px] py-4">
                  <ResponseBox verilog_code="..." width={size.width} height="130px"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
