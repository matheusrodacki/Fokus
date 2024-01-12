const html = document.querySelector("html");
const focoBtn = document.querySelector(".app__card-button--foco");
const curtoBtn = document.querySelector(".app__card-button--curto");
const longoBtn = document.querySelector(".app__card-button--longo");
const botoes = document.querySelectorAll(".app__card-button");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const inputCheckMusic = document.querySelector("#alternar-musica");
const musica = new Audio("/sound/luna-rise-part-one.mp3");
musica.loop = true;

inputCheckMusic.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

focoBtn.addEventListener("click", () => {
  alterarContexto("foco");
  focoBtn.classList.add("active");
});

curtoBtn.addEventListener("click", () => {
  alterarContexto("descanso-curto");

  curtoBtn.classList.add("active");
});

longoBtn.addEventListener("click", () => {
  alterarContexto("descanso-longo");

  longoBtn.classList.add("active");
});

function alterarContexto(contexto) {
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `/img/${contexto}.png`);
  botoes.forEach((contexto) => {
    contexto.classList.remove("active");
  });

  switch (contexto) {
    case "foco":
      titulo.innerHTML = `Otimize sua produtividade,
      <br />
      <strong class="app__title-strong">mergulhe no que importa.</strong>`;
      break;
    case "descanso-curto":
      titulo.innerHTML = `Que tal dar uma respirada?
    <br />
    <strong class="app__title-strong">Faça uma pausa curta.</strong>`;
      break;
    case "descanso-longo":
      titulo.innerHTML = `Hora de voltar à superfície.
      <br />
      <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
      break;
    default:
      break;
  }
}
