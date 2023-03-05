const { Transport } = require('@petervanderheijden/logs');

class CustomTransport extends Transport {
    constructor(options = {}) {
        super(options);

        // Consume any custom options here like:
        // - custom settings for example an API key.
        // - authentication.
        // - other custom options.
    }

    format(log) {
        // Here you provide the default logger for when no one is specified.
        // This done so the user-experience is as simple as possible.

        return log; // You always need to return the log at the end of the formatting.
    }

    write(log) {
        // Here you provide logic for writing to the transport.
        // There are no requirements for writing to the transport,
        // this is fully customisable.
    }
}

module.exports = CustomTransport;
