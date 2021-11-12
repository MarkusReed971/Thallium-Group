const express = require('express');
const mongoose = require("mongoose");
const imageRouter = require("./routers/imageRouter");
const cors = require("cors");

const PORT = 3001;

mongoose
	.connect("mongodb+srv://admin:1234ewq@cluster0.lqycm.mongodb.net/thallium_group_db?retryWrites=true&w=majority", { useNewUrlParser: true })
	.then(() => {
		const app = express();
		app.use(cors())
        app.use(express.json())
        app.use("/images", imageRouter);

		app.listen(PORT, () => {
			console.log(`localhost:${PORT} has started!`)
		})
	})