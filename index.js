var express = require("express");
var model = require("./system/model");
var controller = require("./system/controller");

var app = express();

app.get("/", function(request, response)
{
    controller.latestPage(response);
});
app.get("/topic/:id", function(request, response)
{
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
