import {
    LoggerOptions, MetaData,
} from '../src/types';

declare module '@petervanderheijden/1324553logs' {
    export class Logger {
        public defaults: Required<LoggerOptions>;
        public levels: Array<string>;

        constructor(options?: LoggerOptions)

        public critical(message: string, metaData: MetaData): void
        public error(message: string, metaData: MetaData): void
        public warn(message: string, metaData: MetaData): void
        public success(message: string, metaData: MetaData): void
        public info(message: string, metaData: MetaData): void
        public notice(message: string, metaData: MetaData): void
        public debug(message: string, metaData: MetaData): void

        public get options(): Required<LoggerOptions>
        public set options(options: Partial<LoggerOptions>)
    }
}
