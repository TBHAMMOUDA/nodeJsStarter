var Img = require('../models/Role');
var User = require('../models/User');
var Role =require('../models/Role')
var config = require('../config/database');
var jwt = require('jwt-simple');
const bcrypt = require('bcryptjs');
var mailer = require('./mailer');


var functions = {

  addUser: function(req, res) { 
    var u = new User();
    u.name=req.body.name;
    u.email=req.body.email
    console.log('aaa');
    bcrypt.hash(req.body.password, 10, function(err, hash) {
    u.password=hash
    User.find({  email: req.body.email}, function (err, docs) {
      if(docs.length == 0){
        role=new Role();
        role.name="admin";
        role.save(function (err){
          if(err) return console.error(err.stack)
          console.log("role is added")
         });
        u.roles.push(role._id)
        u.save(function (err, r) {
          if (err) 
          res.status(400).send({message:'Sorry !! this e-mail is associated to an existing account'}) 

          mailer.send(req.body.email,req.body.password)
          res.send({success : true})
        })
      }else{
        res.status(400).send({message:'Sorry !! this e-mail is associated to an existing account'}) 
      }
    }) } )
   },


    getusers: function(req, res ){
        User.findAll({}).then(users => { 
            if(!users) {
                res.status(403).send({success: false, msg: 'Error'});
            }
            return res.json(users);
        })
    },
getUserByid: function(req, res) {
   User.findById(req.params.id, function(err, user) {
if (err)
  res.send(err);
  res.send(user);
})
},

getAllUsers: function(req, res) {
   // console.log(req.user)
    User.find(function(err, users) {
if (err)
  res.send(err);
  res.send(users);
})
},
authenticate: function(req, res) {
       
  User.findOne({ 'email': req.body.email} )
  .then(user => { 
      if(!user) {
          res.status(403).send({success: false, msg: 'Authentication failed, User not found'});
      }
     else {
    bcrypt.compare(req.body.password, user.password, function(err, res_bcrypt) {
      if(res_bcrypt) {
          res.json({success: true, userID: user.id});
      } else {
      return res.status(403).send({success: false, msg: 'Authenticaton failed, wrong password.'});
      } 
    });
  }
  })
  .catch(error => res.status(400).send(error));
},


    
}

module.exports = functions;
