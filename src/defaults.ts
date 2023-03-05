import ConsoleTransport from './lib/transports/ConsoleTransport';
import FileTransport from './lib/transports/FileTransport';
import { LoggerOptions } from './types';

const defaults: Required<LoggerOptions> = {
    level: 'notice',
    namespaces: [],
    levels: {
        critical: 0,
        error: 1,
        warn: 2,
        success: 3,
        notice: 4,
        info: 5,
        verboose: 6,
        debug: 7,
    },
    transports: [
        new ConsoleTransport(),
        new FileTransport(),
    ],
};

export default defaults;
