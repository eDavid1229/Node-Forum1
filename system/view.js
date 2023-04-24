var model = require("./model");

exports.createNavigation = function()
{
    var html = '<nav><ul>';
    html += '<li><a href="/">Legújabbak</a></li>';

    var topics = model.getTopics();

    for(var t of topics)
    {
        html += ('<li><a href="/topic/'+ t.id +'">'+ t.title +'</a></li>');
    }
    html += '</ul></nav>';

    return html;
};
exports.createCommentsBlock = function(comments, withTopics)
{
    var html = '<ul>';

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
    var html = `<form action="" method="post">
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