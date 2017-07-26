const mongoose = require( "mongoose" );
const extractObject = require( "../../utilities" ).extractObject;
const jwt = require( "jsonwebtoken" );

const User = mongoose.model( "User" );
const SECRET = "superSuperSecret";

exports.register = ( req, res ) => {
    let user = req.user;
    if ( user ) {
        res.preconditionFailed( "existing_user" );
    } else {
        user = new User( req.body );
        user.save( function( err, savedUser ) {
            if ( err ) {
                res.validationError( err );
            } else {
                res.success( extractObject(
                    savedUser,
                    [ "id", "name", "age", "sex", "username", "password" ] ) );
            }
        } );
    }
};

exports.login = ( req, res ) => {
    const user = req.user;
    if ( !req.body.password ) {
        res.status( 400 ).send( "password required" );
        return;
    }

    const password = req.body.password;

    if ( user ) {
        if ( user.password !== password ) {
            res.json( {
                success: false,
                message: "Authentication failed. Wrong password.",
            } );
        } else {
            const token = jwt.sign( user, SECRET, {
                expiresIn: 1440,
            } );

            res.json( {
                success: true,
                token,
            } );
        }
    } else {
        res.json( {
            success: false,
            message: "Authentication failed. User not found.",
        } );
    }
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
            res.validationError( err );
        } else {
            res.success( extractObject(
                savedUser,
                [ "id", "name", "age", "sex" ] ) );
        }
    } );
};

exports.delete = ( req, res ) => {
    const user = req.user;

    user.remove( );
    res.success( );
};
