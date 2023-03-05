import { FileTransportOptions, LogData } from '../../types';
import Transport from '../Transport';
import fs from 'fs';
import { join } from 'path';
import { Console } from 'console';

export default class FileTransport extends Transport {
    public directory: string;
    public name: string | (() => string);
    public keepFor: number | null;
    public rotateAfter: number | null;

    private stream: fs.WriteStream;
    private path: string;
    private file: Console;

    constructor(options: FileTransportOptions = {}) {
        super(options);

        this.timestamp = options.timestamp || 'YYYY-MM-DD';
        this.name = options.name || '%TIMESTAMP%';
        this.directory = options.directory || './logs';
        this.keepFor = options.keepFor || null;
        this.rotateAfter = options.rotateAfter || null;
    }

    public format(log: LogData): LogData {
        const title = log.namespace
            ? `[${log.level.toUpperCase()}] (${log.namespace.toUpperCase()})`
            : `[${log.level.toUpperCase()}]`;

        log.message = `${log.timestamp} ${title} - ${log.message}`;

        if (Object.keys(log.metaData).length > 0) {
            const object = JSON.stringify(log.metaData, null, 2);
            log.message += ` ${object}`;
        }

        return log;
    }

    private _prepare(log: LogData) {
        if (this.stream) this.stream.end();

        if (!fs.existsSync(this.directory)) fs.mkdirSync(this.directory);

        if (this.keepFor) {
            const files = fs.readdirSync(this.directory)    
                .filter((file) => file.endsWith('.log'));

            for (const file of files) {
                const path = join(this.directory, file);
                const oneDay = 1000 * 60 * 60 * 24;
                const { birthtimeMs } = fs.statSync(path);

                const deleteDate = birthtimeMs + oneDay * this.keepFor;
                const now = Date.now();

                if (deleteDate > now) fs.unlinkSync(path);
            }
        }

        const file = typeof this.name === 'function' ? this.name() : this.name.replaceAll('%TIMESTAMP%', log.timestamp);
        this.path = join(this.directory, `${file}.log`);
        
        this.stream = fs.createWriteStream(this.path, { flags: 'a' });
        this.file = new Console({
            stderr: this.stream,
            stdout: this.stream,
        });
    }

    public write(log: LogData) {
        if (!this.file) this._prepare(log);
        if (this.rotateAfter) {
            const { birthtimeMs } = fs.statSync(this.path);
            const oneDay = 1000 * 60 * 60 * 24;
            const rotateDate = birthtimeMs + oneDay * this.rotateAfter;
            const now = Date.now();
            if (rotateDate > now) this._prepare(log);
        }

        const types = [
            'error',
            'warn',
            'info',
            'debug',
        ];

        const type = types.includes(log.level.toLowerCase())
            ? log.level.toLowerCase()
            : 'log';

        this.file[type](log.message);
    }
}
