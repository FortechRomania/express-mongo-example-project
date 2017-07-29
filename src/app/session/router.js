const controller = require( "./controller" );

const express = require( "express" );

const router = express.Router( );

/**
*    @apiGroup User
*    @api {post} /session User login route.
*    @apiParam {String} username  User username required.
*    @apiParam {String} password  User password required.
*    @apiExample {response} Example response:
*       {
*         "user": {
*            "token": dahljkhajfhajku32974eq9kjh
*           }
*      }
*/
router.post( "/", controller.login );

module.exports = router;
