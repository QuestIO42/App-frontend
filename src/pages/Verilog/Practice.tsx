import CodeSpace from "@/components/verilogIDE/CodeSpace";
import ResponseBox from "@/components/verilogIDE/ResponseBox";
import  Header  from "@/components/header/Header";
import { useState, useRef, useEffect } from 'react';
import Footer from "@/components/footer/Footer";
import IconGroup from "@/components/verilogIDE/IconGroup";


interface Size{
  width: string;
  height: string;
}


export default function Practice() {
  const [verilogLang, setVerilog] = useState("module top(input a, input b, output c); assign c =a&b; endmodule;");
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

  const handleIconClick = (value: string) => {
    switch(value){
      case 'waveform':
        console.log('waaaave') //As funções podem ser inseridas aqui
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
    <div>
       <div className="grid min-h-screen w-full overflow-x-hidden grid-cols-4 grid-rows-[auto,1fr,auto] gap-16 bg-grid-pattern">
        <Header/>
            <div className="flex justify-start ml-14 ">
              <div className="bg-[#F2953F] px-6 py-2 font-bold border-preto-default shadow-default-laranja text-cinza">
                <p className="text-left text-2xl">Solucao</p>
              </div>
            </div>

        <div className="col-span-4 flex flex-col items-center justify-center">
        <div className="flex justify-start">
          <div className="flex flex-col gap-12  bg-white border-[3px] px-6 py-1 font-bold border-preto-default shadow-default-preto text-cinza">
              <div className="flex flex-col sm:w-[550px] md:w-[720px] lg:w-[1200px] h-[100%]" ref={divRef}>
                <div className="flex flex-row mt-4 justify-end">
                <IconGroup onIconClick={handleIconClick}></IconGroup>
                </div>
                <CodeSpace verilogLang={verilogLang} setVerilog={setVerilog} width={size.width} height="500px" />
              </div>
          </div>
          </div>

        <div className="mt-6">
          <div className="flex justify-start">
            <div className="flex flex-col mb-4 gap-12 bg-white border-[3px] px-6 py-1 font-bold border-preto-default shadow-default-preto text-cinza">
              <div className="flex flex-row sm:w-[550px] md:w-[720px] lg:w-[1200px] h-[200px] py-4">
                  <ResponseBox verilog_code="I give up" width={size.width}>
                  </ResponseBox>
              </div>
            </div>
          </div>


          </div>
          </div>
        </div>
      <Footer/>
    </div>
  )
}
