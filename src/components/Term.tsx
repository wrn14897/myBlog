import React, { useState } from "react";
import Terminal, { ColorMode, TerminalInput, TerminalOutput } from "react-terminal-ui";

const TerminalController = (props = {}) => {
  const [terminalLineData, setTerminalLineData] = useState([
    <TerminalOutput>
      🐱 Hi there !!
    </TerminalOutput>,
    <TerminalOutput>
      Type 'help' or 'h' to see commands...
    </TerminalOutput>,
  ]);

  const onInput = (terminalInput: string) => {
    let ld = [...terminalLineData];
    ld.push(<TerminalInput>{terminalInput}</TerminalInput>);
    switch (terminalInput.toLocaleLowerCase().trim()) {
      case "help":
      case "h":
        ld.push(
          <TerminalOutput>"email" [Email Me]</TerminalOutput>,
          <TerminalOutput>"whoami" [About Me]</TerminalOutput>,
          <TerminalOutput>"hdx" [What is HyperDX]</TerminalOutput>,
          <TerminalOutput>"ds" [What is DeploySentinel]</TerminalOutput>,
          <TerminalOutput>"pb" [What is PTTBrain]</TerminalOutput>,
          <TerminalOutput>"gh" [Github Link]</TerminalOutput>,
          <TerminalOutput>"ln" [LinkedIn Link]</TerminalOutput>,
          <TerminalOutput>"clear" [clear the terminal]</TerminalOutput>,
        );
        break;
      case 'email':
        ld.push(
          <TerminalOutput>
            warren@hyperdx.io
          </TerminalOutput>,
        )
        break;
      case "whoami":
        ld.push(
          <TerminalOutput>
            Warren is a hacker, music nerd and entrepreneur.
          </TerminalOutput>,
        )
        break;
      case "hdx":
        window.open('https://hyperdx.io', '_blank');
        break;
      case "ds":
        window.open('https://deploysentinel.com', '_blank');
        break;
      case "pb":
        window.open('https://pttbrain.com/about_us', '_blank');
        break;
      case "gh":
        window.open('https://github.com/wrn14897', '_blank');
        break;
      case "ln":
        window.open('https://www.linkedin.com/in/warren-jonhow-lee-7b91b3187/', '_blank');
        break;
      case "clear":
        ld = [];
        break;
      default:
        break;
    }
    setTerminalLineData(ld);
  };

  // Terminal has 100% width by default so it should usually be wrapped in a container div
  return (
    <div className="container">
      <Terminal
        height={500 as any}
        name=""
        colorMode={ColorMode.Dark}
        onInput={onInput}
      >
        {terminalLineData}
      </Terminal>
    </div>
  );
};

export default TerminalController;
