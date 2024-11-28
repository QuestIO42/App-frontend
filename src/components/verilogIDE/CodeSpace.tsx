interface CodeSpaceProps {
  verilogLang: string;
  setVerilog: (value: string) => void;
}

import CodeMirror, { basicSetup } from '@uiw/react-codemirror';
import { StreamLanguage } from '@codemirror/language';
import { verilog } from '@codemirror/legacy-modes/mode/verilog';
import { EditorView } from '@codemirror/view';
import { useEffect, useState , useRef} from 'react';
import React from 'react';

const CodeSpace = ({ verilogLang, setVerilog }: CodeSpaceProps) => {
  const editorRef = useRef(null);
  const onChange = React.useCallback((val: any, viewUpdate : any) => {
    console.log('val:', val);
    setVerilog(val);
  }, []);

  return (
    <CodeMirror
      ref={editorRef}
      value={verilogLang}
      height="580px"
      onChange={onChange}
      extensions={[
        StreamLanguage.define(verilog),
        EditorView.lineWrapping,
        EditorView.theme({
          "&": { height: "580px", width: "500px" },
          ".cm-scroller": {
            scrollbarColor: "#606060 #A5A5A5",
            scrollbarWidth: "initial",
          },
          ".cm-content": {
            fontFamily: "var(--font-monospace)",
            lineHeight: "1.5",
            fontSize: "14px",
            whiteSpace: "pre",
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
