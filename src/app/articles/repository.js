const mongoose = require( "mongoose" );

const Article = mongoose.model( "Article" );

const createArticle = async ( user, data ) => {
    try {
        const article = new Article( data );
        article.authorId = user.id;
        const query = await article.save();
        return query;
    } catch ( err ) { return err; }
};

const findArticles = async () => {
    const query = await Article.find( );
    return query;
};

const findDetails = async ( id ) => {
    const query = await Article.findOne( { id } );
    return query;
};

module.exports = {
    createArticle,
    findArticles,
    findDetails,
};
