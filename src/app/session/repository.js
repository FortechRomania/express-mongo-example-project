const mongoose = require( "mongoose" );

const User = mongoose.model( "User" );

const findUser = ( data ) => {
    const user = data.username;
    return User.findOne( { username: user } );
};
module.exports = {
    findUser,
};
