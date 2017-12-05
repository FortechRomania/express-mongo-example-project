const mongoose = require( "mongoose" );

const User = mongoose.model( "User" );

const saveUser = async ( data ) => {
    try {
        const user = new User( data );
        user.setPass( data.password );
        const queryResult = await user.save( );

        return queryResult;
    } catch ( err ) {
        return err;
    }
};

const editUser = async ( user, data ) => {
    const { name, sex, age } = data;
    const currentUser = user;

    try {
        currentUser.name = name;
        currentUser.sex = sex;
        currentUser.age = age;
        const queryResult = await user.save( );
        return queryResult;
    } catch ( err ) {
        return err;
    }
};

const deleteUser = async( user ) => {
    try {
        const queryResult = await user.remove();
        return queryResult;
    } catch ( err ) {
        return err;
    }
};

const findUser = async( id ) => {
    const query = await User.findOne( { id } );
    return query;
};

module.exports = {
    saveUser,
    editUser,
    deleteUser,
    findUser,
};
