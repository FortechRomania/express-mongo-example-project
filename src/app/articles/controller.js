const mongoose = require( "mongoose" );
const utilities = require( "../../utilities" );

const Article = mongoose.model( "Article" );

exports.create = ( req, res ) => {
    const user = req.user;
    const article = new Article( req.body );
    article.authodId = user.id;
    article.save( function( err, createdArticle ) {
        if ( err ) {
            res.validationError( err );
        } else {
            res.success( utilities.extractObject(
                createdArticle,
                [ "id", "title", "body" ] ) );
        }
    } );
};

exports.update = ( req, res ) => {
    res.success( );
};

exports.delete = ( req, res ) => {
    res.success( );
};

exports.list = ( req, res ) => {
    Article.find( ( err, articles ) => {
        if ( err ) {
            return res.notFound( );
        }

        return res.success( articles );
    } );
};

exports.detail = ( req, res ) => {
    Article.findOne( { id: req.params.id }, function( err, articles ) {
        if ( err ) {
            res.notFound( );
        } else {
            res.success( articles );
        }
    } );
};
