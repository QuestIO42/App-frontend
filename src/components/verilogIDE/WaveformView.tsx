import React, { useRef, useEffect } from 'react';
import * as WaveDrom from 'wavedrom';

interface WaveDromProps {
  jsonData: {
    config: Record<string, any>;
    signal: Array<{
      data?: any[];
      name: string;
      wave: string;
    }>;
  };
}

const WaveDromComponent: React.FC<WaveDromProps> = ({ jsonData }) => {
  const waveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (waveRef.current) {
      try {
        // Render the waveform into the div
        WaveDrom.renderWaveForm(0, jsonData, waveRef.current, false);
      } catch (error) {
        console.error('Error rendering WaveDrom:', error);
      }
    }
  }, [jsonData]); // Re-run when jsonData changes

  return (
    <div
      ref={waveRef}
      style={{ width: '100%', height: '400px' }} // Set dimensions
    />
  );
};

export default WaveDromComponent;