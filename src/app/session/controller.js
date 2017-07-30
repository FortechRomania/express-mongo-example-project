const jwt = require( "jsonwebtoken" );
const mongoose = require( "mongoose" );

const User = mongoose.model( "User" );

const config = require( "../../config" );
const logger = require( "../../utilities/logger" );

exports.login = ( req, res ) => {
    if ( !req.body.password ) {
        res.preconditionFailed( "password required" );
        return;
    }

    if ( !req.body.username ) {
        res.preconditionFailed( "username required" );
        return;
    }

    User.findOne( { username: req.body.username }, function( err, user ) {
        if ( err ) {
            return res.json( {
                success: false,
                message: "Authentication failed. User not found.",
            } );
        }

        if ( !user.checkPass( req.body.password ) ) {
            return res.json( {
                success: false,
                message: "Authentication failed. Wrong password.",
            } );
        }

        const token = jwt.sign( user.toObject(), config.secret, { expiresIn: 1440 } );
        logger.info( "User loged in with success. Login token", token );
        return res.json( {
            success: true,
            token,
        } );
    } );
};
