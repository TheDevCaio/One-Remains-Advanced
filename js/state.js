import { setup } from "./main.js";

let tabuleiro = [
  '#', '#', 'p', 'p', 'p', '#', '#',
  '#', '#', 'p', 'p', 'p', '#', '#',
  'p', 'p', 'p', 'p', 'p', 'p', 'p',
  'p', 'p', 'p', null, 'p', 'p', 'p',
  'p', 'p', 'p', 'p', 'p', 'p', 'p',
  '#', '#', 'p', 'p', 'p', '#', '#',
  '#', '#', 'p', 'p', 'p', '#','#',
];

export function getTabuleiro() {
  return structuredClone(tabuleiro);
}

export function mover(de, para) {
  const dist = para - de;

  //verifica se a casa de destino está ocupada
  if (tabuleiro[para] !== null) {
    return false;
  }

  //verifica se o movimento é válido (distância igual a 1, 2, 7 ou 14)
  if (Math.abs(dist) !== 1 && Math.abs(dist) !== 2 && Math.abs(dist) !== 7 && Math.abs(dist) !== 14) {
    return false;
  }

  //se uma casa foi pulada na vertical, a casa entre elas vira ('casa-vazia')
  if (Math.abs(dist) === -2 ||Math.abs(dist) === 2 ) {
    const posicaoPulada = dist > 0 ? de + 1 : de - 1;
    tabuleiro[posicaoPulada] = null;
    const casaPulada = document.querySelector(`[data-posicao="${posicaoPulada}"]`);
    casaPulada.classList.add('casa-vazia');
    //remove pedra (mas, não graficamente)
    removerPedra(posicaoPulada);
    //atualiza o jogo conforme está
    atualizarCasa(posicaoPulada);
  }

  //se uma casa foi pulada na horizontal, a casa entre elas vira ('casa-vazia)
  if (Math.abs(dist) === -14 ||Math.abs(dist) === 14 ) {
    const posicaoPulada = dist > 0 ? de + 7 : de - 7;
    tabuleiro[posicaoPulada] = null;
    const casaPulada = document.querySelector(`[data-posicao="${posicaoPulada}"]`);
    casaPulada.classList.add('casa-vazia');
    //remove pedra (mas, não graficamente)
    removerPedra(posicaoPulada);
     //atualiza o jogo conforme está
    atualizarCasa(posicaoPulada);
  }



  // Realiza o movimento
  tabuleiro[para] = tabuleiro[de];
  tabuleiro[de] = null;
  return true;
}

//remove a pedra
export function removerPedra(posicao) {
  tabuleiro[posicao] = null;
}

function atualizarCasa(posicao) {
  const casa = tabuleiro[posicao];
  const eCasa = document.querySelector(`[data-posicao="${posicao}"]`);

  // Removendo qualquer disco existente antes de adicionar um novo
  while (eCasa.firstChild) {
    eCasa.removeChild(eCasa.firstChild);
  }

  if (casa === null) {
    eCasa.classList.add('casa-vazia');
  } else {
    const eDisco = criaDisco(casa, posicao);
    eCasa.appendChild(eDisco);
  }
}