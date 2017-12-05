const utilities = require( "../../utilities" );
const repository = require( "./repository" );

exports.create = ( req, res ) => {
    const { user } = req;

    repository.createArticle( user, req.body )
        .then( createdArticle => res.success( utilities.extractObject(
            createdArticle,
            [ "id", "title", "body" ] ) ) );
};

exports.update = ( req, res ) => {
    res.success( );
};

exports.delete = ( req, res ) => {
    res.success( );
};

exports.list = ( req, res ) => {
    repository.findArticles()
        .then( articles => res.success( articles ) )
        .catch( err => res.send( err ) );
};

exports.detail = ( req, res ) => {
    repository.findDetails( req.params.id )
        .then( article => res.success( article ) )
        .catch( err => res.send( err ) );
};
