

import { useCallback, useEffect, useState } from "react";
import Terminal, { ColorMode, TerminalInput, TerminalOutput } from "react-terminal-ui";
import { io, Socket } from "socket.io-client"

const socketUrl = "ws://172.18.101.148:3000";
// const socket = io(socketUrl);
// let a = false;

export default function TerminalPage() {
    // States
    const [terminalContent, setTerminalContent] = useState<any[]>([]);
    const [socket, setSocket] = useState<Socket | null>(null);

    // UseEffects
    useEffect(() => {
        console.log("hello world")
        const ws = io(socketUrl);
        setSocket(ws);
        ws.emit("session-input", { command: "uptime", sessionId: "dc56b361-0f0d-4b3c-97a4-4aff117c3650" });

        ws.on("session-output", (output: string) => {
            console.log(output)
            setTerminalContent(curr => [...curr, <TerminalOutput>{output}</TerminalOutput>])
        });

        return () => {
            ws.close();
        };

    }, []);

    return <div className="w-full h-screen flex p-1 bg-[#252a33]">
        <Terminal
            colorMode={ColorMode.Dark}
            name={"Teste"}
            onInput={input => {
                socket?.emit("session-input", { command: input, sessionId: "dc56b361-0f0d-4b3c-97a4-4aff117c3650" })
                setTerminalContent(curr => [...curr, <TerminalInput>{input}</TerminalInput>])
            }}
        >
            {terminalContent}
        </Terminal>
    </div>
}