import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash } from "lucide-react";

export function DeleteSessionDialog() {

    return <Dialog modal={true}>
        <DialogTrigger asChild>
            <Button className="gap-2">
                Apagar
                <Trash className="w-4 h-4" />
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>Apagar a sessão: "sessionName"</DialogTitle>
                <DialogDescription>
                    Para apagar a sessão digite "CONFIRMAR" abaixo
                </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                    <Label htmlFor="link" className="sr-only">
                        Confirmação
                    </Label>
                    <Input
                        id="confirm"
                        defaultValue="https://ui.shadcn.com/docs/installation"
                        readOnly
                    />
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="secondary">
                        Close
                    </Button>
                </DialogClose>
                <Button type="submit">Apagar</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}