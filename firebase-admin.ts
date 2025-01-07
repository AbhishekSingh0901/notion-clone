import {
  initializeApp,
  getApps,
  getApp,
  App,
  cert,
  ServiceAccount,
} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const serviceKey = {
  type: "service_account",
  project_id: "notion-clone-c93eb",
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: "110062104539548235928",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-4kai1%40notion-clone-c93eb.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

let app: App;

if (getApps().length === 0) {
  app = initializeApp({
    credential: cert(serviceKey as ServiceAccount),
  });
} else {
  app = getApp();
}

const adminDb = getFirestore(app);

export { app as adminApp, adminDb };
