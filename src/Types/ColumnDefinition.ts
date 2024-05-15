export type ColumnDefinition = {
    header: string;
    accessor: string;
    formatter?: (value: any) => any;
};