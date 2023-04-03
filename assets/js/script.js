// função que será executada quando a página for carregada
document.addEventListener("DOMContentLoaded", () => {
  // adicionando um console.log para testar se a função é executada corretamente
  console.log("Página carregada com sucesso!");
});

document
  .getElementById("criar-conta-button")
  .addEventListener("click", irParaCriarConta);

function irParaCriarConta() {
  window.location.href = "../src/criar-conta.html";
}
