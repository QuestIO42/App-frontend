import WaveDromComponent from "@/components/verilogIDE/WaveDromComponent";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    WaveDrom: {
      ProcessAll: () => void;
    };
  }
}

export default function Waveform() {
  const location = useLocation();
  const [dumps, setDumps] = useState<any[]>([]);
  const [questionName, setQuestionName] = useState("Waveforms");

  useEffect(() => {
    // Extrai o sessionId da query string
    const params = new URLSearchParams(location.search);
    const sessionId = params.get('sessionId');

    if (sessionId) {
      // Recupera os dados do sessionStorage
      const storedData = sessionStorage.getItem(sessionId);

      if (storedData) {
        const { dumps, questionName } = JSON.parse(storedData);
        setDumps(dumps);
        setQuestionName(questionName);

        // Limpa o sessionStorage após uso (opcional)
        sessionStorage.removeItem(sessionId);
      }
    }
  }, [location]);

  if (dumps.length === 0) {
    return <p>Nenhum waveform para exibir.</p>;
  }

  return (
    <div className="min-h-screen min-w-full inline-block flex flex-col items-center justify-start py-20 bg-grid-pattern">
      <div className="px-8 py-2 mb-32 font-bold bg-vermelho-300 shadow-default-vermelho-900">
        <h2 className="text-2xl text-vermelho-900">{questionName}</h2>
      </div>

      <div className="flex flex-col xl:flex-row items-center justify-center w-[90%] gap-28">
        {dumps.map((singleWaveJson: any, index: number) => (
          <div key={index} className="w-fit p-3 flex items-center justify-center bg-[#DDDDDD] shadow-default-cinza">
            <WaveDromComponent
              waveJson={singleWaveJson}
              id={`wavedrom-${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
