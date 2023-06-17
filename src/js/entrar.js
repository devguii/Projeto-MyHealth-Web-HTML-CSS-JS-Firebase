import { auth } from "../firebase/config.js"
import {signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js"

const emailMessage = document.getElementById("email-message")
const passwordMessage = document.getElementById("password-message")

const getEmail = () => {
    return document.getElementById("email-input").value
}

const getPassword = () => {
    return document.getElementById("senha-input").value
}


const autenticarUsuario = () => {

    emailMessage.innerHTML = ''
    passwordMessage.innerHTML = ''

    signInWithEmailAndPassword(auth, getEmail(), getPassword())
        .then((result) => {
            window.location.href = "../pages/home.html";
        }).catch((error) => {
            console.log("Erro ao cadastrar usuário: " + JSON.stringify(error))

            switch(error.code) {
                case "auth/invalid-email":
                    emailMessage.innerHTML = "Email inválido"
                    break;
                case "auth/weak-password":
                    passwordMessage.innerHTML = "Senha curta"
                    break;
            }
        })
}

document
  .getElementById("entrar-button")
  .addEventListener("click", () => {
    autenticarUsuario()
  });

document
  .getElementById("senha-label")
  .addEventListener("click", irParaRecuperarSenha);

function irParaRecuperarSenha() {
  window.location.href = "../pages/recuperar-senha.html";
}