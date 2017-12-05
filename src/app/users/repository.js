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
    try {
        user.name = name;
        user.sex = sex;
        user.age = age;
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

module.exports = {
    saveUser,
    editUser,
    deleteUser,
};
