const html = document.querySelector("html");
const focoBtn = document.querySelector(".app__card-button--foco");
const curtoBtn = document.querySelector(".app__card-button--curto");
const longoBtn = document.querySelector(".app__card-button--longo");
const botoes = document.querySelectorAll(".app__card-button");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const tempBtn = document.querySelector("#start-pause");
const iconTempBtn = document.querySelector("#start-pause img");
const labelTempBtn = document.querySelector("#start-pause span");
const inputCheckMusic = document.querySelector("#alternar-musica");
const timerLabel = document.querySelector("#timer");
const musica = new Audio("/sound/luna-rise-part-one.mp3");
const audioPlay = new Audio("/sound/play.wav");
const audioPause = new Audio("/sound/pause.mp3");
const audioBeep = new Audio("/sound/beep.mp3");
musica.loop = true;

let tempoDecorridoEmSegundos = 1500;
let intervalId = null;

inputCheckMusic.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

focoBtn.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 1500;
  alterarContexto("foco");
  focoBtn.classList.add("active");
});

curtoBtn.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 300;
  alterarContexto("descanso-curto");
  curtoBtn.classList.add("active");
});

longoBtn.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 900;
  alterarContexto("descanso-longo");
  longoBtn.classList.add("active");
});

function alterarContexto(contexto) {
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `/img/${contexto}.png`);
  mostrarTimer();
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

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    audioBeep.play();
    alert("Tempo finalizado!");
    zerarContagem();
    tempoDecorridoEmSegundos = 5;
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  mostrarTimer();
};

tempBtn.addEventListener("click", iniciarOuPausarContagem);

function iniciarOuPausarContagem() {
  if (intervalId) {
    audioPause.play();
    zerarContagem();
    return;
  }
  audioPlay.play();
  intervalId = setInterval(contagemRegressiva, 1000);
  labelTempBtn.textContent = "Pausar";
  iconTempBtn.setAttribute("src", "/img/pause.png");
}

function zerarContagem() {
  labelTempBtn.textContent = "Iniciar";
  iconTempBtn.setAttribute("src", "/img/play_arrow.png");
  clearInterval(intervalId);
  intervalId = null;
}

function mostrarTimer() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000);
  timerLabel.innerHTML = `${tempo.toLocaleTimeString("pt-br", {
    minute: "2-digit",
    second: "2-digit",
  })}`;
}
mostrarTimer();
