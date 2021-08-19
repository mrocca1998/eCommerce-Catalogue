const models = require('../models')
const nodemailer = require("nodemailer");

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

exports.send_newsletter = function (req, res, next) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "ecommercethrowaway@gmail.com",
          pass: "eCommerce!", 
        },
    });
    transporter.sendMail({
        from: 'ecommercethrowaway@gmail.com',
        to: 'mrocca1998@gmail.com',
        subject: 'eCommerce Newsletter',
        text: 'Attached is your custom newsletter. Happy shopping!',
        attachments: [{
            filename: 'newsletter.pdf',
            path: 'C:/Users/mrocc/Downloads/test.pdf',
            contentType: 'application/pdf'
        }],
        function(err, info) {
          if (err) {
            console.error(err);
          } else {
            console.log(info);
          }
        }
      });
}