const jwt = require( "jsonwebtoken" );
const mongoose = require( "mongoose" );

const extractObject = require( "../../utilities" ).extractObject;
const logger = require( "../../utilities/logger" );

const User = mongoose.model( "User" );
const SECRET = "superSuperSecret";

exports.register = ( req, res ) => {
    let user = req.user;
    if ( user ) {
        logger.error( "User already exists" );
        res.preconditionFailed( "existing_user" );
        return;
    }
    user = new User( req.body );
    user.save( function( err, savedUser ) {
        if ( err ) {
            logger.error( "Validation Error on user.saved: ", err );
            return res.validationError( err );
        }
        logger.info( "User saved with success!" );
        return res.success( extractObject(
            savedUser,
            [ "id", "name", "age", "sex", "username" ] ) );
    } );
};

exports.login = ( req, res ) => {
    const user = req.user;
    if ( !req.body.password ) {
        logger.error( "Password is not provided. Add it on the req.body" );
        return res.status( 400 ).send( "password required" );
    }

    const password = req.body.password;

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
