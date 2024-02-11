import { useState } from "react";

import { Form } from "antd"
import { CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingOutlined } from '@ant-design/icons';

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
            <CardContent className="space-y-2">

                {/* EMAIL */}
                <Form.Item
                    name="email-login"
                    rules={[
                        {
                            type: 'email',
                            message: 'Por favor, inserir um e-mail válido!'
                        },
                        {
                            required: true,
                            message: 'Por favor, inserir seu e-mail!'
                        }
                    ]}
                    validateTrigger="onBlur"
                    className="text-primary m-0"
                >
                    <div className="space-y-1">
                        <Label htmlFor="email-login">E-mail</Label>
                        <Input id="email-login" />
                    </div>
                </Form.Item>

            </CardContent>

            <CardFooter>
                <Button type="submit" className="w-full" >
                    {loading ? loadingIcon : 'Entrar'}
                </Button>
            </CardFooter>
        </Form>
    );
}