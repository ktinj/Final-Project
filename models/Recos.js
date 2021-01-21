
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recosSchema = new Schema({
	username: { type: String},
	reco_name: { type: String},
	reco_pic: {type: mongoose.Types.ObjectId, ref: "Image"},
	reco_link: { type:String, trim: true },
	reco_description: { type: String, trim: true },
	reco_keywords: { type: String, trim: true },
	date: { type: Date, default: Date.now },
});

const Recos = mongoose.model("Recos", recosSchema);

module.exports = Recos;
