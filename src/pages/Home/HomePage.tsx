import { DrawerData } from "@/components/dashboard/drawerData";
import { Dashboard } from "@/components/dashboard/overview";
import { ModeToggle } from "@/components/mode-toggle";
import { MyNav } from "@/components/nav/MyNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataContext } from "@/context/DataProvider";
import { useContext } from "react";

export function HomePage() {
    const data = useContext(DataContext);

    async function handleAdd() {
        
    }

    return (
        <>  
            <MyNav />
            <DrawerData />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <Dashboard />
                    </CardContent>
                </Card>
            </div>
        </>
    )
}