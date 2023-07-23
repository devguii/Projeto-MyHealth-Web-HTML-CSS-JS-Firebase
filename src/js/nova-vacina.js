import { auth, db, storage } from "../firebase/config.js"
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js"
import { uploadBytes, getDownloadURL, ref } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-storage.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js"

let file;

window.onload = () => {
    onAuthStateChanged(auth, (user) => {
        document
            .getElementById("cadastrar-button")
            .addEventListener("click", () => {
                cadastrarVacina(user.uid)
            })
    })
}


const getName = () => {
    return document.getElementById("name-input").value
}

const getDate = () => {
    return document.getElementById("date-input").value
}

const getDose = () => {
    var value = document.getElementsByName('dose');
    for (var radio of value){
    if (radio.checked) {    
        return radio.value
    }
    }
}


const getNextDate = () => {
    return document.getElementById("next-date-input").value
}

const cadastrarVacina = (userId) => {
    const colecao = collection(db, `usuarios/${userId}/vacinas`)

    const imageRef = ref(storage, "imagens/vacina.jpg") 

    uploadBytes(imageRef, file)
        .then((result) => {
            console.log("Arquivo enviado com sucesso!" + JSON.stringify(result))
            getDownloadURL(imageRef)
                .then((url) => {
                    const doc = {
                        name: getName(),
                        date: getDate(),
                        dose: getDose(),
                        nextDate: getNextDate(),
                        urlImagem: url
                    }

                    const resultPage = document.getElementById("result")

                    addDoc(colecao, doc)
                        .then((result) => {
                            console.log("Vacina cadastrada com sucesso!" + JSON.stringify(result))
                            resultPage.innerHTML = "Vacina cadastrada com sucesso!"

                        })
                        .catch((error) => {
                            console.log("Erro ao cadastrar vacina:" +    JSON.stringify(error))
                            resultPage.innerHTML = "Erro ao cadastrar vacina!"
                        })

                })
        })
        .catch((error) => {
            console.log("Erro ao enviar arquivo: " + JSON.stringify(error))
        })

    

}
document
    .getElementById("select-image-input")
    .addEventListener("change", (event) => {
        file = event.target.files[0]
        document.getElementById("imgVacina").src = URL.createObjectURL(file)
    })

    document
    .getElementById("minhas-vacinas-button")
    .addEventListener("click", () => {
        window.location.href = "../pages/home.html";
    })

    document
    .getElementById("logout-button")
    .addEventListener("click", () => {
        window.location.href = "../pages/index.html";
    })

