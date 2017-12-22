const mongoose = require( "mongoose" );

const Article = mongoose.model( "Article" );
const User = mongoose.model( "User" );

const createArticle = async ( user, data ) => {
    const { id } = user;

    const article = new Article( data );
    article.authorId = await User.findOne( { id } );
    const query = await article.save();
    return query;
};

const findArticles = () => Article.find( );

const findDetails = ( id ) => Article.findOne( { _id: id } );

module.exports = {
    createArticle,
    findArticles,
    findDetails,
};
