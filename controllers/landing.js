const models = require('../models')

exports.get_landing = function (req, res, next) {
    res.render('landing', { title: 'Albania' });
}

exports.submit_Albanian = function (req, res, next) {
    return models.Albanian.create({
        email: req.body.Albanian_email
    }).then(Albanian => {
        res.redirect('/Albanians')
    })
}

exports.show_Albanians = function (req, res, next) {
    return models.Albanian.findAll().then(Albanians => {
        res.render('landing', { title: 'Albania', Albanians: Albanians });
    })

}

exports.show_Albanian = function (req, res, next) {
    return models.Albanian.findOne({
        where: {
            id : req.params.Albanian_id
        }
    }).then(Albanian => {
        res.render('Albanian', { Albanian: Albanian });
    });
}

exports.show_edit_Albanian = function (req, res, next) {
    return models.Albanian.findOne({
        where: {
            id: req.params.Albanian_id
        }
    }).then(Albanian => {
        res.render('Albanian/edit_Albanian', { Albanian: Albanian });
    });
}

exports.edit_Albanian = function (req, res, next) {
    req.params.Albanian_id
    req.body.Albanian_email
    return models.Albanian.update({
        email:req.body.Albanian_email
    }, {
        where: {
            id:req.params.Albanian_id
        }
    }).then(result => {
        res.redirect('/Albanian/' + req.params.Albanian_id)
    })
}

exports.delete_Albanian = function (req, res, next) {
    return models.Albanian.destroy({
        where: {
            id: req.params.Albanian_id
        }
    }).then(result => {
        res.redirect('/Albanians')
    })
}

exports.delete_Albanian_json = function (req, res, next) {
    return models.Albanian.destroy({
        where: {
            id: req.params.Albanian_id
        }
    }).then(result => {
        res.send({ msg : 'Success'})
    })
}