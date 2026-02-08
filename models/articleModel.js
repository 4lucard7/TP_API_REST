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

function find() {
 return readArticles();
}

function findById(id) {
 const data = readArticles();
 return data.find(item => item.id === Number(id));
 }

function insertOne(doc) {
 const data = readArticles();
 const newId = data.length ? data[data.length - 1].id + 1 : 1;
 const newDoc = { id: newId, ...doc };
 data.push(newDoc);
 writeArticles(data);
 return newDoc;
 }

 function updateOne(id, newData) {
 const data = readData();
 const index = data.findIndex(item => item.id === Number(id));
 if (index === -1) return null;
 data[index] = { ...data[index], ...newData };
 writeData(data);
 return data[index];
 }
function deleteOne(id) {
 const data = readData();
 const index = data.findIndex(item => item.id === Number(id));
 if (index === -1) return false;
 data.splice(index, 1);
 writeData(data);
 return true;
}
module.exports = {
 find,
 findById,
 insertOne,
 updateOne,
 deleteOne
}