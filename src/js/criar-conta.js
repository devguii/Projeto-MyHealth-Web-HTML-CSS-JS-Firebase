import { auth, db } from "../firebase/config.js"
import {createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js"
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js"

const emailMessage = document.getElementById("email-message")
const passwordMessage = document.getElementById("password-message")

const getName = () => {
    return document.getElementById("name-input").value
}

const getGender = () => {
    var value = document.getElementsByName('gender');
    for (var radio of value){
    if (radio.checked) {    
        return radio.value
    }
    }}

const getDate = () => {
    return document.getElementById("date-input").value
}

const getEmail = () => {
    return document.getElementById("email-input").value
}

const getPassword = () => {
    return document.getElementById("senha-input").value
}

const cadastrarUsuario = () => {

    createUserWithEmailAndPassword(auth, getEmail(), getPassword())
        .then((result) => {
             console.log("usuario cadastrado com sucesso!" + JSON.stringify(result))

            // Cadastrar o usuário(documento) no Firestore
            const colecao = collection(db, "usuarios")
            const doc = {
                nome: getName(),
                date: getDate(),
                gender: getGender()
            }

            addDoc(colecao, doc)
                .then((retorno) => {
                    console.log("Documento cadastrado com sucesso! " + JSON.stringify(retorno))
                    window.location.href = "../pages/entrar.html";
                })
                .catch((error) => {
                    console.log("Erro ao criar documento: " + JSON.stringify(error))
                })
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
        emailMessage.innerHTML = ''
        passwordMessage.innerHTML = ''
}

document
    .getElementById("cadastrar-button")
    .addEventListener("click", () => {
        cadastrarUsuario()
    });

