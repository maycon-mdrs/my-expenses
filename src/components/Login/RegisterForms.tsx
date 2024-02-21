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

export function RegisterForms() {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    return (
        <Card>
            <CardHeader>
                <CardTitle>Cadastro</CardTitle>
                <CardDescription>
                    Para acessar o sistema de desdesas, caso não tenha login, faça o já seu cadastro!
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-1">
                    <Label htmlFor="name">Nome</Label>
                    <Input id="name" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="password">Senha</Label>
                    <PasswordInput
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />                       </div>
                <div className="space-y-1">
                    <Label htmlFor="confirm">Confrimar senha</Label>
                    <PasswordInput
                        id="confirm"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />                      </div>
            </CardContent>
            <CardFooter>
                <Button>Cadastrar</Button>
            </CardFooter>
        </Card>
    );
}