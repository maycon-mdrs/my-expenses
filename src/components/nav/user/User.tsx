import React from 'react';
import { Avatar } from "antd";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from 'react-router-dom';


export function User() {
    const name = "Maycon Douglas";
    const email = "maycon.mdrs@gmail.com"
    const navigate = useNavigate();

    async function Logout() {
        navigate('/login');
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='rounded-full'>
                <Avatar style={{ backgroundColor: '#7265e6', verticalAlign: 'middle' }}>
                    {name?.toString().charAt(0).toUpperCase()}
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className="cursor-pointer">Perfil</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">Configurações</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={Logout}>
                    Sair
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}