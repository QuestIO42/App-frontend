import React, { useState } from 'react'

export default function OpenAnswer({}){
  const [answer, setAnswer] = useState('')
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(event.target.value)
  }
  return(
    <div className="w-full h-full">
      <form action="" autoComplete="off" className="w-full h-full">
        <textarea
          name="answer"
          id=""
          value={answer}
          onChange={handleChange}
          placeholder="Resposta"
          required
          className="border-[3px] border-roxo-900 shadow-default-roxo-500 resize-none p-2 w-full "
          rows={3}
        />
      </form>
    </div>
  )
}
