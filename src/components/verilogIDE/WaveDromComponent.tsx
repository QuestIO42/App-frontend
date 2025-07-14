import { useRef, useEffect } from 'react';

// Declaração de tipagem para window.WaveDrom
declare global {
  interface Window {
    WaveDrom: {
      ProcessAll: () => void;
    };
  }
}

interface WaveDromComponentProps {
  id: string
  waveJson: object;
}

function WaveDromComponent({ id, waveJson }: WaveDromComponentProps) {
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.WaveDrom && diagramRef.current) {
      // Limpa o conteúdo anterior
      diagramRef.current.innerHTML = '';

      const scriptElement = document.createElement('script');
      scriptElement.type = 'WaveDrom';
      scriptElement.textContent = JSON.stringify(waveJson);
      scriptElement.id = id;

      diagramRef.current.appendChild(scriptElement);
      window.WaveDrom.ProcessAll();
    }
  }, [waveJson, id]);

  return (
    <div
      id={`wavedrom-diagram-${id}`}
      ref={diagramRef}
      className="inline-block origin-center"
    ></div>
  );
}

export default WaveDromComponent;
