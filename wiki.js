var express = require('express');
var router = express.Router();
var models=require('./models');
var Page=models.Page;
var User=models.User;

router.get('/', function(req, res){
  // res.send("Something");
  res.render('index');
  // res.redirect('/');       //later?




});

router.post('/', function(req, res){
  //	submit a new page to the database

  // res.json(req.body);

  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`

  var page = Page.build({
    title: req.body.title,
    content: req.body.pageContent,
  });
  //console.log(page);

  //
  // // STUDENT ASSIGNMENT:
  // // make sure we only redirect *after* our save is complete!
  // // note: `.save` returns a promise or it can take a callback.

  page.save().then(function(){              //page.save is async cus it has to communicate with DB
    // console.log(arguments);
    res.redirect('/');
    //res.json???
  }).catch(function(err){
    console.log(err);
  });
});

router.get('/add', function(req, res){
  //	retrieve the "add a page" form
  res.render('addpage');

})

router.get('/:urlTitle', function(req, res, next){
  // res.send("Here's your instance: "+page);
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
  .then(function(foundPage){
    res.json(foundPage);
  })
  .catch(next);
})

module.exports = router;
