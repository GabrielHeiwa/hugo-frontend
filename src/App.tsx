import { useEffect, useState } from 'react';
import Terminal, { ColorMode, TerminalOutput } from 'react-terminal-ui';
import { io } from 'socket.io-client';

const socket = io("http://localhost:3000")

function App() {
  const [terminalContent, setTerminalContent] = useState([<TerminalOutput>Welcome to the React Terminal UI Demo!</TerminalOutput>])

  function sendToWebSocketServer(message: string) {
    const tempTerminalContent = [...terminalContent, <TerminalOutput>{message}</TerminalOutput>]
    setTerminalContent(tempTerminalContent)
    socket.emit("messageToServer", message);
  }

  socket.on("messageToClient", (message: string) => {
    console.log('hello world');
    const tempTerminalContent = [...terminalContent, <TerminalOutput>{message}</TerminalOutput>]

    setTerminalContent(tempTerminalContent)
  });

  useEffect(() => {
    console.log(terminalContent.map(terminalContent => terminalContent.props))
  }, [terminalContent])

  return (
    <>
      <div className="w-full h-screen">
        <Terminal
          name='React Terminal Usage Example'
          colorMode={ColorMode.Dark}
          onInput={sendToWebSocketServer}
        >
          {terminalContent}
        </Terminal>
      </div>
    </>
  )
}

export default App
