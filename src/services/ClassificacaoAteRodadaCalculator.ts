import type { Time, CampeonatoClass} from '../models';
import { TimeClass } from '../models/Time';

export class ClassificacaoAteRodadaCalculator {
  private campeonato: CampeonatoClass;
  private numeroRodada: number;
  private timesParciais: TimeClass[];

  constructor(campeonato: CampeonatoClass, numeroRodada: number) {
    this.campeonato = campeonato;
    this.numeroRodada = numeroRodada;
    this.timesParciais = [];
  }

  calcular(): Time[] {
    this.criarTimesParciais();
    this.recalcularEstatisticasAteRodada();
    return this.ordenarPorClassificacao();
  }

  private criarTimesParciais(): void {
    this.timesParciais = this.campeonato.times.map(time => {
      const timeParcial = new TimeClass(time.id, time.nome);
      return timeParcial;
    });
  }

  private recalcularEstatisticasAteRodada(): void {
    for (let i = 1; i <= this.numeroRodada; i++) {
      const rodada = this.campeonato.getRodada(i);
      if (rodada) {
        this.processarJogosRodada(rodada);
      }
    }
  }

  private processarJogosRodada(rodada: any): void {
    rodada.jogos.forEach((jogo: any) => {
      if (jogo.jogado) {
        this.atualizarEstatisticasJogo(jogo);
      }
    });
  }

  private atualizarEstatisticasJogo(jogo: any): void {
    const mandante = this.timesParciais.find(t => t.id === jogo.mandante.id);
    const visitante = this.timesParciais.find(t => t.id === jogo.visitante.id);
    
    if (mandante && visitante) {
      const { resultadoMandante, resultadoVisitante } = this.determinarResultados(jogo);
      mandante.atualizarEstatisticas(jogo.golsMandante, jogo.golsVisitante, resultadoMandante);
      visitante.atualizarEstatisticas(jogo.golsVisitante, jogo.golsMandante, resultadoVisitante);
    }
  }

  private determinarResultados(jogo: any): { resultadoMandante: 'vitoria' | 'empate' | 'derrota', resultadoVisitante: 'vitoria' | 'empate' | 'derrota' } {
    let resultadoMandante: 'vitoria' | 'empate' | 'derrota';
    let resultadoVisitante: 'vitoria' | 'empate' | 'derrota';

    if (jogo.golsMandante > jogo.golsVisitante) {
      resultadoMandante = 'vitoria';
      resultadoVisitante = 'derrota';
    } else if (jogo.golsMandante < jogo.golsVisitante) {
      resultadoMandante = 'derrota';
      resultadoVisitante = 'vitoria';
    } else {
      resultadoMandante = 'empate';
      resultadoVisitante = 'empate';
    }

    return { resultadoMandante, resultadoVisitante };
  }

  private ordenarPorClassificacao(): Time[] {
    return this.timesParciais.sort((a, b) => {
      if (b.pontos !== a.pontos) return b.pontos - a.pontos;
      if (b.vitorias !== a.vitorias) return b.vitorias - a.vitorias;
      if (b.saldoGols !== a.saldoGols) return b.saldoGols - a.saldoGols;
      return b.golsMarcados - a.golsMarcados;
    });
  }
}