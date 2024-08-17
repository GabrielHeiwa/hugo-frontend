import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/session";
import { ScreenShare } from "lucide-react";

type ConnectSessionButto = React.PropsWithChildren<{ sessionId: number }>

export function ConnectSessionButton({ sessionId }: ConnectSessionButto) {
    // Hooks
    const { sessions } = useSession();

    // Functions
    function handleConnectSession() {
        const { host, port, username } = sessions[sessionId]
        const connectUrl = `ssh://${username}@${host}:${port}`

        const anchor = document.createElement("a")
        anchor.href = connectUrl;

        anchor.click();

        return;
    }

    return <Button
        className="gap-2"
        onClick={handleConnectSession}
    >
        Conectar
        <ScreenShare className="w-4 h-4" />
    </Button>
}