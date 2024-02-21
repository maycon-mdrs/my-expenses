import { useContext, useEffect, useMemo, useState } from "react";
import { DataContext } from "@/context/DataProvider";
import { useSearchParams } from "react-router-dom";
import { format } from 'date-fns';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Badge } from 'antd';
import { TransactionFilter } from "@/components/list/TransactionFilter";

/**
 * Formata valores numéricos para o formato de moeda brasileiro.
 * @param {number} value Valor a ser formatado.
 * @returns {string} Valor formatado como R$0,00.
 */
function formatCurrency(value: number) {
    return `R$${value.toFixed(2).replace('.', ',')}`;
}

function TypeTransactionFilter() {
    const [_, setSearchParams] = useSearchParams();

    const [showInflow, setShowInflow] = useState(true);
    const [showOutflow, setShowOutflow] = useState(true);


    /**
     * Atualiza os parâmetros de pesquisa com base nos filtros aplicados.
     * @param {boolean} showInflow Mostrar transações de entrada.
     * @param {boolean} showOutflow Mostrar transações de saída.
     */
    function handleFilterTransaction(showInflow: boolean, showOutflow: boolean) {
        setSearchParams(state => {
            state.delete('transaction');

            if (showInflow && showOutflow) {
                state.set('transaction', 'all');
            } else if (showInflow) {
                state.set('transaction', 'inflow');
            } else if (showOutflow) {
                state.set('transaction', 'outflow');
            }
            // Se nenhum estiver selecionado, não adiciona o parâmetro.
            return state;
        });
    }

    useEffect(() => {
        handleFilterTransaction(showInflow, showOutflow);
    }, [showInflow, showOutflow]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="h-8 lg:flex"
                >
                    Transação
                    <CaretSortIcon className="h-4 w-4 opacity-50 ml-2" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[150px]">
                <DropdownMenuCheckboxItem
                    key={"inflow"}
                    className="capitalize"
                    checked={showInflow}
                    onCheckedChange={(e) => {
                        setShowInflow(e);
                    }}
                >
                    Entrada
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    key={"outflow"}
                    className="capitalize"
                    checked={showOutflow}
                    onCheckedChange={setShowOutflow}
                >
                    Saída
                </DropdownMenuCheckboxItem>

            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export function DataTable() {
    const [searchParams] = useSearchParams();

    const { data, removeData } = useContext(DataContext);
    const dataOrder = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Filtro de dados baseado nos searchParams
    const filteredData = useMemo(() => dataOrder.filter(item => {
        const titleFilter = searchParams.get('title')?.toLowerCase();
        const monthFilter = searchParams.get('month');
        const transactionFilter = searchParams.get('transaction');

        const matchesTitle = titleFilter ? item.title.toLowerCase().includes(titleFilter) : true;
        const matchesMonth = monthFilter ? format(new Date(item.date), 'MM/yyyy', { locale: ptBR }) === monthFilter : true;
        let matchesTransaction = true;

        if (transactionFilter) {
            if (transactionFilter === 'inflow') {
                matchesTransaction = Boolean(item.inflow);
            } else if (transactionFilter === 'outflow') {
                matchesTransaction = Boolean(item.outflow);
            } else if (transactionFilter === 'both') {
                matchesTransaction = Boolean(item.inflow) || Boolean(item.outflow);
            }
        }

        return matchesTitle && matchesMonth && matchesTransaction;
    }), [data, searchParams]);

    const dataFinal = filteredData.map((item) => {
        const transaction = item.outflow ?
            <Badge
                count={`- ${formatCurrency(item.outflow)}`}
                color="#be123c"
            /> :
            <Badge
                count={`+ ${formatCurrency(item.inflow)}`}
                color="#52c41a"
            />
        return {
            ...item,
            transaction: transaction,
        }
    });

    /**
     * Manipula a ação de excluir uma transação.
     * @param {number} id ID da transação a ser excluída.
     */
    async function handleDelete(id: number) {
        removeData(id);
    }

    return (
        <div className="flex flex-col w-full gap-4">
            <TransactionFilter />
            <div className="border rounded-lg px-2 w-full">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Data</TableHead>
                            <TableHead>Título</TableHead>
                            <TableHead>Descrição</TableHead>
                            <TableHead className="flex justify-center"><TypeTransactionFilter /></TableHead>
                            <TableHead className="text-center"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dataFinal.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{format(new Date(item.date), "dd/MM/yyyy", { locale: ptBR })}</TableCell>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell className="text-center">{item.transaction}</TableCell>
                                <TableCell className="text-center">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <DotsHorizontalIcon className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>Editar</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleDelete(item.id)}>Excluir</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
