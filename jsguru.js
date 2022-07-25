require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 1337;
const cors = require("cors");

const admin = require("firebase-admin");

const serviceAccount = require("./jsguru-firebase-admin-sdk.json");
var auth = null;
var messaging = null;

app.use(cors());
app.use(express.json());

const jwt = require("jsonwebtoken");

const connectFirebase = () => {
  const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  auth = admin.auth(app);
  messaging = admin.messaging(app);
};
const getAuth = () => {
  return auth;
};

app.get("/send-fcm/:token", (req, res) => {
  // This registration token comes from the client FCM SDKs.
  const registrationToken = req.params.token;
  // TokenMessage > BaseMessage
  // https://firebase.google.com/docs/reference/admin/node/firebase-admin.messaging.basemessage.md#basemessage_interface
  const message = {
    // https://firebase.google.com/docs/reference/admin/node/firebase-admin.messaging.webpushnotification
    // WebpushNotification
    notification: {
      title: "Notification A",
      body: "You have a new message in app jsguru.net",
      image:
        "https://blog.jsguru.net/themes/2022/src/assets/images/2phut-logo.png",
    },
    webpush: {
      notification: {
        title: "Notification A",
        body: "You have a new message in app jsguru.net",
        image:
          "https://blog.jsguru.net/themes/2022/src/assets/images/2phut-logo.png",
        actions: [{ action: "ACTION_A", title: "Open Specific Page" }],
      },
    },
    // A collection of data fields.
    // { [key: string]: string; }
    data: {
      action: "ACTION_A",
      payload: JSON.stringify({
        a: 1,
        b: 2,
      }),
    },
    token: registrationToken,
  };

  // Send a message to the device corresponding to the provided
  // registration token.
  messaging
    .send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log("Successfully sent message:", response);
      res.send(response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
      res.send(error);
    });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/firebaseConfig", (req, res) => {
  const firebaseConfig = {
    ...serviceAccount,
  };
  res.send({ firebaseConfig });
});

app.get("/notification/:userId/:number", (req, res) => {
  const { userId, number } = req.params;

  res.send("Hello World!");
});

app.get("/revoke/:uid", (req, res) => {
  const uid = req.params.uid;
  getAuth()
    .revokeRefreshTokens(uid)
    .then(() => {
      return getAuth().getUser(uid);
    })
    .then((userRecord) => {
      return new Date(userRecord.tokensValidAfterTime).getTime() / 1000;
    })
    .then((timestamp) => {
      console.log(`Tokens revoked at: ${timestamp}`);
    });
  res.send({ uid: req.params.uid });
});

app.post("/login", async (req, res) => {
  const userId = req.body.userId;
  const additionalClaims = {
    premiumAccount: false,
  };
  // const $service_account_email = serviceAccount.client_email;
  // const $now_seconds = parseInt(Date.now() / 1000);
  // const $uid = userId;
  // const payload = {
  //   iss: $service_account_email,
  //   sub: $service_account_email,
  //   aud: "https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit",
  //   iat: $now_seconds,
  //   exp: $now_seconds + 60, // Maximum expiration time is one hour
  //   uid: $uid,
  //   claims: {
  //     premium_account: false,
  //   },
  // };
  // const $privateKey = serviceAccount.private_key;
  // const customToken = jwt.sign(payload, $privateKey, { algorithm: "RS256" });
  // console.log({ customToken });
  // return res.send({ customToken });
  // Custom auth without generate your custom JWT
  await new Promise((resolve) => {
    getAuth()
      .createCustomToken(userId, additionalClaims)
      .then((customToken) => {
        // Send token back to client
        resolve(customToken);
        res.send({
          customToken,
        });
      })
      .catch((error) => {
        res.send({
          customToken: "",
        });
        console.log("Error creating custom token:", error);
      });
  });
});

app.listen(port, () => {
  connectFirebase();
  console.log(`Example app listening at http://localhost:${port}`);
});
