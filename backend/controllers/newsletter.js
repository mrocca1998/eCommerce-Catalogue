const nodemailer = require("nodemailer");
var html_to_pdf = require('html-pdf-node');
const models = require('../models')

exports.generateNewsletter = async function (user, date) {
    let html = '<p>hi</p><p>hey</p><a href="https://www.w3schools.com">Click Me</a>'
    let file = { content: html, };
    let options = { path: './newsletters/' + user + date + '.pdf'}

    try {
        await html_to_pdf.generatePdf(file, options)
        .then(sendEmail(user, date))
    } catch(e) {
        console.log(e)
    }

}

function sendEmail(user, date) {
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
        to: user,
        subject: 'eCommerce Newsletter',
        text: 'Attached is your custom newsletter. Happy shopping!',
        attachments: [{
            filename: date + 'newsletter.pdf',
            path: './newsletters/'+ user + date + '.pdf',
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