import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/ui/password-input"
import { useState } from "react"
import { TransferMoney } from "@/components/unDraw/TransferMoney"

export function LoginForms() {
    const [password, setPassword] = useState("")

    return (
        <Card>
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                    Para acessar o sistema de despesas, faça o login! Para acessar o sistema de despesas, faça o login!
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-1">
                    <Label htmlFor="email-login">E-mail</Label>
                    <Input id="email-login" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="password">Senha</Label>
                    <PasswordInput
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </CardContent>
            <CardFooter>
                <Button>Entrar</Button>
            </CardFooter>
        </Card>
    );
}