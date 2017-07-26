const usersRoutes = require( "./users/routes" );
const articlesRoutes = require( "./articles/routes" );
const validateToken = require( "../middlewares/validateToken" );

module.exports = ( app ) => {
    app.use( "/users", usersRoutes );
    app.use( "/articles", validateToken, articlesRoutes );
};
