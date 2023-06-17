import { auth } from "../firebase/config.js"

const getEmail = () => {
    return document.getElementById("email-input");
}

const getPassword = () => {
    return document.getElementById("senha-input");
}

const cadastrarUsuario = () => {
    console.log("call function cadastrar usuario")
}

document
    .getElementById("cadastrar-button")
    .addEventListener("click", () => {
        cadastrarUsuario()
    });

//function irParaEntrar() {
//    window.location.href = "../pages/entrar.html";
//}

