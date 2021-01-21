const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const express = require("express");
const app = express();

const database = "LGBT";

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static("./"));

const path = require("express");

const dailylifeController = require("./controllers/dailylife");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

mongoose.connect("mongodb://localhost/LGBT", { useNewUrlParser: true});

mongoose.connection.on("error", (err) => { 

	console.error("An Unexpect Error has occured Error Details:" + err);	
	console.log("MongoDB couldn't be connected to. Please ensure your MongoDB client is running and has suffcient permissions\nInternal Error Code:1");
	process.exit();
});

app.get("/", (req, res) => {
	res.render("index");
});

app.get("/DailyLifeData", dailylifeController.list);

app.get("/DailyLifeData/delete/:id", dailylifeController.delete);

app.post("/create-dailylife", dailylifeController.create);

app.post("/delete-gui-dailylife", dailylifeController.deletegui);

app.post("/findid-daily", dailylifeController.emailid);

app.post("/data-toedit-daily", dailylifeController.edit);
app.post("/dataupdate-daily", dailylifeController.update);


app.listen(PORT, () => {
	console.log("Application listening on port ${PORT}");
});
