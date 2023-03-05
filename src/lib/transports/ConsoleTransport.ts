import { ConsoleTransportOptions, LogData } from '../../types';
import Transport from '../Transport';
import chalk from 'chalk';

export default class ConsoleTransport extends Transport {
    public colours: {
        [level: string]: string | [number, number, number];
    };

    constructor(options: ConsoleTransportOptions = {}) {
        super(options);

        this.timestamp = options.timestamp || 'HH:mm:ss';
        this.colours = options?.colours || {
            critical: 'red',
            error: 'red',
            warn: 'yellow',
            success: 'green',
            info: 'blue',
            notice: 'cyan',
        };
    }

    public format(log: LogData): LogData {
        const colour = this.colours[log.level];
        const colourize = (...text: string[]) => {
            if (!colour) return text;

            return colour instanceof Array
                ? chalk.rgb(colour[0], colour[1], colour[2])(...text)
                : chalk[colour](...text);
        };

        const title = log.namespace
            ? `[${log.level.toUpperCase()}] (${log.namespace.toUpperCase()})`
            : `[${log.level.toUpperCase()}]`;

        log.message = `${chalk.grey(log.timestamp)} ${colourize(title)} - ${log.message}`;

        return log;
    }

    public write(log: LogData) {
        const types = [
            'error',
            'warn',
            'info',
            'debug',
        ];

        const type = types.includes(log.level.toLowerCase())
            ? log.level.toLowerCase()
            : 'log';
        
        console[type](log.message);
    }
}
