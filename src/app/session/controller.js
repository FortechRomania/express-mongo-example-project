const jwt = require( "jsonwebtoken" );
const md5 = require( "md5" );
// const mongoose = require( "mongoose" );

const logger = require( "../../utilities/logger" );

const SECRET = "superSuperSecret";

exports.login = ( req, res ) => {
    const user = req.user;
    if ( !req.body.password ) {
        logger.error( "Password is not provided. Add it on the req.body" );
        return res.status( 400 ).send( "password required" );
    }

    const password = md5( req.body.password );
    if ( user ) {
        if ( user.password !== password ) {
            return res.json( {
                success: false,
                message: "Authentication failed. Wrong password.",
            } );
        }
        const token = jwt.sign( user.toObject(), SECRET, { expiresIn: 1440 } );
        logger.info( "User loged in with success. Login token", token );
        return res.json( {
            success: true,
            token,
        } );
    }
    return res.json( {
        success: false,
        message: "Authentication failed. User not found.",
    } );
};
