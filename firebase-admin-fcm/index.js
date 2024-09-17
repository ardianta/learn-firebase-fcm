require("dotenv").config();
const express = require('express')
const app = express()
const port = 3000


const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getMessaging } = require('firebase-admin/messaging');
const fireabase = initializeApp(applicationDefault());

const { google } = require('googleapis');

const PROJECT_ID = 'learn-firebase-fcm';
const HOST = 'fcm.googleapis.com';
const PATH = '/v1/projects/' + PROJECT_ID + '/messages:send';
const MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
const SCOPES = [MESSAGING_SCOPE];

function getAccessToken() {
    return new Promise(function (resolve, reject) {
        const key = require('./learn-firebase-fcm-credential.json');
        const jwtClient = new google.auth.JWT(
            key.client_email,
            null,
            key.private_key,
            SCOPES,
            null
        );
        jwtClient.authorize(function (err, tokens) {
            if (err) {
                reject(err);
                return;
            }
            resolve(tokens.access_token);
        });
    });
}


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/notify', (req, res) => {
    // This registration token comes from the client FCM SDKs.
    const registrationToken = 'eDXf49rmmBo4hHbYd6Vz3m:APA91bHCyt1dy0kgFo6O5tWAGoXIrtHAqs9P1WOmPlDoA0SQkMGSOjI8RXhJOnBAZTXB5JkT0aTqM5vSwTfqDvev-oHvKPW0rFysz8rFlBr1M5LLskxgZeutlG8Iezosce1ay4cdpYl_';

    const content = {
        title: "Hello World",
        viewCount: 1234,
        isDraft: false,
        tags: ["linux", "mac", "windows"]
    }

    const message = {
        notification: {
            title: 'New Message from Petani Kode',
            body: 'Hello World!'
        },
        data: {
            score: '850',
            time: '2:45',
            content: content
        },
        token: registrationToken
    };

    // Send a message to the device corresponding to the provided
    // registration token.
    getMessaging().send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);            
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });


    res.send('Notifications sent!')
})

app.get('/token', async (req, res) => {
    let token = await getAccessToken();
    res.send(`your fcm access token: ${token}`)
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})