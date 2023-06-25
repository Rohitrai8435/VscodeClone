const { log } = require('console');
var express = require('express');
var fs = require('fs');

var router = express.Router();

/* GET home page. */

router.get('/createFile', function(req, res) {
  fs.writeFile(`./upload/${req.query.fileName}`,"",function(err){
    if(err) throw err;
    else
    {
      res.redirect("/");
    }
  })
});
router.get('/createFolder', function(req, res) {
  fs.mkdir(`./upload/${req.query.folderName}`,function(err){
    if(err) throw console.log(err);
    else
    {
      res.redirect("/");
    }
  })
});
router.get('/dfile/:filename', function(req, res) {
  fs.unlink(`./upload/${req.params.filename}`,function(err){
    if(err) 
    throw console.log(err);
    else
    {
      res.redirect("/");
    }
  })
});
router.get('/dfolder/:filename',function(req, res) {
  fs.rmdir(`./upload/${req.params.filename}`,function(err){
    if(err) throw console.log(err);
    else
    {
      res.redirect("/");
    }
  })
});
router.get('/', function(req, res) {
  var arr = [];
  fs.readdir("./upload",{withFileTypes:true},function(err,file){
    file.forEach(function(elm){
      arr.push({name:elm.name,is:elm.isDirectory()});
    })
    res.render('index',{arr:arr});

  })

});
router.get('/file/:filename',function(req,res){
  var arr = [];
  fs.readdir("./upload",{withFileTypes:true},function(err,file){
    file.forEach(function(elm){
      arr.push({name:elm.name,is:elm.isDirectory()});
    })
    fs.readFile(`./upload/${req.params.filename}`,"utf-8",function(err,data){
      res.render('open',{arr:arr,openfile:req.params.filename,filedata:data});
    })
    

  })
})


module.exports = router;
