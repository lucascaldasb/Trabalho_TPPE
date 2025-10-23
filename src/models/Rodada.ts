import type { Jogo } from './Jogo';

export interface Rodada {
  numero: number;
  jogos: Jogo[];
  concluida: boolean;
}

export class RodadaClass implements Rodada {
  numero: number;
  jogos: Jogo[] = [];
  concluida: boolean = false;

  constructor(numero: number) {
    this.numero = numero;
  }

  adicionarJogo(jogo: Jogo): void {
    this.jogos.push(jogo);
  }

  concluirRodada(): void {
    this.concluida = true;
  }

  getJogosJogados(): Jogo[] {
    return this.jogos.filter(jogo => jogo.jogado);
  }

  getJogosPendentes(): Jogo[] {
    return this.jogos.filter(jogo => !jogo.jogado);
  }
}
