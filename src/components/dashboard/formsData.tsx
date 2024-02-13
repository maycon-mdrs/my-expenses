import { useState } from "react";

import { Form } from "antd"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingOutlined } from '@ant-design/icons';

import {
    ToggleGroup,
    ToggleGroupItem,
  } from "@/components/ui/toggle-group"

export function FormsData() {
    const [loading, setLoading] = useState(false)

    const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    async function handleAdd() {
        setLoading(true);
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="login-form"
            onFinish={handleAdd}
            onFinishFailed={onFinishFailed}
        >
            {/* TITULO */}
            <Form.Item
                name="title"
                rules={[
                    {
                        required: true,
                        message: 'Por favor, inserir seu e-mail!'
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
                rules={[
                    {
                        required: true,
                        message: 'Por favor, inserir seu e-mail!'
                    }
                ]}
                className="text-primary m-0"
            >
                <div className="space-y-1">
                    <Label htmlFor="description">Descrição</Label>
                    <Input id="description" />
                </div>
            </Form.Item>

            {/* VALOR */}
            <ToggleGroup type="single">
                <ToggleGroupItem value="inflow">
                    Entrada
                </ToggleGroupItem>
                <ToggleGroupItem value="outflow">
                    Saida
                </ToggleGroupItem>
            </ToggleGroup>

            <Button type="submit" className="w-full" >
                {loading ? loadingIcon : 'Adicionar'}
            </Button>

        </Form>
    );
}