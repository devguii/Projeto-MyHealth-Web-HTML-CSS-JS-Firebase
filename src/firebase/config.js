import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBUP9jlMcrd5zW46hyRzJ-t7_on0IF2F8I",
  authDomain: "myhealth-fbef1.firebaseapp.com",
  projectId: "myhealth-fbef1",
  storageBucket: "myhealth-fbef1.appspot.com",
  messagingSenderId: "69742328099",
  appId: "1:69742328099:web:5088a1a4984e61d6d6f496",
  measurementId: "G-CG1CWQTJQP",
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
