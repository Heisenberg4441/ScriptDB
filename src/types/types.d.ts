export interface Config {
    port: number;
    user: string;
    password: string;
}

type ColumnType = "string" | "number" | "boolean" | "date";
export interface ColumnDefinition {
    type: ColumnType;
    default?: any;
    noNull?: boolean;
}
export type TableSchema = Record<string, ColumnDefinition>; 