const mongoose = require("mongoose");
const { Schema } = mongoose;

const DailyLifeSchema = new mongoose.Schema(
	{
		CountryCode: String,
		subset: String,
		question_code: String,
		question_label: String,
		answer: String,
		percentage: Number,
		notes: String,
	},
	{timestamps: true}

);

module.exports = mongoose.model("DailyLife", DailyLifeSchema, "DailyLife");
