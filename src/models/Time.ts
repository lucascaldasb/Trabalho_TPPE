export interface Time {
  id: string;
  nome: string;
  pontos: number;
  vitorias: number;
  empates: number;
  derrotas: number;
  golsMarcados: number;
  golsSofridos: number;
  saldoGols: number;
}

export class TimeClass implements Time {
  id: string;
  nome: string;
  pontos: number = 0;
  vitorias: number = 0;
  empates: number = 0;
  derrotas: number = 0;
  golsMarcados: number = 0;
  golsSofridos: number = 0;
  saldoGols: number = 0;

  constructor(id: string, nome: string) {
    this.id = id;
    this.nome = nome;
  }

  atualizarEstatisticas(golsMarcados: number, golsSofridos: number, resultado: 'vitoria' | 'empate' | 'derrota') {
    this.golsMarcados += golsMarcados;
    this.golsSofridos += golsSofridos;
    this.saldoGols = this.golsMarcados - this.golsSofridos;

    switch (resultado) {
      case 'vitoria':
        this.pontos += 3;
        this.vitorias += 1;
        break;
      case 'empate':
        this.pontos += 1;
        this.empates += 1;
        break;
      case 'derrota':
        this.derrotas += 1;
        break;
    }
  }
}
