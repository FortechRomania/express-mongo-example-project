const mongoose = require( "mongoose" );

const extractObject = require( "../../utilities" ).extractObject;
const logger = require( "../../utilities/logger" );

const User = mongoose.model( "User" );

exports.register = ( req, res ) => {
    let user = req.user;
    if ( user ) {
        logger.error( "User already exists" );
        res.preconditionFailed( "existing_user" );
        return;
    }
    user = new User( req.body );
    user.setPass( req.body.password );
    user.save( function( err, savedUser ) {
        if ( err ) {
            logger.error( "Validation Error on user.saved: ", err );
            res.validationError( err );
        } else {
            logger.info( "User saved with success!" );
            res.success( extractObject(
                savedUser,
                [ "id", "name", "age", "sex", "username" ] ) );
        }
    } );
};

exports.edit = ( req, res ) => {
    const user = req.user;
    const name = req.body.name;
    const sex = req.body.sex;
    const age = req.body.age;

    user.name = name;
    user.sex = sex;
    user.age = age;

    user.save( function( err, savedUser ) {
        if ( err ) {
            return res.validationError( err );
        }
        return res.success( extractObject(
            savedUser,
            [ "id", "name", "age", "sex" ] ) );
    } );
};

exports.delete = ( req, res ) => {
    const user = req.user;

    user.remove( );
    res.success( );
};
