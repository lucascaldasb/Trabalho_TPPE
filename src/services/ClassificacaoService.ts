import type { Time, CampeonatoClass} from '../models';
import { TimeClass } from '../models/Time';
import { ClassificacaoAteRodadaCalculator } from './ClassificacaoAteRodadaCalculator';

export class ClassificacaoService {

  static calcularClassificacao(campeonato: CampeonatoClass): TimeClass[] {
    return campeonato.getClassificacao();
  }

  static calcularClassificacaoAteRodada(campeonato: CampeonatoClass, numeroRodada: number): Time[] {
    const calculator = new ClassificacaoAteRodadaCalculator(campeonato, numeroRodada);
    return calculator.calcular();
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
