var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var routes = require('./wiki.js');
var swig = require('swig');
var models = require('./models');


app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


app.use(express.static(__dirname));




app.use(function(req, res, next){
  console.log(req.method, req.path);
  next();
});


app.use('/wiki/', routes);

//SWIG
// point res.render to the proper directory
app.set('views', __dirname + '/views');
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files
// have it use swig to do so
app.engine('html', swig.renderFile);
// turn of swig's caching
swig.setDefaults({cache: false});






models.User.sync({})
.then(function () {
    return models.Page.sync({})
})
.then(function () {
    app.listen(3001, function () {
        console.log('Server is listening on port 3001!');
    });
})
.catch(console.error);
