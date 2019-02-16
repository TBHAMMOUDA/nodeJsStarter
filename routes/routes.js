var express = require('express');
var actions = require('../methods/actions');
var router = express.Router();
  

router.post('/AddUser', actions.addUser);
router.get('/GetAllUsers', actions.getAllUsers);
/**
 * @swagger
 * /users:
 *    get:
 *      description: This should return all users
 */
router.get('/GetAllUsers', actions.getAllUsers);

router.route('/GetByIdUser/:id').get( actions.getUserByid);   
router.post('/authenticate', actions.authenticate);

module.exports = router;