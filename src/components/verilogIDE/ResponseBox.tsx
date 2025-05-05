import {useState} from 'react';

/* Esse componente vai fazer uma chamada pra api, e vai retornar no seu corpo
a mensagem de compilação do icarus*/

interface ResponseBoxProps {
  verilog_code: string;
  //testbench_code: string;
  //api_key: string;
  width?: string;
  height?: string;
}

const ResponseBox = ({verilog_code, width, height}: ResponseBoxProps) => {
  const [text, setText] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <div>
      <p className="text-xl text-laranja font-bold mb-2">Saída</p>

      <div>
        <textarea
          value={verilog_code}
          onChange={handleChange}
          style={{ width:width ||'90%', height:height || '100%', resize: 'none' }}
          className="focus:outline-none border-none p-2"
        />
      </div>
    </div>
  );
};

export default ResponseBox
