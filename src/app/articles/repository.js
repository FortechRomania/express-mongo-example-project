const mongoose = require( "mongoose" );

const Article = mongoose.model( "Article" );
const User = mongoose.model( "User" );

const createArticle = async ( user, data ) => {
    const { id } = user;
    try {
        const article = new Article( data );
        article.authorId = await User.findOne( { id } );
        const query = await article.save();
        return query;
    } catch ( err ) { return err; }
};

const findArticles = async () => {
    const query = await Article.find( );
    return query;
};

const findDetails = async ( id ) => {
    const query = await Article.findOne( { _id: id } );
    return query;
};

module.exports = {
    createArticle,
    findArticles,
    findDetails,
};
