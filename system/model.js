var mysql = require("mysql");
var db = mysql.createConnection({
    host : "localhost",
    user: "root",
    password: "mysql",
    database: "node_db"
});

const topics = 
[
    {
        id: 1,
        title: "Programozás NodeJS-ben"
    },
    {
        id: 2,
        title: "Kliens-szerver architektúra"
    },
    {
        id: 3,
        title: "Weblapkészítés"
    }
];

exports.getTopics = function()
{
    return topics;
};
exports.getTopicTitle = function(id)
{
    var topic = topics.find(elem => elem.id == id);
    return topic.title;
};
exports.init = function(onReady)
{
    db.connect(function(error)
    {
        if(!error)
        {
            onReady();
        }
    });
};
exports.close = function()
{
    db.end();
};
exports.insertComment = function(topic, sender, comment, onReady)
{
    var sql = "INSERT INTO forum VALUES (NULL, ?, ?, ?, NOW(), 1);";
    var values = [topic, sender, comment];

    db.query(sql, values, onReady);
};
exports.selectCommentsByTopic = function(topic, onReady)
{
    var sql = "SELECT * FROM forum WHERE topic = ? AND status = 1 ORDER BY created DESC";
    var values = [topic];

    db.query(sql, values, function(error, result)
    {
        onReady(result);
    });
};
exports.selectLatestComments = function(onReady)
{
    var sql = "SELECT * FROM forum WHERE status = 1 ORDER BY created DESC LIMIT 3";

    db.query(sql, function(error, result)
    {
        onReady(result);
    });
};