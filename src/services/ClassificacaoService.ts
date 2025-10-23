import type { Time, CampeonatoClass} from '../models';
import { TimeClass } from '../models/Time';

export class ClassificacaoService {

  static calcularClassificacao(campeonato: CampeonatoClass): TimeClass[] {
    return campeonato.getClassificacao();
  }

  static calcularClassificacaoAteRodada(campeonato: CampeonatoClass, numeroRodada: number): Time[] {
    // Criar uma cópia dos times para calcular a classificação parcial
    const timesParciais = campeonato.times.map(time => {
      const timeParcial = new TimeClass(time.id, time.nome);
      return timeParcial;
    });

    // Recalcular estatísticas apenas até a rodada especificada
    for (let i = 1; i <= numeroRodada; i++) {
      const rodada = campeonato.getRodada(i);
      if (rodada) {
        rodada.jogos.forEach(jogo => {
          if (jogo.jogado) {
            const mandante = timesParciais.find(t => t.id === jogo.mandante.id);
            const visitante = timesParciais.find(t => t.id === jogo.visitante.id);
            
            if (mandante && visitante) {
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

              mandante.atualizarEstatisticas(jogo.golsMandante, jogo.golsVisitante, resultadoMandante);
              visitante.atualizarEstatisticas(jogo.golsVisitante, jogo.golsMandante, resultadoVisitante);
            }
          }
        });
      }
    }

    // Ordenar pela classificação
    return timesParciais.sort((a, b) => {
      if (b.pontos !== a.pontos) return b.pontos - a.pontos;
      if (b.vitorias !== a.vitorias) return b.vitorias - a.vitorias;
      if (b.saldoGols !== a.saldoGols) return b.saldoGols - a.saldoGols;
      return b.golsMarcados - a.golsMarcados;
    });
  }

  static aplicarDesempatePorVitorias(times: Time[]): Time[] {
    return [...times].sort((a, b) => b.vitorias - a.vitorias);
  }

  static identificarEmpates(classificacao: Time[]): Time[][] {
    const gruposEmpatados: Time[][] = [];
    let grupoAtual: Time[] = [];
    let pontosAtuais = classificacao[0]?.pontos;

    classificacao.forEach(time => {
      if (time.pontos === pontosAtuais) {
        grupoAtual.push(time);
      } else {
        if (grupoAtual.length > 1) {
          gruposEmpatados.push([...grupoAtual]);
        }
        grupoAtual = [time];
        pontosAtuais = time.pontos;
      }
    });

    if (grupoAtual.length > 1) {
      gruposEmpatados.push(grupoAtual);
    }

    return gruposEmpatados;
  }

  static calcularEstatisticasGerais(campeonato: CampeonatoClass) {
    const todosJogos = campeonato.getTodosJogos().filter(jogo => jogo.jogado);
    
    const totalGols = todosJogos.reduce((total, jogo) => 
      total + jogo.golsMandante + jogo.golsVisitante, 0);
    
    const totalVitorias = todosJogos.filter(jogo => 
      jogo.golsMandante !== jogo.golsVisitante).length;
    
    const totalEmpates = todosJogos.filter(jogo => 
      jogo.golsMandante === jogo.golsVisitante).length;

    return {
      totalJogos: todosJogos.length,
      totalGols,
      totalVitorias,
      totalEmpates,
      mediaGolsPorJogo: todosJogos.length > 0 ? totalGols / todosJogos.length : 0
    };
  }
}
