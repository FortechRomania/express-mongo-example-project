require( "./model" );
const controller = require( "./controller" );

const express = require( "express" );

const router = express.Router( );

// Add routes below
// Example: router.post/get/put/ ..../delete ( path ), middlewares ( if any ), controllerFunction );

// use apiDoc to generate documentation for API routes
// Details on how to use on: http://apidocjs.com/

router.post( "/", controller.create );

router.put( "/:id", controller.update );

router.delete( "/:id", controller.delete );

router.get( "/", controller.list );

router.get( "/:id", controller.detail );

module.exports = router;
