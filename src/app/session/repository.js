const mongoose = require( "mongoose" );

const User = mongoose.model( "User" );

const findUser = async ( data ) => {
    const user = data.username;
    try {
        const queryResult = await User.findOne( { username: user } );
        return queryResult;
    } catch ( err ) {
        return err;
    }
};
module.exports = {
    findUser,
};
