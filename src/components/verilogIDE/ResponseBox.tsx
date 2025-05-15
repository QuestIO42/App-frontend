interface ResponseBoxProps {
  verilog_code: React.ReactNode;
  width?: string;
  height?: string;
}

const ResponseBox = ({verilog_code, width, height}: ResponseBoxProps) => {

  return (
    <div>
      <p className="text-xl text-laranja font-bold mb-2">Saída</p>

      <div
        style={{
          width: width || '90%',
          height: height || '100%',
          overflowY: 'auto',
          whiteSpace: 'pre-wrap',
        }}
        className="py-2 border-none focus:outline-none"
      >
        {verilog_code}
      </div>
    </div>
  );
};

export default ResponseBox;
