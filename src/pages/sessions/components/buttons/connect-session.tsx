import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/session";
import { connectSessionRequest } from "@/requests/session/connect";
import { ScreenShare } from "lucide-react";

type ConnectSessionButto = React.PropsWithChildren<{ sessionId: number }>

export function ConnectSessionButton({ sessionId }: ConnectSessionButto) {
    // Hooks
    const { sessions } = useSession();

    // Functions
    async function handleConnectSession() {
        // const { host, port, username } = sessions[sessionId]
        // const connectUrl = `ssh://${username}@${host}:${port}`

        const anchor = document.createElement("a")
        anchor.href = "/terminal?id=1";

        anchor.click();

        // await connectSessionRequest({ sessionId: "a29ce3e6-d49c-409c-955a-20bb7987cb6a" }); 

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