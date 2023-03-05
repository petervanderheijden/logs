import { LogData, TransportOptions } from '../types';

export default abstract class Transport {
    public level: string | null;
    public timestamp: string | (() => string);
    public silence: boolean;
    
    /**
     * Create a Transport instance.
     * @param options - The transport options
     */
    constructor(options: TransportOptions) {
        this.level = options.level || null;
        this.format = options.format || this.format;
        this.timestamp = options.timestamp || 'MM/DD/YYYY HH:mm:ss';
        this.silence = options.silence || false;
    }

    /**
     * The default formatter exposed to the logger.
     * @param {LogData} log - The log data
     */
    public abstract format(log: LogData): LogData

    /**
     * The core logging method exposed to the logger.
     * @param {LogData} log - The log data
     */
    public abstract write(log: LogData): void
}
