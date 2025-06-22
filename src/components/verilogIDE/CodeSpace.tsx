interface CodeSpaceProps {
  verilogLang: string;
  setVerilog: (value: string) => void;
  height?: string;
  width?: string;
  disabled: boolean;
}

import CodeMirror from '@uiw/react-codemirror';
import { StreamLanguage } from '@codemirror/language';
import { verilog } from '@codemirror/legacy-modes/mode/verilog';
import { EditorView } from '@codemirror/view';
import { useRef} from 'react';
import React from 'react';

const CodeSpace = ({ verilogLang, setVerilog, height = "100%", width="100%", disabled }: CodeSpaceProps) => {
  const editorRef = useRef(null);
  const onChange = React.useCallback((val: string) => {
    setVerilog(val);
  }, [setVerilog]);

  return (
    <CodeMirror
      ref={editorRef}
      value={verilogLang}
      height="550px"
      width={width}
      onChange={onChange}
      editable={!disabled}
      extensions={[
        StreamLanguage.define(verilog),
        EditorView.lineWrapping,
        EditorView.theme({
          "&": { height,width},
          ".cm-scroller": {
            scrollbarColor: "#606060 #A5A5A5",
            scrollbarWidth: "initial",
          },
          ".cm-content": {
            fontFamily: "var(--font-monospace)",
            lineHeight: "1.5",
            fontSize: "14px",
            whiteSpace: "pre",
            paddingTop: '10px',
            color: "var(--color-text)",
            "&.cm-focused": {
              outline: "none",
            },
          },
          "&.cm-editor": {
            padding: "10px",
          },
        }),
      ]}
    />
  );
};

export default CodeSpace;
