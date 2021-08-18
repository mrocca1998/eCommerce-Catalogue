const models = require('../models')

exports.get_landing = function (req, res, next) {
        res.render('landing', { queries: models.Query.findAll() });
}

exports.submit_Query = function (req, res, next) {
    return models.Query.create({
        text: req.body.text,
        quantity: req.body.quantity
    })
}

exports.get_Queries = function (req, res, next) {
    return models.Query.findAll().then(queries => {
        res.json(queries);
    })
}

exports.edit_Query = function (req, res, next) {
    req.params.id
    req.body.text
    req.body.quantity
    return models.Query.update({
        text: req.body.text,
        quantity: req.body.quantity    
        }, {
        where: {
            id:req.params.id
        }
    })
}

exports.delete_Query = function (req, res, next) {
    return models.Query.destroy({
        where: {
            id: req.params.id
        }
    })
}

exports.get_User = function (req, res, next) {
    return models.User.findOne().then(user => {
        res.json(user);
    })
}

exports.submit_User = function (req, res, next) {
    return models.User.create({
        email: req.body.email,
    })
}

exports.edit_User = function (req, res, next) {
    return models.User.update({
        email: req.body.email
    }, {
        where: {
            id: req.params.id
        }
    })
}