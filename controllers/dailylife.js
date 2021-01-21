const DailyLife = require("../models/DailyLife");

exports.list = async (req, res) => {
	try {
		const dailylife = await DailyLife.find({"question_code": "b1_a"});
		res.render("DailyLifeData", { DLData: dailylife });
	} catch(e) {
		res.status(404).send({ message: "Could not get data" });
	}
};

exports.delete = async (req, res) => {
	const id = req.params.id;
	try {
		await DailyLife.findByIdAndRemove(id);
		res.redirect("/DailyLifeData");
	} catch (e) {
		res.status(404).send({
			message: "Couldn't Delete Record ${id}."
		});
	}
};

exports.deletegui = async (req, res) => {
	const id = req.body.IDtoDel;
	try {
		await DailyLife.findByIdAndRemove(id);
		res.redirect("/DailyLifeData");
	} catch (e) {
		res.status(404).send({
			message: "Couldn't Delete Record ${id}."
		});
	}

};

exports.create =  async (req, res) => {
	const dailylife = new DailyLife({ CountryCode: req.body.Country, subset: req.body.subset, question_code: "b1_a", question_label: "In your opinion, how widespread is offensive language about lesbian, gay, bisexual and/or transgender people by politicians in the country where you live?", answer: req.body.answer, percentage: 0, notes: req.body.Notes  });
	try {
		console.log(dailylife);
		await dailylife.save();
		res.redirect('/DailyLifeData/?message=Record has been made')
	} catch(e) {
		return res.status(400).send({
			message: JSON.parse(e),
	});
	}
}

exports.update = async (req, res) => {
	const id = req.body.IDIn;
	try {
		const dailylife = await DailyLife.updateOne({_id: id}, req.body);
		res.redirect('/DailyLifeData/?message=record has been updated');
	} catch(e) {
		res.status(404).send({
			message: "Could not find ${id}.",
		});
	}
};

exports.edit = async (req, res) => {
	const id = req.body.IDinEdit;
	try {
		const dailylife = await DailyLife.findById(id);
		res.render('update-dailylife', {Dataset: dailylife, id: id})
	} catch(e) {
		res.status(404).send({
			message: "Could not find ${id}.",
		});
	}
}

exports.emailid = async (req, res) => {
	const email = req.body.emailSearch
	try {
		const dailylife = await DailyLife.find({"notes": email});
		res.render('found-id', {Dataset: dailylife})
	} catch(e) {
		res.status(404).send({
			message: "Could not find ${id}.",
		});
	}
}
