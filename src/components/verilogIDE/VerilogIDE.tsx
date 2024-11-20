import React from "react";
interface VerilogProps{
children: React.ReactNode
}

export default function VerilogIDE({children}:  VerilogProps) {
  return(
    <>
    <div className= "flex justify-center ">
    <div className="flex flex-col flex gap-12 w-[1280px] h-[600px] bg-white border-[3px] px-6 py-1 font-bold border-preto-default shadow-default-preto text-cinza">
      {children}
    </div>
    </div>

    </>
  );
}
