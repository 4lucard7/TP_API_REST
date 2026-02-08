const express = require("express");
const app = express();
const articleRoutes = require("./routes/articleRoutes");
const adminRouter = express.Router();



const port = 3000;



//Midelleware

// Define middleware functions as variables so they can be referenced
const mw1 = (req, res, next) =>{
    console.log("mw1 start");
    next();
    console.log("mw1 end");
}

const mw2 = (req, res, next) =>{
    console.log("mw2 start");
    next();
    console.log("mw2 end");
}

const mw3 = (req, res, next) =>{
    console.log("mw3 start");
    next();
    console.log("mw3 end");
}

app.use(mw1);
app.use(mw2);
app.use(mw3);

// before express.json()
app.post("/body-test-before", (req, res) => {
    console.log("before json:", req.body); 
    res.send("check console");
});
// after express.json()
app.use(express.json());

app.post("/body-test-after", (req,res) => {
    console.log(`after json: ${req.body}`);

})

//logger
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] : ${req.method} ${req.protocol}://${req.get("host")} ${req.originalUrl}`)
    next();
});


app.get('/test', (req, res) => 
    res.send('OK')
)
app.use((req, res, next) => { 
    console.log('A');
    next() 
})
app.use((req, res) => { 
    console.log('B') 
})

//AUTH MIDDLEWARE
function auth(req, res, next) {
    const token = req.header["x-auth"];
    if(token !== "secret"){
        return res.status(401).json({ error: "unauthorized" });
    }
    next();
}
//test AUTH MIDDLEWARE
app.get("/testAuth", auth, (req,res) => {
    res.status(200).json({message : "hello me!"})
})


//Route
app.use("/articles", articleRoutes);

app.get("/ping", (req, res) => {
    res.status(200).json({ok : true})
})

//Pouter Admin
adminRouter.use((req, res, next) => {
    console.log("admin middleware");
    next();
});

adminRouter.get("/dashboard", (req, res) => {
    res.send("admin dashboard");
});

app.use("/admin", adminRouter);

//a lot of midd in one route
const handler = (req, res) => {
    res.send("data received");
};

app.post('/data', mw1, mw2, mw3, handler)










// 404
app.use((req, res) => {
    res.status(404).json({ error: "Not Found" });
});



//START SERVER
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
