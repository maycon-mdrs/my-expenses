import React, { useRef } from "react";
import {
    Navbar,
    Typography,
    Collapse,
    IconButton,
} from "@material-tailwind/react";
import { useOnClickOutside } from 'usehooks-ts';
import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import { User } from "@/components/nav/user/User";

export function MyNav() {
    const [openNav, setOpenNav] = React.useState(false);
    const navRef = useRef(null)

    const handleClickOutside = () => {
        setOpenNav(false)
        //console.log('clicked outside')
    }

    useOnClickOutside(navRef, handleClickOutside)

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    const navList = (
        <ul className={`mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6`}>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
                placeholder={"Home"}
            >
                <Link to={'/home'} className="flex items-center" onClick={() => setOpenNav(false)}>
                    Dashboard
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
                placeholder={"lista"}
            >
                <Link to={'/lista'} className="flex items-center" onClick={() => setOpenNav(false)}>
                    Lista de transações
                </Link>
            </Typography>
        </ul>
    );

    return (
        <Navbar ref={navRef} className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 bg-background text-primary " placeholder={undefined}>
            <div className={`flex items-center justify-between`}>
                <div className="flex items-center gap-4">
                    <IconButton
                        variant="text"
                        className="flex ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                        ripple={false}
                        onClick={() => setOpenNav(!openNav)} placeholder={undefined}
                    >
                        {openNav ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </IconButton>
                    <Typography
                        as="a"
                        href="/home"
                        className={`mr-4 cursor-pointer py-1.5 font-medium italic`}
                        placeholder={"Home"}
                    >
                        My EXPENSES
                    </Typography>
                </div>
                <div className="flex items-center gap-4">
                    <div className="mr-4 hidden lg:block">{navList}</div>
                    <div className="flex items-center gap-x-4">
                        <User />
                        <ModeToggle />
                    </div>
                </div>
            </div>
            <Collapse open={openNav}>
                {navList}
                <div className="flex items-center gap-x-1">

                </div>
            </Collapse>
        </Navbar>
    );
}