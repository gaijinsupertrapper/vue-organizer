const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const uuid = require("uuid")


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/panel', {useNewUrlParser: true});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

var Panels = require('../models/panel')
var Task = require('../models/task')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req,res) => {
  Panels.find({}, "title", function(err, panels){
    if (err){
      console.log(err)
    } else {
      res.send(panels)
    }
  }).sort("_id")
})

app.post('/', (req,res) => {
  var new_panel = new Panels({
    title: "Panel",
  })
  console.log(new_panel)
  new_panel.save(function(error){
    if(error){
      console.log(error)
    }
    res.send({
      success: true,
      message: "Panel created",
      id: new_panel._id
    })
  })

})

app.get('/panel/:id', (req,res) => {
  console.log(req.params)
  Panels.findById(req.params.id, 'title', function(error, panel) {
    console.log('chekc')
    if (error){
      console.log("error")
      res.status(404)
    }
    console.log(panel)
    if (panel == null){
      res.status(404).send("-1")
      console.log("Not Found")
    } else {
      res.status(200).send(panel)
    }
  })
  console.log('fin')
})

app.get('/panel/:id/tasks', (req,res) => {
  var tasks = Task.find({fromPanel: req.query.panelId}, 'fromPanel description isCompleted',
  function(error,tasks){
    if (error) {
      console.log(error)
    }
    res.status(200).send(tasks)
  }).sort({"_id":-1})
  // console.log(tasks)
  
})

app.post('/panel/:id/new', (req,res) => {
  var new_task = new Task({
    fromPanel: req.body.panelId, 
    description: req.body.description
  })
  new_task.save(function(error){
    if(error){
      console.log(error)
    }
    res.send({
      success: true,
      message: "Task created succesfully"
    })
  })
})

app.put('/panel/:id/', (req,res) => {
  
  var task = Task.findById(req.body.taskId, function(error, task){
    if (error) {
      console.log(error)
    }
    console.log(task)
    task.isCompleted = true
    return task.save()
  
  })
  res.send({
    success: true,
    message: "Task created succesfully"
  })
})

app.listen(process.env.PORT || 8081)