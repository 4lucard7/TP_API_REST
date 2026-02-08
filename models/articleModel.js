const fs = require("fs");
const path = require("path");

const ArticlesPath = path.join(__dirname, "data", "articles.json");





//FUNCTIONS
function readArticles() {
    if (fs.existsSync(ArticlesPath)) {
        const data = fs.readFileSync(ArticlesPath, "utf-8");
        return JSON.parse(data);
    }
    return [];
}

function writeArticles(articles) {
    fs.writeFileSync(
        ArticlesPath,
        JSON.stringify(articles, null, 2)
    );
}

