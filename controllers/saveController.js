const db = require("../models");

module.exports = {
    findAll: function(req, res) {
        db.Saved
        .find({ username: req.user.username })
        .sort({ date: -1 })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    findAndUpdate: function(req, res) {
        if (!req.user) return res.status(401).end('user isnt authenticated')

        db.User
        .findByIdAndUpdate({_id: req.user._id}, {$push: { saved: req.params.id}}, { new: true})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        if (!req.user) return res.status(401).end('user isnt authenticated')
        db.Saved
        .create({ username: req.user.username, reco_name: req.body.title, reco_pic: req.body.pic, reco_link: req.body.link, reco_description: req.body.description, reco_keywords: req.body.keywords, reco_date: req.body.date })
        .then(({ _id }) => db.User.findOneAndUpdate({ _id: req.user._id }, { $push: { saved: _id } }, { new: true }))
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
}