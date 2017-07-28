const winston = require( "winston" );
const fs = require( "fs" );

const config = require( "../config" );

const tsFormat = ( ) => ( new Date( ) ).toLocaleTimeString( );
const logDir = "log";

if ( !fs.existsSync( logDir ) ) {
    fs.mkdirSync( logDir );
}

const logger = new ( winston.Logger )( {
    transports: [
        new ( winston.transports.Console )( {
            colorize: true,
            timestamp: tsFormat,
            level: "debug",
        } ),
        new ( winston.transports.File )( {
            filename: `${ logDir }/results.log`,
            timestamp: tsFormat,
            level: process.env.LOG_LEVEL || config.logLevel,
        } ),
    ],
} );

logger.info( "Info message" );
logger.warn( "Warning message" );
logger.debug( "Debugging info" );

module.exports = logger;
