import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { cn } from "@/lib/utils"
import { ptBR } from 'date-fns/locale'; // Importa o locale ptBR para Português do Brasil
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { FormsData } from "./formsData";
import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";

export function DrawerData() {
    const [date, setDate] = useState<Date>();
    const [isOpen, setIsOpen] = useState(false); 
    const formattedDate = date ? format(date, "PPP", { locale: ptBR }) : "Escolha uma data";

    const handleClose = () => {
        setDate(undefined);
        setIsOpen(false);
    };

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen} onClose={handleClose}>
            <DrawerTrigger asChild onClick={()=> setIsOpen(true)}>
                <Button>Nova transação</Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-lg">
                    <DrawerHeader>
                        <div className="flex justify-between">
                            <div>
                                <DrawerTitle>Nova transação</DrawerTitle>
                                <DrawerDescription>Preencha de acordo</DrawerDescription>
                            </div>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-auto justify-start text-left font-normal",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {formattedDate}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        locale={ptBR}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <FormsData date={date} onClose={handleClose}/>
                    </DrawerHeader>
                </div>
            </DrawerContent>
        </Drawer>
    );
}