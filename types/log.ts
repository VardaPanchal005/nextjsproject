export const Loglevels=["info","error"] as const;
export type LogLevel=(typeof Loglevels)[number];

export type LogFunction= (message:string)=>void;
export type log = {message:string;level:LogLevel;timestamp:Date};

export type LogCollector={
    getAll(): log[];
} & {
     [K in LogLevel]:LogFunction;
};