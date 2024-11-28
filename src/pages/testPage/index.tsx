import CodeSpace from '@/components/verilogIDE/CodeSpace'
import VerilogIDE from '@/components/verilogIDE/VerilogIDE'
import DigitalJS from '@/components/verilogIDE/DigitalJS'
import { useState } from 'react';


export default function Test() {
    const [verilogLang, setVerilog] = useState("console.log('hello world!');");
  return(
    <div>
      <VerilogIDE>
        <div className="flex flex-row w-[100%] h-[100%]">
        <CodeSpace verilogLang={verilogLang} setVerilog={setVerilog} />
        <DigitalJS value={verilogLang} />
        </div>
      </VerilogIDE>


    </div>
  )
}
