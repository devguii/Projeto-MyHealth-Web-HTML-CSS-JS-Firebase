import { auth } from "../firebase/config.js"
import {sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js"

const errorMessage = document.getElementById("error-message")
const confirmMessage = document.getElementById("confirm-message")

const getEmail = () => {
    return document.getElementById("email-input").value
}

const recoverPassword = () => {

    errorMessage.innerHTML = ''
    confirmMessage.innerHTML = ''

    sendPasswordResetEmail(auth, getEmail())
        .then((result) => {
            confirmMessage.innerHTML = "Um email de redefinição de senha foi enviado!"
        })
        .catch((error) =>{
            errorMessage.innerHTML = error.code
        })
}

document
    .getElementById("redefinir-senha-button")
    .addEventListener("click", () => {
        recoverPassword()
    });