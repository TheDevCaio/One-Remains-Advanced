import { getTabuleiro, mover } from "./state.js";

const eTabuleiro = document.querySelector(".tabuleiro");
//const disco = document.querySelector(".disco");

let arrastado = null;

setup();

function comecaArrastar(evento) {
    arrastado = evento.target;
}

function recebeAlgo(evento) {
    if (!arrastado || !evento.target.classList.contains('casa')) {
        return;
    }
    const posDisco = Number(arrastado.dataset.posicao);
    const posCasa = Number(evento.target.dataset.posicao);
    console.log(`tentar mover o disco de ${posDisco} para ${posCasa}`);
    if (mover(posDisco, posCasa)) {
        console.log(`disco foi de ${posDisco} para ${posCasa}`);
        evento.target.appendChild(arrastado);
        arrastado.dataset.posicao = posCasa;
        arrastado = null;
    } else {
        console.log(`Não pode mover o disco de ${posDisco} para ${posCasa}`);
    }
}
function passouPorCima(evento) {
    evento.preventDefault();
}

export function setup() {
    const tabuleiro = getTabuleiro();
    for (let i = 0; i < tabuleiro.length; i++) {
        const casa = tabuleiro[i];
        const eCasa = criaCasa(casa, i);
        eTabuleiro.appendChild(eCasa);
    }
}


function criaCasa(casa, k) {
  const eCasa = document.createElement('div');
  eCasa.dataset.posicao = k;
  eCasa.classList.add('casa');
  eCasa.addEventListener('dragover', passouPorCima);
  eCasa.addEventListener('drop', recebeAlgo);

  //removendo qualquer disco existente antes de adicionar um novo
  while (eCasa.firstChild) {
    eCasa.removeChild(eCasa.firstChild);
  }

  if (casa === null) {
    eCasa.classList.add('casa-vazia');
  } else {
    const eDisco = criaDisco(casa, k);
    eCasa.appendChild(eDisco);
  }

  return eCasa;
}


function criaDisco(casa, k) {
  const eDisco = document.createElement('div');
  eDisco.draggable = true;
  eDisco.dataset.posicao = k;
  eDisco.classList.add('disco');
  eDisco.addEventListener('dragstart', comecaArrastar);

  // Removendo qualquer disco existente antes de adicionar um novo
  while (eDisco.firstChild) {
    eDisco.removeChild(eDisco.firstChild);
  }

  if (casa === 'p') {
    eDisco.classList.add('preto');
  } else {
    eDisco.classList.add('casa-vazia');
  }
  // Removi as pedras brancas
  return eDisco;
}