import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSession } from "@/hooks/session";
import { Session } from "@/stores/session";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

const createSessionSchema = z.object({
    title: z.string().min(6, "Minimo de 6 caracteres."),
    host: z.string().ip(),
    username: z.string(),
    password: z.string(),
    port: z.string(),
    file: z.any(),
});

type CreateSessionSchema = z.infer<typeof createSessionSchema>;

export function CreateSessionDialog() {
    // Hooks
    const form = useForm<CreateSessionSchema>({
        resolver: zodResolver(createSessionSchema)
    });
    const { addSession } = useSession();

    // Functions
    function handleAddNewSession({ host, password, title, username, port }: CreateSessionSchema) {
        try {

            const newSession: Session = {
                title,
                host,
                username,
                password,
                port: Number(port)
            };

            addSession(newSession);

            console.log("Sessão adicionada com sucesso.");

            return;

        } catch (error: any) {
            console.error("Houve um erro ao adicionar uma nova sessão ")
            throw error;
        }
    }

    return <Dialog>
        <DialogTrigger asChild>
            <Button>+ Criar Nova Sessão</Button>
        </DialogTrigger>

        <DialogContent>
            <DialogHeader>
                <DialogTitle>Nova Sessão</DialogTitle>
                <DialogDescription>
                    Informe os dados abaixo corretamente para criar uma nova sessão
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
                                        <Input placeholder="title" {...field} />
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
                                            <Input placeholder="host" {...field} />
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
                                            <Input placeholder="port" {...field} />
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
                                            <Input placeholder="username" {...field} />
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
                                            <Input placeholder="password" {...field} />
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
                                        <Input type="file" multiple={false} placeholder="file" {...field} />
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
                <Button onClick={form.handleSubmit(handleAddNewSession)}>
                    Criar
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}