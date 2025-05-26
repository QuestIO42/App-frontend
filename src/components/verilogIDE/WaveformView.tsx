// components/WaveDromView.tsx
import React, { useEffect, useRef } from 'react';

interface WaveDromViewProps {
  dump: {
    config: Record<string, any>;
    signal: Array<{ name: string; wave: string; data?: any[] }>;
  };
  idx: number;
}

export default function WaveDromView({ dump, idx }: WaveDromViewProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // não rodar no servidor
    if (typeof window === 'undefined') return;
    const container = ref.current;
    if (!container) return;

    (async () => {
      try {
        // importa a função necessária e o skin
        const { renderWaveForm } = await import('wavedrom');
        await import('wavedrom/skins/default.js');

        // limpa qualquer conteúdo anterior
        container.innerHTML = '';

        // desenha o waveform
        renderWaveForm(idx, dump, container, false);
      } catch (err) {
        console.error('Erro ao importar/renderizar WaveDrom:', err);
      }
    })();
  }, [dump, idx]);

  return <div ref={ref} />;
}
