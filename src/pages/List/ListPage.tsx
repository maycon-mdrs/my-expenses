import { DrawerData } from "@/components/dashboard/drawerData";
import { DataTable } from "@/components/list/dataTable";
import { NoDATA } from "@/components/status/NoData";
import { DataContext } from "@/context/DataProvider";
import { useContext } from "react";

export function ListPage() {
    const { data } = useContext(DataContext);
    return (
        <div className="flex-1 space-y-4 p-4 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Lista de transações</h2>
                <div className="flex items-center space-x-2">
                    <DrawerData />
                </div>
            </div>
            {data.length === 0 ?
                (
                    <div className="flex items-center justify-center h-[calc(100vh-15rem)]"> <NoDATA /></div>
                )
                : <DataTable />
            }
        </div>
    );
}