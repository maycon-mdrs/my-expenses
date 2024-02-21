import { createContext, useEffect, useState } from "react";
import { DataType, DataList } from "@/types/DataType";
import { getDataLocalStorage, setDataLocalStorage } from "./util";

interface IDataProvider {
    /**
     * Os elementos JSX (React) que serão envolvidos pelo provedor de autenticação.
     */
    children: JSX.Element;
}

export const DataContext = createContext<DataList>({} as DataList);

export function DataProvider({ children }: IDataProvider) {
    const [data, setData] = useState<DataType[]>(() => {
        const data = getDataLocalStorage();
        return data ?? [];
    });

    useEffect(() => {
        setDataLocalStorage(data);
    }, [data]);

    async function setDataList(dataList: DataType[]) {
        setData(dataList);
        setDataLocalStorage(dataList);
    }

    async function addData(newData: DataType) {
        const updatedData = [...data, newData];
        setData(updatedData);
        setDataLocalStorage(updatedData);
    }

    async function removeData(id: number) {
        const updatedData = data.filter(item => item.id !== id);
        setData(updatedData);
        setDataLocalStorage(updatedData);
    }

    return (
        <DataContext.Provider value={{ data, setData: setDataList, addData, removeData }}>
            {children}
        </DataContext.Provider>
    );
}
