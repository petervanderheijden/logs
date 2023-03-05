/**
 * @module @petervanderheijden/logs
 * @version 0.0.1
 * @description An out-of-the-box, lightweight but highly-configurable logger.
 * @author Peter van der Heijden
 * @copyright Peter van der Heijden 2023
 * @license MIT
 */

import Logger from './lib/Logger';
import Transport from './lib/Transport';
import ConsoleTransport from './lib/transports/ConsoleTransport';
import FileTransport from './lib/transports/FileTransport';

export {
    Logger,
    Transport,
    ConsoleTransport,
    FileTransport,
};
