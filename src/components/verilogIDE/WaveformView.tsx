import { useEffect, useState } from 'react';
import { render } from '@yowasp/wavedrom';

interface WaveDromViewProps {
  dump: any;
  idx: number;
}

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

// Caracteres permitidos pelo WaveDrom
const VALID_WAVE_CHARS = ['l', 'h', 'x', 'z', 'p', 'n', 'u', 'd', '.', '|'];

export default function WaveDromView({ dump, idx }: WaveDromViewProps) {
  const [svgContent, setSvgContent] = useState<string>('');

  useEffect(() => {
    try {
      // Converter estrutura
      const waveData = convertToWaveJSON(dump);

      // Sanitizar valores
      const sanitizedData = sanitizeWaveData(waveData);

      // Renderizar
      const svg = render(waveData);
      setSvgContent(svg);
    } catch (err) {
      console.error('Erro ao renderizar:', err);

      // Tratamento seguro do erro
      let errorMessage = 'Erro desconhecido';
      if (isError(err)) {
        errorMessage = err.message;
        // Acesso seguro a propriedades adicionais
        if ('dump' in err) console.log('Dump do erro:', err.dump);
      }

      setSvgContent(`<div style="color:red;padding:1rem">
        ${errorMessage}<br/>
        ${JSON.stringify(dump, null, 2)}
      </div>`);
    }
  }, [dump]);

  // Função auxiliar para verificação de chaves numéricas
  const isNumericKeyObject = (obj: object): boolean => {
    return Object.keys(obj).every(k => {
      const numericKey = Number(k);
      return !isNaN(numericKey) &&
            Number.isInteger(numericKey) &&
            numericKey >= 0;
    });
  };

  // Conversão de estrutura
  const convertToWaveJSON = (rawData: any) => {
    // Caso 1: Formato já correto
    if (rawData?.signal && rawData?.config) return rawData;

    // Caso 2: Objeto com chaves numéricas
    if (typeof rawData === 'object' && isNumericKeyObject(rawData)) {
      return {
        signal: Object.values(rawData),
        config: { hscale: 1 }
      };
    }

    throw new Error(`Formato inválido: ${typeof rawData}`);
  };

  // Sanitização de valores
  const sanitizeWaveData = (data: any) => {
    return {
      ...data,
      signal: data.signal.map((signal: any) => ({
        ...signal,
        wave: sanitizeWaveString(signal.wave),
        data: signal.data || []
      }))
    };
  };

  // Corrige caracteres inválidos
  const sanitizeWaveString = (wave: string) => {
    return Array.from(wave)
      .map(c => {
        // Substitui valores numéricos
        if (c === '0') return 'l';
        if (c === '1') return 'h';
        // Mantém apenas caracteres válidos
        return VALID_WAVE_CHARS.includes(c) ? c : 'x';
      })
      .join('');
  };

  return (
    <div
      dangerouslySetInnerHTML={{ __html: svgContent }}
      style={{
        overflowX: 'auto',
        backgroundColor: '#fff',
        padding: '1rem',
        borderRadius: '4px'
      }}
    />
  );
}