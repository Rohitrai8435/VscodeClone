var express = require('express');
var router = express.Router();
var userModel=require("./users")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/feed', function(req, res, next) {
  userModel.find().then(function(allUsers){
    res.render("feed",{allUsers})
  })
});
router.get('/likes/:id', function(req, res, next) {
 userModel.findOne({_id:req.params.id}).then(function(user){
  user.likes++;
  user.save().then(function(svseduser){
    res.redirect("back");
  })
  })
});
router.post('/create', function(req, res, next) {
    userModel.create({
    fullname:req.body.fullname,
    email:req.body.email,
    profileImage:req.body.profileImage
  }).then(function(user){
    res.send(user);
  })
});

router.get('/users',function(req,res)
{
  userModel.find().then(function(users)
  {
    res.send(users);
  })
})



module.exports = router;
