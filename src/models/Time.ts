import { EstatisticasTime } from '../services/EstatisticasTime';

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
  private estatisticas: EstatisticasTime;

  constructor(id: string, nome: string) {
    this.id = id;
    this.nome = nome;
    this.estatisticas = new EstatisticasTime();
  }

  // Getters para manter compatibilidade com a interface Time
  get pontos(): number {
    return this.estatisticas.pontos;
  }

  set pontos(value: number) {
    this.estatisticas.pontos = value;
  }

  get vitorias(): number {
    return this.estatisticas.vitorias;
  }

  set vitorias(value: number) {
    this.estatisticas.vitorias = value;
  }

  get empates(): number {
    return this.estatisticas.empates;
  }

  set empates(value: number) {
    this.estatisticas.empates = value;
  }

  get derrotas(): number {
    return this.estatisticas.derrotas;
  }

  set derrotas(value: number) {
    this.estatisticas.derrotas = value;
  }

  get golsMarcados(): number {
    return this.estatisticas.golsMarcados;
  }

  set golsMarcados(value: number) {
    this.estatisticas.golsMarcados = value;
  }

  get golsSofridos(): number {
    return this.estatisticas.golsSofridos;
  }

  set golsSofridos(value: number) {
    this.estatisticas.golsSofridos = value;
  }

  get saldoGols(): number {
    return this.estatisticas.saldoGols;
  }

  set saldoGols(value: number) {
    this.estatisticas.saldoGols = value;
  }

  atualizarEstatisticas(golsMarcados: number, golsSofridos: number, resultado: 'vitoria' | 'empate' | 'derrota') {
    this.estatisticas.atualizar(golsMarcados, golsSofridos, resultado);
  }

  /**
   * Retorna o objeto de estatísticas para casos onde é necessário acesso direto
   */
  getEstatisticas(): EstatisticasTime {
    return this.estatisticas;
  }
}
