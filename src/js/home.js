import { auth, db } from "../firebase/config.js"
import { onSnapshot, collection, query } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js"
import { onAuthStateChanged, getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js"

const listaVacinas = document.getElementById("lista-vacina")

window.onload = () => {
  onAuthStateChanged(auth, (user) => {
    consultarVacinas(user.uid)
    document
      .getElementById('search-box')
      .addEventListener('input', (event) => {
        consultarVacinas(user.uid, event.target.value)
      })
  })
}

const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        window.location.href = "../pages/index.html";
      })
      .catch((error) => {
        console.log("Erro ao fazer logout: " + JSON.stringify(error))
      });
}

const consultarVacinas = (userId, vaccineName = undefined) => {

  const q = query(collection(db, `usuarios/${userId}/vacinas`))

    onSnapshot(q, (snapshot) => {
        listaVacinas.innerHTML = ""
        snapshot.forEach((doc) => {
          const {
            name,
            date,
            urlImagem,
            nextDate
          } = doc.data()
          const { id } = doc
            if (vaccineName === undefined) {
              listaVacinas.appendChild(
                CreateCardVacina(
                  id,
                  name,
                  date,
                  urlImagem,
                  nextDate
                )
              )
              return
            }
            if (name.toLowerCase().includes(vaccineName.toLowerCase())) {
              listaVacinas.appendChild(
                CreateCardVacina(
                  id,
                  name,
                  date,
                  urlImagem,
                  nextDate
                )
              );
            }
        })
    })
}

const CreateCardVacina = (id, name, date, urlImagem, nextDate) => {
    const divCard = document.createElement("div")
    divCard.style.cursor = 'pointer'
    divCard.onclick = () => {
      window.location.href = `./editar-vacina.html?id=${id}`
    }

    const labelName = document.createElement("label")
    const labelDate = document.createElement("label")
    const imgVacina = document.createElement("img")
    const labelNextDate = document.createElement("label")

    labelName.innerHTML = name
    labelName.className = "name"
    labelDate.innerHTML = date
    labelDate.className = "date"
    imgVacina.src = urlImagem
    imgVacina.className = "imgVacina"
    labelNextDate.innerHTML = "Próxima dose em: " + nextDate
    labelNextDate.className = "nextDate"

    divCard.appendChild(labelName)
    divCard.appendChild(labelDate)
    divCard.appendChild(imgVacina)
    divCard.appendChild(labelNextDate)

    divCard.className = "card"

    return divCard

}

  document
    .getElementById("minhas-vacinas-button")
    .addEventListener("click", irParaMinhasVacinas);

  function irParaMinhasVacinas() {
    window.location.href = "../pages/home.html";
  }

  document
    .getElementById("logout-button")
    .addEventListener("click", () => {
      logout()
    });

  document
    .getElementById("nova-vacina-button")
    .addEventListener("click", irParaNovaVacina);

  function irParaNovaVacina() {
    window.location.href = "../pages/nova-vacina.html";
  }