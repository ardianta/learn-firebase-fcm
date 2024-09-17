// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyAK6QjHay_zja3_86d8dYHddyvYiT__wsI",
    authDomain: "learn-firebase-fcm.firebaseapp.com",
    projectId: "learn-firebase-fcm",
    storageBucket: "learn-firebase-fcm.appspot.com",
    messagingSenderId: "235265482771",
    appId: "1:235265482771:web:df6f2bcb13bc056b5bdfe6"
};


firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('Received background message ', payload);
    // Customize notification here
});