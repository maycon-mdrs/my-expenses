import { CardLogin } from "@/components/Login/CardLogin";
import { ModeToggle } from "@/components/mode-toggle";
import { useTheme } from "@/components/theme-provider";
import { Discount } from "@/components/unDraw/Discount";
import { DiscountBlack } from "@/components/unDraw/DiscountBlack";

export function LoginPage() {
    const { theme } = useTheme();

    const backgroundStyles = theme === "dark" ? "bg-zinc-900" : "bg-white";
    const textColorStyles = theme === "dark" ? "text-white" : "text-black";
    const mensagem = "Bem-vindo à nossa aplicação de gerenciamento de despesas, onde o controle financeiro se torna simples e intuitivo. Com nossa plataforma, você pode facilmente acompanhar seus gastos diários, semanais e mensais, tudo em um só lugar."


    return (
        <div className={`container relative h-screen md:max-w-none md:grid md:grid-cols-2 md:px-0`}>
            <div className="h-9 absolute right-4 top-4 md:right-8 md:top-8">
                <ModeToggle />
            </div>
            <div className="hidden md:relative md:flex md:flex-col md:p-10 dark:border-r bg-zinc-900 text-white">
                <div className="md:absolute inset-0"></div>
                <div className="md:relative z-20 flex items-center text-md font-medium">
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight italic">
                        My EXPENSES
                    </h3>
                </div>
                <div className="md:flex justify-center items-center z-20 h-full w-full">
                    <Discount />
                </div>
                <div className="md:relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <blockquote className="border-l-2 pl-6 italic">
                            {mensagem}
                        </blockquote>
                    </blockquote>
                </div>
            </div>
            <div className="flex w-full items-center justify-center md:p-8">
                <div className="md:hidden h-9 absolute left-4 top-4 md:left-8 md:top-8">
                    <div className="md:relative z-20 flex items-center text-md font-medium">
                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight italic">
                            My EXPENSES
                        </h3>
                    </div>
                </div>
                <div className="mt-20 mx-auto flex w-full flex-col items-center justify-center">
                    <CardLogin />
                    {/* Renderização condicional para exibir a mensagem de boas-vindas abaixo do CardLogin em telas menores */}
                    <div className="md:hidden mt-16 mb-4">
                        <blockquote className="space-y-2">
                            <blockquote className="border-l-2 pl-6 italic">
                                {mensagem}
                            </blockquote>
                        </blockquote>
                    </div>
                </div>
            </div>
        </div>
    )
}
