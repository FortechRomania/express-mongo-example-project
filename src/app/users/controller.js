const extractObject = require( "../../utilities" ).extractObject;
const logger = require( "../../utilities/logger" );
const repository = require( "./repository" );

exports.register = ( req, res ) => {
    const { user } = req;

    if ( user ) {
        logger.error( "User already exists" );
        res.preconditionFailed( "existing_user" );
        return;
    }
    repository.saveUser( req.body )
        .then( savedUser => {
            logger.info( "User saved with success!" );
            res.success( extractObject(
            savedUser,
            [ "id", "name", "age", "sex", "username" ] ) );
        } );
};

exports.edit = ( req, res ) => {
    repository.findUser( req.user.id ).then( user =>
        repository.editUser( user, req.body )
            .then( savedUser => res.success( extractObject(
                savedUser,
                [ "id", "name", "age", "sex", "username" ] ) ) )
            .catch( ( err ) => res.send( err ) ) );
};

exports.delete = ( req, res ) => {
    const { user } = req;

    repository.deleteUser( user )
        .then( res.success )
        .catch( err => res.send( err ) );
};
