/*
npm install -g forever
forever start index.js
forever start -w index.js
forever start -w-o log.txt index.js
forever list 
forever stop index.js

var process = require("process");
console.log(process.pid); */

var express = require("express");
var model = require("./system/model");
var controller = require("./system/controller");

var app = express();
app.use(express.static("static"));

app.get("/", function(request, response)
{
    console.log("Home");
    controller.latestPage(response);
});
app.get("/topic/:id", function(request, response)
{
    console.log("Topic", request.params.id);
    var topic = parseInt(request.params.id);
    controller.topicPage(topic, response);
});

var bodyParser = require("body-parser");
var postParser = bodyParser.urlencoded({extended: false});
app.post("/topic/:id", postParser, function(request, response)
{
    var topic = parseInt(request.params.id);
    var body = request.body;

    controller.newCommentHandler(topic, body, response, function()
    {
        controller.topicPage(topic, response);
    });
});

app.listen(8080);

