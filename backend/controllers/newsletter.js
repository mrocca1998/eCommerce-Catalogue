const nodemailer = require("nodemailer");
const html_to_pdf = require('html-pdf-node');
const models = require('../models');
const SerpApi = require('google-search-results-nodejs')

exports.generateNewsletter = async function (user, date) {
  let search = new SerpApi.GoogleSearch("insert key here")
  models.Query.findAll().then(queries => {
    let html = '<div style="text-align: center; font-family: Arial"><h1>HAPPY SHOPPING!</h1>'
    let j = 0
    queries.forEach(query => {
      search.json({
        tbm: 'shop',
        q: query.text, 
       }, (results) => {
        html += '<h2>' + query.text + '</h2>'
        let listings = results['shopping_results']
        for (let i = 0; i < parseInt(query.quantity); i++) {
          if (i < listings.length) {
            let listing = listings[i];
            html += '<img src="' + listing['thumbnail'] + '" alt="' + query.text + '" height = "200px" width = "200px" />'
            html += '<br/><br/>'
            html += '<a href="' + listing['link'] + '">' + listing['title'] + '</a>'
            html += '<p>' + 'Price: ' + listing['price'] + '</p>'
            html += '<br/>'
          }
        }
        j++
        if (j == queries.length) {
          html += '</div>'
          generatePDF(user, date, html)
        }
       })
    })
  })
}

async function generatePDF(user, date, html) {
  let file = { content: html, };
  console.log(html)
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