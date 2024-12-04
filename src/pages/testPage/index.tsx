import CodeSpace from '@/components/verilogIDE/CodeSpace'
import VerilogIDE from '@/components/verilogIDE/VerilogIDE'
import DigitalJSSpace from '@/components/verilogIDE/DigitalJSSpace'
import { useState } from 'react';



export default function Test() {
    const [verilogLang, setVerilog] = useState("module top(input a, input b, output c); assign c =a&b; endmodule;");
  return(
    <div>
      <VerilogIDE>
        <div className="flex flex-row w-[100%] h-[100%]">
        <CodeSpace verilogLang={verilogLang} setVerilog={setVerilog} />
        <DigitalJSSpace verilogLang={verilogLang}/>
        </div>
      </VerilogIDE>


    </div>
  )
}
