var model = require("./model");

exports.createNavigation = function()
{
    var html = '<nav><ul>';
    html += '<li><a href="/">Legújabb hosszászólások</a></li>';

    var topics = model.getTopics();

    for(var t of topics)
    {
        html += ('<li><a href="/topic/'+ t.id +'">'+ t.title +'</a></li>');
    }
    html += '</ul></nav><hr>';

    return html;
};
exports.createCommentsBlock = function(comments, withTopics)
{
    var html = '<ul class="comments">';

    for(var c of comments)
    {
        var link = '';

        if(withTopics)
        {
            var title = model.getTopicTitle(c.topic);
            link = `<a href="/topic/${c.topic}">${title}</a>`;
        }
        html += `<li>
                    <strong>${c.sender}</strong>
                    <p>${c.comment}</p>
                    ${link}
                    <span>${c.created}</span>
                </li>`;
    }
    html += '</ul>';

    return html;
};
exports.createForm = function()
{
    var html = `<hr><form action="" method="post">
                <div> 
                    <label for="sender">A neved</label><br>
                    <input type="text" id="sender" name="sender">
                </div>
                <div>
                    <label for="comment">Hozzászólásod</label><br>
                    <textarea name="comment" id="comment"></textarea>
                </div>
                <button name="send">Beküldés</button>
            </form>`;

    return html;
};

exports.Begin = function(title, response)
{
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(`<!DOCTYPE html>
                    <html lang="hu">
                    <head>
                         <meta charset="UTF-8">
                         <meta name="viewport" content="width=device-width, initial-scale=1.0">
                         <title>${title}</title>
                         <link rel="stylesheet" href="/res/style.css">
                    </head>
                    <body>
                    <h1>${title}</h1>`);
   

    var nav = exports.createNavigation();
    response.write(nav);
};
exports.end = function(response)
{
    response.write('</body></html>');
    response.send();    
}