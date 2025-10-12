const fs = require('fs');
const path = require('path');

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};

const outputPath = path.join(__dirname, '../src/assets/firebase-config.json');
fs.writeFileSync(outputPath, JSON.stringify(firebaseConfig, null, 2));
console.log('Firebase config generated!');
