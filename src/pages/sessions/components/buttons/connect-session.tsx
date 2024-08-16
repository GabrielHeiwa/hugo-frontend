import { Button } from "@/components/ui/button";
import { ScreenShare } from "lucide-react";


export function ConnectSessionButton() {
    // Functions
    function handleConnectSession() {

        return;
    }

    return <Button className="gap-2">
        Conectar
        <ScreenShare className="w-4 h-4" />
    </Button>
}