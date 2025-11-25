/**
 * Classe responsável por gerenciar as estatísticas de desempenho de um time.
 * Extraída da classe Time para seguir o princípio de responsabilidade única.
 */
export class EstatisticasTime {
  pontos: number = 0;
  vitorias: number = 0;
  empates: number = 0;
  derrotas: number = 0;
  golsMarcados: number = 0;
  golsSofridos: number = 0;
  saldoGols: number = 0;

  /**
   * Atualiza as estatísticas com base no resultado de um jogo
   * @param golsMarcados - Número de gols marcados pelo time
   * @param golsSofridos - Número de gols sofridos pelo time
   * @param resultado - Resultado do jogo ('vitoria', 'empate' ou 'derrota')
   */
  atualizar(golsMarcados: number, golsSofridos: number, resultado: 'vitoria' | 'empate' | 'derrota'): void {
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

  /**
   * Retorna uma cópia dos dados de estatísticas
   */
  getDados() {
    return {
      pontos: this.pontos,
      vitorias: this.vitorias,
      empates: this.empates,
      derrotas: this.derrotas,
      golsMarcados: this.golsMarcados,
      golsSofridos: this.golsSofridos,
      saldoGols: this.saldoGols
    };
  }
}
