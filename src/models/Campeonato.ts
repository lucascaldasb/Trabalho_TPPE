import type { Time } from './Time';
import type { Rodada } from './Rodada';
import type { Jogo } from './Jogo';
import { TimeClass } from './Time';

export interface Campeonato {
  times: Time[];
  rodadas: Rodada[];
  nome: string;
  ano: number;
}

export class CampeonatoClass implements Campeonato {
  times: TimeClass[] = [];
  rodadas: Rodada[] = [];
  nome: string;
  ano: number;

  constructor(nome: string, ano: number) {
    this.nome = nome;
    this.ano = ano;
  }

  adicionarTime(time: TimeClass): void {
    this.times.push(time);
  }

  adicionarRodada(rodada: Rodada): void {
    this.rodadas.push(rodada);
  }

  getClassificacao(): TimeClass[] {
    return [...this.times].sort((a, b) => {
      // Primeiro critério: pontos
      if (b.pontos !== a.pontos) {
        return b.pontos - a.pontos;
      }
      
      // Segundo critério: vitórias
      if (b.vitorias !== a.vitorias) {
        return b.vitorias - a.vitorias;
      }
      
      // Terceiro critério: saldo de gols
      if (b.saldoGols !== a.saldoGols) {
        return b.saldoGols - a.saldoGols;
      }
      
      // Quarto critério: gols marcados
      return b.golsMarcados - a.golsMarcados;
    });
  }

  getRodadaAtual(): Rodada | undefined {
    return this.rodadas.find(rodada => !rodada.concluida);
  }

  getRodada(numero: number): Rodada | undefined {
    return this.rodadas.find(rodada => rodada.numero === numero);
  }

  getTime(id: string): TimeClass | undefined {
    return this.times.find(time => time.id === id);
  }

  getTodosJogos(): Jogo[] {
    return this.rodadas.flatMap(rodada => rodada.jogos);
  }

  verificarJogoDuplicado(mandanteId: string, visitanteId: string): boolean {
    return this.getTodosJogos().some(jogo => 
      (jogo.mandante.id === mandanteId && jogo.visitante.id === visitanteId) ||
      (jogo.mandante.id === visitanteId && jogo.visitante.id === mandanteId)
    );
  }
}
