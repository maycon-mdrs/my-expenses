// Importações necessárias
import { useContext } from 'react';
import { DataContext } from '@/context/DataProvider';
import { DataType } from '@/types/DataType';
import { parse, compareAsc, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

/**
 * Interface que define a estrutura dos dados agregados para serem usados no gráfico.
 * @param month - O mês dos dados agregados no formato de string.
 * @param inflow - O total de entradas para o mês especificado.
 * @param outflow - O total de saídas para o mês especificado.
 */
export interface AggregatedDataType {
    month: string;
    inflow: number;
    outflow: number;
}

/**
 * Agrega dados financeiros por mês, somando os valores de entrada (inflow) e saída (outflow).
 * @param {DataType[]} data - Array de objetos representando os dados financeiros, 
 * onde cada objeto deve conter uma data, um valor de entrada (inflow) e um valor de saída (outflow).
 * @returns {AggregatedDataType[]} Um array de objetos, onde cada objeto representa um mês com 
 * os valores totais de entrada e saída formatados para duas casas decimais.
 */
const formatDataForChart = (data: DataType[]): AggregatedDataType[] => {
    const aggregatedData: AggregatedDataType[] = [];

    data.forEach(item => {
        const monthYear = format(item.date, 'MMMM - yyyy', { locale: ptBR });
        const month = monthYear.charAt(0).toUpperCase() + monthYear.slice(1);

        // Encontra o índice do mês no array agregado, se ele existir
        const index = aggregatedData.findIndex(aggregated => aggregated.month === month);

        if (index === -1) {
            // Se o mês ainda não existe no array agregado, adiciona-o
            aggregatedData.push({ month, inflow: item.inflow, outflow: item.outflow });
        } else {
            // Se o mês já existe, atualiza os valores de inflow e outflow
            aggregatedData[index].inflow += item.inflow;
            aggregatedData[index].outflow += item.outflow;
        }
    });

    // Mapeia cada mês para um valor numérico e ordena os dados
    aggregatedData.sort((a, b) => {
        const aDate = parse(a.month, 'MMMM - yyyy', new Date(), { locale: ptBR });
        const bDate = parse(b.month, 'MMMM - yyyy', new Date(), { locale: ptBR });
        return compareAsc(aDate, bDate);
    });

    return aggregatedData.map(item => ({
        ...item,
        inflow: parseFloat(item.inflow.toFixed(2)),
        outflow: parseFloat(item.outflow.toFixed(2))
    }));
};

/**
 * Função para formatar a data no eixo X do gráfico.
 * @param dateStr - String da data a ser formatada.
 * @returns Uma string formatada representando o mês e o ano (por exemplo, 'Mar - 24').
 */
const xAxisTickFormatter = (dateStr: string) => {
    const date = parse(dateStr, 'MMMM - yyyy', new Date(), { locale: ptBR });
    return format(date, 'MMM - yy', { locale: ptBR }).replace(/^\w/, (c) => c.toUpperCase());
};

export function Dashboard() {
    const { data } = useContext(DataContext);
    const formattedData = formatDataForChart(data);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart width={500} height={300} data={formattedData}>
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickFormatter={xAxisTickFormatter} />
                <YAxis tickFormatter={(value) => `R$${value}`} tickLine={false} axisLine={false} />
                <Tooltip formatter={(value: number) => [`R$${value.toFixed(2)}`]} labelStyle={{color: 'black'}}/>
                <Bar dataKey="outflow" name="Saída" fill="#be123c" />
                <Bar dataKey="inflow" name="Entrada" fill="#52c41a" />
            </BarChart>
        </ResponsiveContainer>
    );
}
