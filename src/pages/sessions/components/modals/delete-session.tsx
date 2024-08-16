import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";

import { Copy, Trash } from "lucide-react";
import { Label } from "@/components/ui/label";

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