import { CardLogin } from "@/components/Login/CardLogin";
import { ModeToggle } from "@/components/mode-toggle";
import { useTheme } from "@/components/theme-provider";
import { TransferMoney } from "@/components/unDraw/TransferMoney";

export function LoginPage() {
    const { theme } = useTheme();

    // Defina os estilos com base no tema atual
    const backgroundStyles = theme === "dark" ? "bg-zinc-900" : "bg-white";
    const textColorStyles = theme === "dark" ? "text-white" : "text-black";


    return (
        <div className={`container relative h-screen lg:max-w-none lg:grid lg:grid-cols-2 lg:px-0`}>
            <div className="h-9 absolute right-4 top-4 md:right-8 md:top-8">
                <ModeToggle />
            </div>
            <div className="hidden h-full flex-col p-10 lg:relative lg:flex dark:border-r bg-zinc-950 text-white">
                <div className="absolute inset-0"></div>
                <div className="relative z-20 flex items-center text-lg font-medium">
                    My EXPENSES
                </div>
                <div className="flex justify-center items-center z-20 h-full w-full">
                    <TransferMoney />
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className={`text-lg`}>
                            “texto sobre a”
                        </p>
                    </blockquote>
                </div>
            </div>
            <div className="flex h-screen w-full items-center justify-center lg:p-8">
                <div className="mx-auto flex w-full flex-col items-center justify-center space-y-6">
                    <CardLogin />
                </div>
            </div>
        </div>
    )
}
