const jwt = require( "jsonwebtoken" );
const repository = require( "./repository" );

const config = require( "../../config" );
const logger = require( "../../utilities/logger" );

exports.login = async ( req, res ) => {
    if ( !req.body.password || !req.body.username ) {
        res.preconditionFailed( "Credentials required" );
        return;
    }

    try {
        const user = await repository.findUser( req.body );
        if ( !user || !user.checkPass( req.body.password ) ) {
            res.json( { success: false, message: "Authentication failed." } );
            return;
        }

        const token = jwt.sign( user.toObject(), config.secret, { expiresIn: 1440 } );
        logger.info( "User loged in with success. Login token", token );
        res.json( {
            success: true,
            token,
        } );
    } catch ( err ) {
        res.send( err );
    }
};
