const express = require("express");
const app = express();
const articleRoutes = require("./routes/articleRoutes");




//Midelleware
app.use(express.json());

//Route
app.use("/articles", articleRoutes);

//START SERVER
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
