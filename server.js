//Load Modules
const dotenv= require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const PORT = 3001

//Connect to MONGODB
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', ()=> {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`);
    
})

//setup app params
app.use(express.urlencoded({ extended: false}))

//option to override POST with DELETE/PUT
app.use(methodOverride("_method"))

//Can use morgan to monitor the terminal, don't have it installed yet.  Use console command [npm i method-override morgan] to install and then uncomment below.
// app.use(morgan("dev"))

const Cheese = require('./models/cheese.js')


//Home Page
app.get("/", async (req,res) => {
    res.render('index.ejs')
})

// GET /cheeses
app.get("/cheeses", async (req, res) => {
    const allCheeses = await Cheese.find();
    //console.log(allFruits); //log to terminal
    res.render("cheeses/index.ejs", { cheeses: allCheeses });
  });

//GET cheeses POST page
app.get("/cheeses/new", (req,res)=>{
    res.render('cheeses/new.ejs')
})

//POST cheeses
app.post("/cheeses", async (req, res) => {
    if (req.body.hasMatured === "on") {
      req.body.hasMatured = true;
    } else {
      req.body.hasMatured = false;
    }
//To push multiple text entries to the tags array we probably....
//make a function that breaks down the text via delimiter and pushes it
//to an array, then we make a foreachloop here (in app.post) that pushes
//to req.body.tags (Try later)
    await Cheese.create(req.body);
    res.redirect('/cheeses')
  });


//Cheese show route
app.get("/cheeses/:cheeseId", async (req,res) =>{
    const clickedCheese = await Cheese.findById(req.params.cheeseId)
    res.render("cheeses/show.ejs", {cheese: clickedCheese})
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
  