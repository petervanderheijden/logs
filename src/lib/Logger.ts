import { LogData, LoggerOptions, LogLevel, MetaData } from '../types';
import merge from 'xtend';
import defaults from '../defaults';
import dayjs from 'dayjs';
import EventEmitter from 'events';

export default class Logger extends EventEmitter {
    public defaults: Required<LoggerOptions>;
    public _options: Required<LoggerOptions>;
    public levels: Array<string>;

    /**
     * Create a Logger instance.
     * @param options - The logger options
     */
    constructor(options: LoggerOptions = {}) {
        super();

        this.defaults = defaults;
        this._options = merge(this.defaults, options);
        this.levels = Object.keys(this._options.levels);
        this._init();
    }

    private _init() {
        if (this.levels.includes('log'))
            throw new Error('The level "log" conflicts with the equally named method.');
        
        if (!this.levels.includes(this._options.level))
            throw new Error(`The level "${this._options.level}" does not exists on the logger.`);
        
        if (this._options.transports.length < 1)
            throw new Error('At least one transport is required.');
        
        for (const level of this.levels) {
            const logLevel: LogLevel = {
                name: level,
                number: this.levels.indexOf(level),
            };
    
            this[level] = (
                message: string,
                metaData: MetaData = {},
            ) => this.log(null, logLevel, message, metaData);
    
            for (const namespace of this._options.namespaces) {
                this[level][namespace] = (
                    message: string,
                    metaData: MetaData = {},
                ) => this.log(namespace, logLevel, message, metaData);
            }
        }
    }

    /**
     * Write to one or multiple transports.
     * @param namespace - The namespace
     * @param level - The log level
     * @param message - The message
     * @param metaData - Optional metadata
     */
    public log(namespace: string | null, level: LogLevel, message = 'No message provided.', metaData: MetaData) {
        for (const transport of this._options.transports) {
            transport.level ??= this._options.level; // transport will get the global level when undefined

            const data: LogData = transport.format({
                namespace,
                level: level.name,
                message,
                metaData,
                timestamp: typeof transport.timestamp === 'function'
                    ? transport.timestamp()
                    : dayjs().format(transport.timestamp),
            });

            transport.write(data);
            this.emit('logged', data);
        }
    }

    public get(): Required<LoggerOptions> {
        return this._options;
    }

    public set(options: Partial<LoggerOptions>) {
        this._options = merge(this._options, options);
        this._init();
    }
}
