const express = require('express');
const nodemailer = require('nodemailer');
const Router = express.Router();
Router.get('/', function(req, res, next){
    res.send('ok')
})
Router.post('/',(req, res, next)=>{
    // create reusable transporter object using the default SMTP transport
    console.log( req.body );
    let transporter = nodemailer.createTransport({
        host: 'smtp.umbler.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env._MAIL_USER,
            pass: process.env._MAIL_PASS
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: 'contato@isaiasfrancisco.com.br', // sender address
        to: 'isaias.fran@gmail.com', // list of receivers
        subject: req.body.name + ' : ' +  req.body.email, // Subject line
        text: req.body.msg, // plain text body
        html: req.body.msg // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.send({err: "Errro"});
            return console.log(error);            
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.send({msg: info});

    });
})

module.exports = Router;


