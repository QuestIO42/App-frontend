interface CodeSpaceProps {
  width1: number;
  width2: number;
}

import CodeMirror, { basicSetup } from '@uiw/react-codemirror';
import { StreamLanguage } from '@codemirror/language';
import { verilog } from '@codemirror/legacy-modes/mode/verilog';
import { EditorView } from '@codemirror/view';



const verilogLang = `package main
import "fmt"

func main() {
  fmt.Println("Hello, 世界")
}`;

export default function CodeSpace() {
  return <CodeMirror
  value={verilogLang}
  height="580px"
  extensions={[
    StreamLanguage.define(verilog),
    EditorView.lineWrapping,
    EditorView.theme({
      "&": { height: "580px",width:"500px" }, //Isso aqui vai controlar o tamanho do espaço de coding
      ".cm-scroller": {
            overflowY: "overflow !important",
            overflowX: "scroll !important",
            scrollbarColor: "#606060 #A5A5A5", // thumb color and track color
            scrollbarWidth: "initial", // thin scrollbar
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
      ".cm-gutters": {
        display: "none",
      },
    }),
  ]}
/>
}
