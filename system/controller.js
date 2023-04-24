var view = require("./view");
var model = require("./model");

exports.latestPage = function(response)
{
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write('<meta charset="utf-8">');
    response.write('<h1>Legújabbak</h1>');

    var nav = view.createNavigation();
    response.write(nav);

    model.selectLatestComments(function(comments)
    {
        var content = view.createCommentsBlock(comments, true);
        response.write(content);

        response.send();
    });
};
exports.topicPage = function(topicId, response)
{
    var title = model.getTopicTitle(topicId);

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write('<meta charset="utf-8">');
    response.write('<h1>'+ title +'</h1>');

    var nav = view.createNavigation();
    response.write(nav);

    model.selectCommentsByTopic(topicId, function(comments)
    {
        var content = view.createCommentsBlock(comments, false);
        response.write(content);

        content = view.createForm();
        response.write(content);

        response.send();
    });
};
exports.newCommentHandler = function(topicId, post, response, onReady)
{
    model.insertComment(topicId, post.sender, post.comment, function()
    {
        //response.write('<p class="message">Hozzászólás rögzítése megtörtént!</p>');
        onReady();
    });
};