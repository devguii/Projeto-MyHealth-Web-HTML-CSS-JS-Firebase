import { auth } from "../firebase/config.js"
import {createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js"

const emailMessage = document.getElementById("email-message")
const passwordMessage = document.getElementById("password-message")

const getEmail = () => {
    return document.getElementById("email-input").value
}

const getPassword = () => {
    return document.getElementById("senha-input").value
}

const cadastrarUsuario = () => {
    emailMessage.innerHTML = ''
    passwordMessage.innerHTML = ''

    createUserWithEmailAndPassword(auth, getEmail(), getPassword())
        .then((result) => {
             console.log("usuario cadastrado com sucesso!" + JSON.stringify(result))

             window.location.href = "../pages/entrar.html";

        })
        .catch((error) => {
            console.log("Erro ao cadastrar usuário: " + JSON.stringify(error))

            switch(error.code) {
                case "auth/invalid-email":
                    emailMessage.innerHTML = "Email inválido"
                    break;
                case "auth/weak-password":
                    passwordMessage.innerHTML = "Senha curta"
                    break;    
            }

            if(error.code == "auth/invalid-email") {
                emailMessage.innerHTML = "Email inválido"
            }
        })
}

document
    .getElementById("cadastrar-button")
    .addEventListener("click", () => {
        cadastrarUsuario()
    });

//function irParaEntrar() {
//    window.location.href = "../pages/entrar.html";
//}

