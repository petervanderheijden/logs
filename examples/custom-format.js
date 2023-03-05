const {
    Logger,
    ConsoleTransport,
} = require('@petervanderheijden/logs');

const log = new Logger({
    transports: [
        new ConsoleTransport({
            format: (log) => {
                // You can now write your own formatter.
                // The logger will check for a custom formatter and will use it.

                return log; // You always need to return the log at the end of the formatting.
            },
        }),
    ],
});


// The loggger will now write to the console-transport with the custom format.
// Warning: It is not recommended to modfiy any of the existing data except for the `message`.  
log.info('Logger established.');
