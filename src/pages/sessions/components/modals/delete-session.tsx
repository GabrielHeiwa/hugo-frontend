import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSession } from "@/hooks/session";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const deleteSessionSchema = z.object({
    confirmation: z.string().refine(value => value === "CONFIRMAR", {
        message: "É necessário ser exatamente 'CONFIRMAR'"
    })
})

type DeleteSessionSchema = z.infer<typeof deleteSessionSchema>;

type DeleteSessionDialog = React.PropsWithChildren<{
    sessionId: number;
}>

export function DeleteSessionDialog({ sessionId }: DeleteSessionDialog) {
    // Hooks
    const form = useForm<DeleteSessionSchema>({ resolver: zodResolver(deleteSessionSchema) });
    const { deleteSession } = useSession();

    // Functions
    function handleDeleteSession(data: DeleteSessionSchema) {
        try {

            deleteSession(sessionId);

            console.log("Sessão removida com sucesso.");

            return;

        } catch (error: any) {
            console.error("Houve um erro ao deletar a sessão.");
            throw error;
        }
    }

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
                    <Form {...form}>
                        <form onSubmit={() => {}}>
                            <FormField
                                control={form.control}
                                name="confirmation"
                                render={({ field }) => (
                                    <FormItem className="col-span-3">
                                        <FormLabel className="sr-only">Confirmação</FormLabel>
                                        <FormControl>
                                            <Input  placeholder="CONFIRMAR" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="secondary">
                        Close
                    </Button>
                </DialogClose>
                <Button
                    onClick={form.handleSubmit(handleDeleteSession)}
                    className="bg-red-600 hover:bg-red-500"
                >
                    Apagar
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}