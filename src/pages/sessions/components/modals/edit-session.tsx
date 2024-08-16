import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Edit } from "lucide-react";
import { useForm } from "react-hook-form";


export function EditSessionDialog() {
    // Hooks
    const form = useForm();

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
                    <form action="">
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

                        <FormField
                            control={form.control}
                            name="host"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Host</FormLabel>
                                    <FormControl>
                                        <Input placeholder="host" {...field} />
                                    </FormControl>
                                    <FormDescription>Ex: 133.66.47.21</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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
                            name="publicKey"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Chave pública</FormLabel>
                                    <FormControl>
                                        <Input type="file" multiple={false} placeholder="publicKey" {...field} />
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
                <Button type="submit">
                    Criar
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}