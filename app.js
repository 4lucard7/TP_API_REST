const express = require("express");
const app = express();

const port = 3000;



// middleware
app.use(express.json());



//ROUTES

// GET all articles
app.get("/articles", (req, res) => {
    const articles = readArticles();
    res.status(200).json(articles);
});

// GET article by id
app.get("/articles/:id", (req, res) => {
    const articles = readArticles();
    const id = parseInt(req.params.id);

    const article = articles.find(a => a.id === id);

    if (!article) {
        return res.status(404).json({ message: "No article found" });
    }

    res.status(200).json(article);
});

// POST new article
app.post("/articles", (req, res) => {
    const articles = readArticles();

    const article = {
        id: articles.length + 1,
        title: req.body.title,
        content: req.body.content
    };

    articles.push(article);
    writeArticles(articles);

    res.status(201).json(article);
});

// PUT update article
app.put("/articles/:id", (req, res) => {
    const articles = readArticles();
    const id = parseInt(req.params.id);

    const index = articles.findIndex(a => a.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Article not found" });
    }

    articles[index].title = req.body.title;
    articles[index].content = req.body.content;

    writeArticles(articles);
    res.status(200).json(articles[index]);
});

// DELETE article
app.delete("/articles/:id", (req, res) => {
    const articles = readArticles();
    const id = parseInt(req.params.id);

    const filtered = articles.filter(a => a.id !== id);

    if (filtered.length === articles.length) {
        return res.status(404).json({ message: "Article not found" });
    }

    writeArticles(filtered);
    res.status(200).json({ message: "Article deleted" });
});


//START SERVER

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
