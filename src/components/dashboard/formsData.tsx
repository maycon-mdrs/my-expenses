import { useState } from "react";

import { Form } from "antd"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingOutlined } from '@ant-design/icons';
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons"

import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"

import { IoArrowUpCircleOutline, IoArrowDownCircleOutline } from "react-icons/io5";

import './inputNumber.css';
import { DataType } from "@/types/DataType";

export function FormsData({ date, onClose }: { date: Date | undefined; onClose: () => void}) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const [money, setMoney] = useState<number>(0);
    const [toggleGroup, setToggleGroup] = useState<string | null>(null);

    function onClick(adjustment: number) {
        let newMoney = parseFloat((money + adjustment).toFixed(2));
        if (newMoney < 0) {
            newMoney = 0;
        }
        setMoney(newMoney);
    }

    const handleMoneyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value === '') {
            setMoney(0);
        } else {
            const numValue = parseFloat(value);
            if (!isNaN(numValue) && numValue >= 0) {
                setMoney(numValue);
            }
        }
    };

    const onFinish = async (values: any) => {
        const { title, description, toggleGroup } = values;
        const data: DataType = {
            id: Date.now(),
            title,
            description,
            date: date || new Date(), // Usa a data atual como fallback
            inflow: toggleGroup === 'inflow' ? money : 0,
            outflow: toggleGroup === 'outflow' ? money : 0,
        };
        console.log('Form Data:', data);
        onClose();
    };

    const onFinishFailed = async (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            form={form}
            name="transaction-form"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            {/* TITULO */}
            <Form.Item
                name="title"
                rules={[
                    {
                        required: true,
                        message: 'Por favor, inserir um título!'
                    }
                ]}
                className="text-primary m-0"
            >
                <div className="space-y-1">
                    <Label htmlFor="title">Título</Label>
                    <Input id="title" />
                </div>
            </Form.Item>

            {/* DESCRIÇÃO */}
            <Form.Item
                name="description"
                className="text-primary m-0"
            >
                <div className="space-y-1 mt-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Input id="description" />
                </div>
            </Form.Item>

            {/* VALOR */}
            <div className="flex items-center justify-center space-x-2 mt-5 text-primary">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full"
                    onClick={() => onClick(-50)}
                    disabled={money <= 0}
                    type="button"
                >
                    <MinusIcon className="h-4 w-4" />
                    <span className="sr-only">-</span>
                </Button>
                <div className="flex-1 text-center">
                    <div className="text-[1rem] uppercase text-muted-foreground">R$</div>
                    <input
                        type="number"
                        step={0.01}
                        min={0}
                        style={{
                            background: 'none',
                            border: 'none',
                            outline: 'none',
                            boxShadow: 'none',
                            padding: 0,
                            margin: 0,
                            appearance: 'none', // Remove estilos padrão em navegadores modernos
                            height: 80,
                            lineHeight: 80,
                            paddingBottom: 20
                        }}
                        className="flex text-center text-7xl font-bold tracking-tighter w-full"
                        value={money}
                        onChange={handleMoneyChange}
                    />
                </div>
                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full"
                    onClick={() => onClick(50)}
                    type="button"
                >
                    <PlusIcon className="h-4 w-4" />
                    <span className="sr-only">+</span>
                </Button>
            </div>

            {/* ENTRADA / SAÍDA */}
            <Form.Item
                name="toggleGroup"
                rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}
                className="mt-5 mb-0"
            >
                <ToggleGroup
                    onValueChange={(value: string | null) => {
                        setToggleGroup(value);
                        form.setFieldsValue({ toggleGroup: value });
                    }}
                    type="single" variant="outline" size="lg" className="gap-5  text-primary"
                >
                    <ToggleGroupItem value="inflow" className="w-full gap-1 data-[state=on]:bg-green-100 dark:data-[state=on]:bg-green-950">
                        <IoArrowUpCircleOutline size={20} color="15803d" /> Entrada
                    </ToggleGroupItem>
                    <ToggleGroupItem value="outflow" className="w-full gap-1 data-[state=on]:bg-rose-100 dark:data-[state=on]:bg-rose-950">
                        <IoArrowDownCircleOutline size={20} color="be123c" /> Saida
                    </ToggleGroupItem>
                </ToggleGroup>
            </Form.Item>

            <Button type="submit" className="w-full mt-5" >
                {loading ? loadingIcon : 'Adicionar'}
            </Button>
        </Form>
    );
}