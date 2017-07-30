const express = require( "express" );
const bodyParser = require( "body-parser" );

const config = require( "./config" );
const customResponses = require( "./middlewares/customResponses" );
const logger = require( "./utilities/logger" );

const app = express( );
const port = process.env.PORT || config.port;
const ENV = process.env.NODE_ENV || config.env;

app.set( "env", ENV );

app.use( bodyParser.json( ) );
app.use( customResponses );

require( "./config/mongoose" )( app );
require( "./app" )( app );

app.use( ( req, res ) => {
    res.notFound( );
} );

app.use( ( err, req, res, next ) => {
    logger.error( err.stack );
    next( err );
} );

// Don't remove next !!!!
app.use( ( err, req, res, next ) => { // eslint-disable-line no-unused-vars
    res.status( 503 ).json( {
        success: false,
        error: "server_error",
    } );
} );

app.listen( port, ( ) => {
    logger.info( `Listening on port ${ port }` );
} );
