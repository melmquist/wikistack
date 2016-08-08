var express = require('express');
var router = express.Router();
var models=require('./models');
var Page=models.Page;
var User=models.User;

router.get('/', function(req, res){
  res.send("Something");
});

router.post('/', function(req, res){
  //	submit a new page to the database

  res.json(req.body);


  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`

  var page = Page.build({               // THIS IS WHERE WE LEFT OFF!!!!
    title: req.body.title,
    urlTitle: req.body.authorTitle,
    content: req.body.content,
    status: ,
    date:

  });
  //
  // // STUDENT ASSIGNMENT:
  // // make sure we only redirect *after* our save is complete!
  // // note: `.save` returns a promise or it can take a callback.
  page.save();
  // -> after save -> res.redirect('/');


})

router.get('/add', function(req, res){
  //	retrieve the "add a page" form
  res.render('addpage');

})

module.exports = router;
