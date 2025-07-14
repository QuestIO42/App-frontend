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

function WaveDromComponent({ waveJson }: WaveDromComponentProps) {
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.WaveDrom && diagramRef.current) {
      const scriptElement = document.createElement('script');
      scriptElement.type = 'WaveDrom';
      scriptElement.textContent = JSON.stringify(waveJson);

      // Limpa o conteúdo anterior e adiciona o script
      diagramRef.current.innerHTML = '';
      diagramRef.current.appendChild(scriptElement);

      // Renderiza o diagrama
      window.WaveDrom.ProcessAll();
    }
  }, [waveJson]);

  return <div ref={diagramRef}></div>;
}

export default WaveDromComponent;
