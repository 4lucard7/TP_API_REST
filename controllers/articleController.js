const Article = require("../models/articleModel");


function getAll  (req, res)  {
 res.json(Article.find());
};
function getOne  (req, res)  {
 const item = Article.findById(req.params.id);
 if (!item) return res.status(404).json({ message: "Article not found" });
 res.json(item);
};
function create (req, res)  {
 const newItem = Article.insertOne(req.body);
 res.status(201).json(newItem);
};
function update  (req, res)  {
 const updated = Article.updateOne(req.params.id, req.body);
 if (!updated) return res.status(404).json({ message: "Article not found" });
 res.json(updated);
};
function remove (req, res)  {
 const deleted = Article.deleteOne(req.params.id);
 if (!deleted) return res.status(404).json({ message: "Article not found" });
 res.json({ message: "Article deleted" });
};


module.exports = {
    getAll,
getOne,
create,
update,
remove,
};