import { useContext } from "react";
import { DataContext } from "@/context/DataProvider";
import { useNavigate } from "react-router-dom";

import { CardData } from "@/components/dashboard/cardData";
import { DrawerData } from "@/components/dashboard/drawerData";
import { Dashboard } from "@/components/dashboard/overview";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { IoArrowUpCircleOutline, IoArrowDownCircleOutline } from "react-icons/io5";
import { MdAttachMoney } from "react-icons/md";

import { format } from 'date-fns';
import { ptBR } from "date-fns/locale";
import { RecentData } from "@/pages/Home/recent/recentData";

import { DataType } from "@/types/DataType";
import { NoDATA } from "@/components/status/NoData";

export function HomePage() {
    const { data } = useContext(DataContext);
    const dataOrder = data.sort((a, b) => new Date(b.id).getTime() - new Date(a.id).getTime());

    const navigate = useNavigate();

    const totalInflow = dataOrder.reduce((acc, item) => acc + item.inflow, 0);
    const totalOutflow = dataOrder.reduce((acc, item) => acc + item.outflow, 0);
    const balance = totalInflow - totalOutflow;

    const getLastInflow = dataOrder?.filter((item: DataType) => item.inflow > 0).length > 0
        ? format(dataOrder.filter((item: DataType) => item.inflow > 0)[0].date, "d 'de' MMMM yy", { locale: ptBR })
        : 'N/A';

    const getLastOutflow = dataOrder?.filter((item: DataType) => item.outflow > 0).length > 0
        ? format(dataOrder.filter((item: DataType) => item.outflow > 0)[0].date, "d 'de' MMMM yy", { locale: ptBR })
        : 'N/A';

    const info = [
        {
            title: 'Entradas',
            value: `R$${totalInflow.toFixed(2).replace('.', ',')}`,
            icon: <IoArrowUpCircleOutline size={26} color="15803d" />,
            text: `Última entrada em ${getLastInflow}`,
        },
        {
            title: 'Saídas',
            value: `R$${totalOutflow.toFixed(2).replace('.', ',')}`,
            icon: <IoArrowDownCircleOutline size={26} color="be123c" />,
            text: `Última saída em ${getLastOutflow}`,
        },
        {
            title: 'Saldo atual',
            value: `R$${balance.toFixed(2).replace('.', ',')}`,
            icon: <MdAttachMoney size={26} />
        },
    ];

    return (
        <div className="flex-1 space-y-4 p-4 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <div className="flex items-center space-x-2">
                    <DrawerData />
                </div>
            </div>

            {/*             
            <div className="grid gap-4 sm:grid-cols-3">
                {info.map((item, index) => (
                    <CardData
                        key={index}
                        title={item.title}
                        icon={item.icon}
                        text={item?.text}
                        value={item.value}
                    />
                ))}
            </div> 
            */}
            <ScrollArea className="whitespace-nowrap pb-4">
                <div className="flex gap-4 w-full">
                    {info.map((item, index) => (
                        <CardData
                            key={index}
                            title={item.title}
                            icon={item.icon}
                            text={item?.text}
                            value={item.value}
                            style={{ width: '100%' }}
                        />
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>

            {data.length === 0 ? (
                <div className="flex items-center justify-center h-[calc(100vh-25rem)]">
                    <NoDATA />
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-7">
                    <Card className="col-span-4 md:col-span-4 lg:col-span-4">
                        <CardHeader>
                            <CardTitle>Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <Dashboard />
                        </CardContent>
                    </Card>

                    <Card className="col-span-4 md:col-span-4 lg:col-span-3">
                        <CardHeader>
                            <CardTitle>Transações recentes</CardTitle>
                            <CardDescription>
                                {
                                    dataOrder.length === 1
                                        ? 'Sua última transação!'
                                        : `Suas últimas ${dataOrder.slice(0, 4).length} transações!`
                                }
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {dataOrder.slice(0, 4).map((item, index) => (
                                <RecentData
                                    key={index}
                                    title={item.title}
                                    description={item.description}
                                    value={item.inflow ? `+ R$${item.inflow.toFixed(2).replace('.', ',')}` : `- R$${item.outflow.toFixed(2).replace('.', ',')}`}
                                />
                            ))}
                        </CardContent>
                        <CardFooter className="flex items-center justify-center">
                            <Button variant="link" onClick={() => navigate('/lista')}>Ver todas</Button>
                        </CardFooter>
                    </Card>
                </div>
            )}
        </div>
    )
}
