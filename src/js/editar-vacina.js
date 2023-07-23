import { auth, db } from "../firebase/config.js";
import {
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

modal = document.querySelector("dialog");

window.onload = () => {
  const params = new URL(document.location).searchParams;
  const idVaccine = params.get("id");
  onAuthStateChanged(auth, (user) => {
    getVaccine(user.uid, idVaccine);
    document
      .getElementById("confirmar-button")
      .addEventListener("click", () => {
        excluirVacina(user.uid, idVaccine);
      });

    document
      .getElementById("cancelar-button")
      .addEventListener("click", fecharPopUp);

    function fecharPopUp() {
      modal.close();
    }

    document.getElementById("excluir-button").addEventListener("click", () => {
      abrirPopUp();
    });

    function abrirPopUp() {
      modal.showModal();
    }

    document
      .getElementById("minhas-vacinas-button")
      .addEventListener("click", irParaMinhasVacinas);

    document
      .getElementById("logout-button")
      .addEventListener("click", irParaIndex);

    document.getElementById("salvar-button").addEventListener("click", () => {
      alterarVacina(user.uid, idVaccine);
    });
  });
};

const getVaccine = async (userId, vaccineId) => {
  const docRef = doc(db, "usuarios", userId, "vacinas", vaccineId);
  getDoc(docRef).then((doc) => {
    const { date, dose, name, nextDate, urlImagem } = doc.data();
    document.getElementById('date-input').value = date
    document.getElementById('name-input').value = name
    const radioInputs = document.getElementsByClassName('radio-input')
    switch (dose) {
      case '1a. dose':
        radioInputs[0].checked = true
        break;
      case '2a. dose':
        radioInputs[1].checked = true
        break;
      case '3a. dose':
        radioInputs[2].checked = true
        break;
      case 'Reforço':
        radioInputs[3].checked = true
        break;
      case 'Dose única':
        radioInputs[4].checked = true
        break;
    }
    document.getElementById("imgVacina").src = urlImagem
    document.getElementById('next-date-input').value = nextDate
  });
};

const getName = () => {
  return document.getElementById("name-input").value;
};

const getDate = () => {
  return document.getElementById("date-input").value;
};

const getNextDate = () => {
  return document.getElementById("next-date-input").value;
};

const alterarVacina = (userId, vaccineId) => {
  const idUsuario = userId;
  const idVacina = vaccineId;
  const docRef = doc(db, `usuarios/${idUsuario}/vacinas`, idVacina);

  const newDoc = {
    name: getName(),
    date: getDate(),
    nextDate: getNextDate(),
  };

  updateDoc(docRef, newDoc)
    .then((result) => {
      console.log("Vacina alterada com sucesso! " + JSON.stringify(result));
    })
    .catch((error) => {
      console.log("Erro ao editar vacina: " + JSON.stringify(error));
    });
};

const excluirVacina = (userId, vaccineId) => {
  const idUsuario = userId;
  const idVacina = vaccineId;
  const docRef = doc(db, `usuarios/${idUsuario}/vacinas`, idVacina);

  deleteDoc(docRef)
    .then((result) => {
      console.log("Vacina excluída com sucesso! " + JSON.stringify(result));
    })
    .catch((error) => {
      console.log("Erro ao excluir vacina: " + JSON.stringify(error));
    });
};

function irParaMinhasVacinas() {
  window.location.href = "../pages/home.html";
}

function irParaIndex() {
  window.location.href = "../pages/index.html";
}
