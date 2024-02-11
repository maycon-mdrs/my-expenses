export interface DataType {
    id: number;
    title: string;
    description: string;
    date: Date;
    inflow: number;
    outflow: number;
}


export interface DataList {
    data: DataType[];
    setData: (data: DataType[]) => Promise<void>;
    addData: (data: DataType) => Promise<void>;
    removeData: (id: number) => Promise<void>;
}
