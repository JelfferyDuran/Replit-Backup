import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, doc, getDoc, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// TODO: replace with your Firebase project configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function checkCode() {
  const code = document.getElementById('vipCode').value.trim();
  const vipStatus = document.getElementById('vipStatus');

  if (!code) {
    vipStatus.textContent = '⛔ Ingresa un código';
    return;
  }

  try {
    const ref = doc(db, 'vipCodes', code);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      vipStatus.textContent = '🔓 Bienvenido al Drop VIP ✨';
    } else {
      vipStatus.textContent = '⛔ Código incorrecto';
    }
  } catch (err) {
    console.error(err);
    vipStatus.textContent = 'Error al verificar el código';
  }
}

export async function sendQuestion() {
  const input = document.getElementById('assistant-input');
  const question = input.value.trim();
  const responseDiv = document.getElementById('assistant-response');

  if (!question) return;

  try {
    await addDoc(collection(db, 'questions'), {
      text: question,
      timestamp: Date.now()
    });
    responseDiv.textContent = 'Thanks for your question! We\'ll get back to you soon.';
    input.value = '';
  } catch (err) {
    console.error(err);
    responseDiv.textContent = 'Error sending question.';
  }
}

// Attach events
window.checkCode = checkCode;

document.getElementById('send-button').addEventListener('click', sendQuestion);

export async function signupNewsletter() {
  const input = document.getElementById('newsletter-email');
  const status = document.getElementById('newsletter-status');
  const email = input && input.value.trim();

  if (!email) {
    status.textContent = 'Please enter an email';
    return;
  }

  try {
    await addDoc(collection(db, 'newsletter'), {
      email,
      timestamp: Date.now()
    });
    status.textContent = 'Subscribed!';
    input.value = '';
  } catch (err) {
    console.error(err);
    status.textContent = 'Error subscribing';
  }
}

const btn = document.getElementById('newsletter-button');
if (btn) btn.addEventListener('click', signupNewsletter);
