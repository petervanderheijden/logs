import Transport from './lib/Transport';

export interface LogLevel {
    name: string;
    number: number;
}

export interface MetaData {
    [key: string]: any;
}

export type ColourResolvable = string | [number, number, number]

export interface LogData {
    level: string;
    namespace: string | null;
    message: string;
    timestamp: string;
    metaData: MetaData;
    [key: string]: any;
}

export interface LoggerOptions {
    level?: string;
    namespaces?: Array<string>;
    levels?: {
        [key: string]: number;
    };
    transports?: Array<Transport>;
}

export interface TransportOptions {
    level?: string;
    format?: (log: LogData) => LogData;
    timestamp?: string | (() => string); // string = format for fecha, function is custom
    silence?: boolean;
}

export interface ConsoleTransportOptions extends TransportOptions {
    colours?: {
        [key: string]: ColourResolvable;
    };
}

export interface FileTransportOptions extends TransportOptions {
    directory?: string;
    name?: string | (() => string);
    keepFor?: number | null;
    rotateAfter?: number | null;
}
