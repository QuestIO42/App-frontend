import OpenAnswer from "@/components/quiz/OpenAnswer"

import { useState } from 'react';

export default function Test() {

    const [verilogLang, setVerilog] = useState("module top(input a, input b, output c); assign c =a&b; endmodule;");
  return(
      <div className="px-4">
        <OpenAnswer
          title="Título do Componente"
          description="Uma descrição que não deve ultrapassar o limite do contêiner pai.skjkdjakjdkasjdkajsdkajsdkajsdkjaskdjaksjdakjsdkajsdjasjdkasdkajskdaksjdkasjdaskdaksdjaksjdkasjdkajsdkjaskdjaskjdksajdkajsdkajsdkjaskdjaksjdkasjdkajsdkjaskdjkasjdkajsdk"
        />
      </div>
  )
}
