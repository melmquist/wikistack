var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');

var Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
    date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
}, {
getterMethods:{
  urlTitle: function(){return "/wiki/"+this.urlTitle;}
}
});

Page.hook('beforeValidate', function(page){
  page.urlTitle=serialize(page.title);
});


function serialize(str){
	if (str === undefined){
		return Math.random().toString(36).substring(2, 7);
	}
	var reg = /\w/;
	var answer = "";
	for(var i = 0; i < str.length; i++){
		if(str[i] === " "){
			answer+= "_";
		} else if (reg.test(str[i])){
			answer+= str[i];
		}
	}
	return answer;
}
/*

var Foo = sequelize.define('foo', {
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING
}, {
  getterMethods   : {
    fullName       : function()  { return this.firstname + ' ' + this.lastname }
  },

  setterMethods   : {
    fullName       : function(value) {
        var names = value.split(' ');

        this.setDataValue('firstname', names.slice(0, -1).join(' '));
        this.setDataValue('lastname', names.slice(-1).join(' '));
    },
  }
});



*/





var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
});


module.exports={Page:Page, User:User};
