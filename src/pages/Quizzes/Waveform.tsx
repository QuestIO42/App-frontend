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
    <div>
      <h2>{questionName}</h2>
      {dumps.map((singleWaveJson: any, index: number) => (
        <div key={index} style={{ marginBottom: '30px' }}>
          <WaveDromComponent
            waveJson={singleWaveJson}
            id={`wavedrom-${index}`}
          />
        </div>
      ))}
    </div>
  );
}
