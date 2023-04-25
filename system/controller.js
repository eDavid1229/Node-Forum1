var view = require("./view");
var model = require("./model");

exports.latestPage = function(response)
{
    view.Begin("Legújabb hozzászólások",response);

    model.selectLatestComments(function(comments)
    {
        var content = view.createCommentsBlock(comments, true);
        response.write(content);

        view.end(response);
    });
};
exports.topicPage = function(topicId, response)
{
    var title = model.getTopicTitle(topicId);

    view.Begin(title, response);

        

    model.selectCommentsByTopic(topicId, function(comments)
    {
        var content = view.createCommentsBlock(comments, false);
        response.write(content);

        content = view.createForm();
        response.write(content);

        view.end(response);
    });
};
exports.newCommentHandler = function(topicId, post, response, onReady)
{
    if(post.sender && post.comment)
    {
        model.insertComment(topicId, post.sender, post.comment, function()
        {
            //response.write('<p class="message">Hozzászólás rögzítése megtörtént!</p>');
            onReady();
        });
    }   
    else
    {
        onReady();
    }
};