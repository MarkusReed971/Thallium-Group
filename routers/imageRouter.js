const express = require("express")
const router = express.Router();
const Image = require("../models/Image")


router.get("/albums", async (req, res) => {
	let albumList = await Image.distinct("albumId");
	res.send(albumList);
})

router.get("/:filters", async (req, res) => {
	const filters = JSON.parse(req.params.filters);

	let findOptions = {};
	if (filters.albumId) {
		findOptions = {
			"albumId": filters.albumId
		}
	}

	const imageList = await Image.find(findOptions)
		.sort({ "albumId": 1, "_id": 1 })
		.skip(filters.skip)
		.limit(filters.limit);
	const count = await Image.countDocuments(findOptions);
	res.send({count, imageList});
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