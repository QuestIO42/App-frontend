declare module 'wavedrom' {
  export function renderWaveForm(
    index: number,
    source: {
      config: Record<string, any>;
      signal: Array<{
        data?: any[];
        name: string;
        wave: string;
      }>;
    },
    outputElement: HTMLElement,
    notFirstSignal: boolean
  ): void;
}