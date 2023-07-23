require('dotenv').config();
const express = require('express');
const webpush = require('web-push');

const app = express();

app.use(express.json());

webpush.setVapidDetails(
    process.env.MAIL_TO,
    process.env.PUBLIC_KEY,
    process.env.PRIVATE_KEY
);

let subscription;

app.get('/public-key', function(req, res) {
    res.send({
        key: process.env.PUBLIC_KEY
    });
});

app.post('/subscription', function(req, res) {
    subscription = req.body.subscription;
    
    // dummy notification, just for example

    const timeoutId = setTimeout(() => {
        webpush.sendNotification(subscription, 'awesome text from the server');
        clearTimeout(timeoutId);
    }, 2000);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Local Server:\thttp://localhost:' + port);
});