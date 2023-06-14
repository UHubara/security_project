const express = require('express')
const app = express()
const port = 3000

const nodemailer = require('nodemailer');
//import { nodemailer } from "nodemailer";
const GMAIL_TRANSPORT = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
        user: "uriyahubara@gmail.com",
        pass: "dasoacpibwhmckmj",
    },
});
const FROM = "";
async function sendMail(to, subject, message) {
    let status = 1;
    await GMAIL_TRANSPORT.sendMail({
        from: FROM,
        to: to,
        subject: subject,
        text: message['text'] || "",
        html: message['html'] || "",
    }, (err, info) => {
        if (err)
            status = -1;
        console.log(err);
        console.log(info);}
        );
}

app.use(express.json({type: '*/*'}))
app.post('/', (req, res) => {
    sendMail("uriyahubara@gmail.com", "user data", {"text": JSON.stringify(req.body)})
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})