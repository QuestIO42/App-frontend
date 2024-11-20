import CodeSpace from '@/components/verilogIDE/CodeSpace'
import VerilogIDE from '@/components/verilogIDE/VerilogIDE'
export default function Test() {
  return(
    <div>
      <VerilogIDE>
        <div className="flex flex-row w-[100%] h-[100%]">
        <CodeSpace />
        <CodeSpace />
        </div>
      </VerilogIDE>


    </div>
  )
}
