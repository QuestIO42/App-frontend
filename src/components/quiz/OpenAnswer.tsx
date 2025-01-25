import React, { useState } from 'react'
interface OpenAnswerProps {
    title: string;
    description: string;
  }


export default function OpenAnswer({ title, description }:OpenAnswerProps){
  const [answer, setAnswer] = useState('')
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(event.target.value)
  }
  return(
        <div className="flex flex-col w-full space-y-5">
            <h1 className="text-3xl font-bold text-cinza">{title}</h1>
            <p className="break-words text-cinza">{description}</p>
            <form action="" autoComplete="off" >
                <textarea name="answer" id="" value={answer} onChange={handleChange} placeholder="Resposta" required className="border-[3px] border-roxo-900 shadow-default-roxo-500 resize-none p-2 w-full" rows={3}/>
            </form>
        </div>
    )
}
