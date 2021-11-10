const express = require("express")
const router = express.Router();
const Image = require("../models/Image")

router.get("/", async (req, res) => {
	let findOptions = {};
	if (req.body.albumId) {
		findOptions = {
			"albumId": req.body.albumId
		}
	}

	const images = await Image.find(findOptions)
		.sort({ "albumId": 1, "_id": 1 })
		.skip(req.body.skip)
		.limit(req.body.limit);
	res.send(images);
})

router.delete('/:id', async (req, res) => {
	const isDeleted = (await Image.deleteOne({ _id: req.params.id })).deletedCount;
	if (isDeleted) {
		res.status(200);
		res.send({ success: "Image delete!" });
	} else {
		res.status(404);
		res.send({ error: "Image doesn't exist!" });
	}	
})


module.exports = router;