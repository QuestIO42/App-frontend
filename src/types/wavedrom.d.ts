/* src/types/wavedrom.d.ts */

// Declarações para o pacote oficial `wavedrom`
declare module 'wavedrom' {
  export const skin: Record<string, any>;

  /**
   * Renderiza um único waveform.
   * @param index - índice único para este waveform
   * @param source - objeto WaveJSON `{ config, signal[] }`
   * @param outputElement - container DOM onde será inserido o SVG
   * @param notFirstSignal - marque `false` para o primeiro sinal no container
   */
  export function renderWaveForm(
    index: number,
    source: {
      config: Record<string, any>;
      signal: Array<{ data?: any[]; name: string; wave: string; }>;
    },
    outputElement: HTMLElement,
    notFirstSignal: boolean
  ): void;

  /**
   * Processa todos os elementos WaveDrom no documento.
   */
  export function processAll(): void;

  // UMD global compatível
  const wavedrom: {
    skin: typeof skin;
    renderWaveForm: typeof renderWaveForm;
    processAll: typeof processAll;
  };
  export default wavedrom;
}

// Declaração para o skin padrão do WaveDrom
declare module 'wavedrom/skins/default.js' {
  // O módulo carrega configurações de skin sem exportar nada específico.
  const content: any;
  export default content;
}

// Declarações para o pacote `@yowasp/wavedrom`
declare module '@yowasp/wavedrom' {
  /**
   * Renderiza um WaveJSON em SVG e retorna a string do SVG.
   * @param source - objeto WaveJSON `{ config, signal[] }` ou JSON string
   */
  export function render(source: any): string;
}
