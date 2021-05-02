var express = require('express');
var lowdb = require('lowdb');
var filesync = require('lowdb/adapters/FileSync');
var { v4: uuidv4 } = require('uuid');
var bodyParser = require('body-parser');

// Instantiate the app
var app = express();

// Load the lowdb adapter to allow read/write functionality on the db file
var adapter = new filesync('db.json');
var db = lowdb(adapter);

// Set the default structure for the db file
db.defaults({
    posts: [],
}).write();

//Parse incoming request data
app.use(bodyParser.json());

// Routes for the API
//Adding a task
app.post('/add-task', function(req, res){
   var title = req.body.title;
   var id = uuidv4();
   if (!title || title === undefined){
     res.status(400).end()
   }
   else{
    db.get('posts').push({ id, title }).write();
   return res.status(201).end();
   }
   
});


//Listing all tasks
app.get('/tasks', function(req, res){
  return res.json(db.getState());
});

//Listing a particular task
  app.get('/tasks/:id', function(req,res){
    var id = req.params.id;
    let a = db.get('posts').find({ id: id });
    if (a) {
        return res.json(a);
      }
      return res.status(404).end();
});


//Update a task
app.put('/tasks/:id', function(req,res){
    var update = req.body.title;
    if (!update || update === undefined){
      res.status(400).end()
    }
    else{
      db.get('posts').find({id : req.params.id}).assign({title : update}).write();
      return res.status(200).end();
    }
    
})

// Delete task
app.delete('/tasks/:id', function(req,res){
    db.get('posts').remove({ id : req.params.id}).write();
    return res.status(200).end();
})

// API server listing port 3000
app.listen(3000, function() {
    console.log('API up and running');
  });

module.exports = app;
