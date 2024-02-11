import { ResponsiveContainer, Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";

const data = [
    {
        name: 'Janeiro',
        salario: 4000,
        gastos: 2400,
    },
    {
        name: 'Fevereiro',
        salario: 3000,
        gastos: 1398,
    },
    {
        name: 'Março',
        salario: 2000,
        gastos: 100,
    }
];
export function Dashboard() {

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart width={500} height={300} data={data}>
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis
                    tickFormatter={(value) => `R$${value}`}
                    tickLine={false} axisLine={false}
                />
                <Tooltip />
                <Bar dataKey="gastos" fill="#cc4125" />
                <Bar dataKey="salario" fill="#34a853" />
            </BarChart>
        </ResponsiveContainer>
    );
}