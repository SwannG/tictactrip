const router = require( 'express' ).Router();

const authMiddleware = require( './middleware/auth' );
const rateLimitMiddleware = require( './middleware/rateLimit' );
const contentTypeMiddleware = require( './middleware/contentType' );

const authController = require( './controllers/auth' );
const justifyController = require( './controllers/justify' );

router.post( '/api/token', contentTypeMiddleware.isJson, authController.postLogin );
router.post( '/api/justify', authMiddleware.isLoggedApi, contentTypeMiddleware.isTextPlain, rateLimitMiddleware.isRateLimitReached, justifyController.postJustify );

module.exports = router;
