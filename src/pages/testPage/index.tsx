import CodeSpace from '@/components/verilogIDE/CodeSpace'

import ResponseBox from '@/components/verilogIDE/ResponseBox'
import { useState } from 'react';



export default function Test() {

    const [verilogLang, setVerilog] = useState("module top(input a, input b, output c); assign c =a&b; endmodule;");
  return(
    <div>

        <div className="flex flex-row w-[100%] h-[100%]">
        <CodeSpace verilogLang={verilogLang} setVerilog={setVerilog} />
        </div>



      <div className="flex flex-row w-[100%] h-[100%]">

          </div>

    </div>
  )
}
