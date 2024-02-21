import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { IoCloseOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { ptBR } from "date-fns/locale";
import MonthPicker from "@/components/ui/month-picker";

export function TransactionFilter() {
    const [month, setMonth] = useState<Date | null>(null);
    const [calendarOpen, setCalendarOpen] = useState(false);
    const formattedDate = month ? format(month, "LLLL yyyy", { locale: ptBR }) : "Escolha um mês";

    const [_, setSearchParams] = useSearchParams();

    /**
     * Atualiza o parâmetro de pesquisa 'title' na URL.
     * @param {string} title Título pelo qual filtrar.
     */
    function handleFilterInput(title: string) {
        setSearchParams(state => {
            if (title) {
                state.set('title', title);
            } else {
                state.delete('title')
            }
            return state;
        });
    }

    /**
     * Atualiza o parâmetro de pesquisa 'month' na URL com base na data selecionada.
     * @param {Date | null} date Data selecionada para filtrar.
     */
    function handleFilterCalendar(date: Date | null) {
        setSearchParams(state => {
            if (date) {
                state.set('month', format(date, 'MM/yyyy', { locale: ptBR }));
            } else {
                state.delete('month');
            }
            return state;
        });
    }

    /**
     * Define o novo mês selecionado e atualiza o filtro de calendário.
     * @param {Date | null} newMonth Novo mês selecionado.
     */
    function handleMonthChange(newMonth: Date | null) {
        setMonth(newMonth);
        handleFilterCalendar(newMonth);
    }

    return (
        <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center gap-2 justify-between md:justify-start w-full">

                {/* Pesquisar por título */}
                <Input placeholder="Pesquisar pelo título" className="max-w-[180px]" type="text" onChange={(e) => { handleFilterInput(e.target.value); }} />

                {/* Filtro por mês */}
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "flex justify-between w-auto text-left font-normal items-center", // Updated for spacing and alignment
                                !month && "text-muted-foreground",
                                month && "cursor-default"
                            )}
                        >
                            <div className="flex items-center"> {/* This div groups the calendar icon and the formatted date */}
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {formattedDate}
                            </div>
                            {month && ( // This conditionally renders the trash icon only if a month is selected
                                <div
                                    onClick={() => { handleMonthChange(null) }}
                                    className="ml-2 focus:outline-none cursor-pointer"
                                    aria-label="Clear selected month"
                                >
                                    <IoCloseOutline className="h-4 w-4" />
                                </div>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <MonthPicker currentMonth={month} onMonthChange={handleMonthChange} onClickMonth={setCalendarOpen} />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}
