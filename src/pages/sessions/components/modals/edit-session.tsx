import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSession } from "@/hooks/session";
import { Session } from "@/stores/session";
import { Edit } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const editSessionSchema = z.object({
    title: z.string().min(6, "Minimo de 6 caracteres."),
    host: z.string().ip(),
    username: z.string(),
    password: z.string(),
    port: z.string(),
    file: z.any(),
});

type EditSessionSchema = z.infer<typeof editSessionSchema>;

type EditSessionDialog = React.PropsWithChildren<{
    sessionId: number;
}>

export function EditSessionDialog({ sessionId }: EditSessionDialog) {
    // Hooks
    const { editSession, sessions } = useSession();
    const session = sessions[sessionId];
    const form = useForm<EditSessionSchema>({
        resolver: zodResolver(editSessionSchema),
        values: {
            ...session,
            port: session.port.toString()
        }
    });

    // Functions
    function handleEditSession({ host, password, title, port, username }: EditSessionSchema) {

        try {

            const newSession: Session = {
                host,
                password,
                port: Number(port),
                title,
                username
            }

            console.log(newSession);

            editSession(sessionId, newSession);

            console.log("Sessão atualizada com sucesso.");

            return;

        } catch (error: any) {
            console.error("Houve um erro ao editar uma sessão.");
            throw error;
        }
    }

    return <Dialog>
        <DialogTrigger asChild>
            <Button className="gap-2">
                Editar
                <Edit className="w-4 h-4" />
            </Button>
        </DialogTrigger>

        <DialogContent>
            <DialogHeader>
                <DialogTitle>Editar Sessão</DialogTitle>
                <DialogDescription>
                    Atualize os dados da sua sessão
                </DialogDescription>
            </DialogHeader>
            <div>
                <Form {...form}>
                    <form>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Titúlo</FormLabel>
                                    <FormControl>
                                        <Input {...field} defaultValue={session.title} />
                                    </FormControl>
                                    <FormDescription>Ex: VPS 1 - Host X</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-5 gap-2">
                            <FormField
                                control={form.control}
                                name="host"
                                render={({ field }) => (
                                    <FormItem className="col-span-3">
                                        <FormLabel>Host</FormLabel>
                                        <FormControl>
                                            <Input defaultValue={session.host} placeholder="host" {...field} />
                                        </FormControl>
                                        <FormDescription>Ex: 133.66.47.21</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="port"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel>Porta</FormLabel>
                                        <FormControl>
                                            <Input defaultValue={session.port} {...field} />
                                        </FormControl>
                                        <FormDescription>Ex: 2022</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Usuário</FormLabel>
                                        <FormControl>
                                            <Input defaultValue={session.username} placeholder="username" {...field} />
                                        </FormControl>
                                        <FormDescription>Ex: jonhdoe</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Senha de acesso</FormLabel>
                                        <FormControl>
                                            <Input defaultValue={session.password} placeholder="password" {...field} />
                                        </FormControl>
                                        <FormDescription>Ex: supersecretpassword</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="file"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Chave pública</FormLabel>
                                    <FormControl>
                                        <Input type="file" multiple={false} {...field} />
                                    </FormControl>
                                    <FormDescription>Ex: my_idrsa.pub</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </div>
            <DialogFooter>
                <Button type="submit" onClick={form.handleSubmit(handleEditSession)}>
                    Criar
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}