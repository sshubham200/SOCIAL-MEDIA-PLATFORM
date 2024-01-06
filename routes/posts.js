const express = require('express');

const router = express.Router();
const postController = require('../controller/post_controller');
const Passport = require('passport');

router.post('/create',Passport.checkAuthentication,postController.create)
router.get('/destroy/:id',Passport.checkAuthentication,postController.destroy);
// router.get('/post',postController.post);

module.exports = router;