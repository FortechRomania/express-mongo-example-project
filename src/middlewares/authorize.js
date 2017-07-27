const mongoose = require( "mongoose" );
const User = mongoose.model( "User" );

module.exports = function( req, res, next ) {
    const id = req.body.id;
    if ( !id ) {
        return res.preconditionFailed( "missing_id" );
    }

    return User.findOne(
        { id },
        function( err, user ) {
            if( err ) {
                return res.serverError( );
            }
            req.user = user;
            return next( );
        } );
};
