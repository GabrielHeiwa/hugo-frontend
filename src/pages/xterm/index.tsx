

import { useRef, useEffect, useState } from "react"
import { io } from "socket.io-client";
import { Terminal } from "@xterm/xterm"
import "@xterm/xterm/css/xterm.css"

export default function XTermPage() {
    const [ws, setWs] = useState();
    const [content, setContent] = useState("");
    const [line, setLine] = useState("");

    const xtermRef = useRef(null)

    useEffect(() => {
        const ws = io("ws://172.18.101.148:3000");
        setWs(ws);

        const terminal = new Terminal();
        terminal.onData(e => {

            console.log(e.charCodeAt(0))
            ws.emit("xterm-input", e);
            // switch (e) {
            //     case '\r': // Enter key
            //         terminal.write('\r\n$ ');
            //         // console.log(line)
            //         ws.emit("xterm-input", { command: line, sessionId: "dc56b361-0f0d-4b3c-97a4-4aff117c3650"});

            //         break;
            //     case '\u007F': // Backspace (DEL)
            //         // Do not delete the prompt
            //         if (terminal._core.buffer.x > 2) {
            //             terminal.write('\b \b');
            //         }
            //         break;
            //     default: // Print all other characters
            //         terminal.write(e);
            //         setLine(curr => curr + e);

            // }
        })
        terminal.open(xtermRef.current);

        ws.emit("xterm-input", { command: "uptime", sessionId: "dc56b361-0f0d-4b3c-97a4-4aff117c3650" });

        ws.on("xterm-output", (output: string) => {
            console.log(output)
            terminal.write(output);
        });

        return () => {
            ws.close();
            terminal.dispose();
        };
    }, [])

    return <div ref={xtermRef}></div>
}