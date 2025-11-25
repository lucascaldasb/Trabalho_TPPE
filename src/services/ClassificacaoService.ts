import type { Time, CampeonatoClass} from '../models';
import { TimeClass } from '../models/Time';
import { ClassificacaoAteRodadaCalculator } from './ClassificacaoAteRodadaCalculator';

// Tipo para desempate que requer apenas algumas propriedades
type TimeParaDesempate = Pick<Time, 'id' | 'nome' | 'pontos' | 'vitorias'>;

export class ClassificacaoService {

  static calcularClassificacao(campeonato: CampeonatoClass): TimeClass[] {
    return campeonato.getClassificacao();
  }

  static calcularClassificacaoAteRodada(campeonato: CampeonatoClass, numeroRodada: number): Time[] {
    const calculator = new ClassificacaoAteRodadaCalculator(campeonato, numeroRodada);
    return calculator.calcular();
  }

  static aplicarDesempatePorVitorias<T extends TimeParaDesempate>(times: T[]): T[] {
    return [...times].sort((a, b) => {
      const vitoriasA = a.vitorias ?? 0;
      const vitoriasB = b.vitorias ?? 0;
      return vitoriasB - vitoriasA;
    });
  }

  static identificarEmpates<T extends Pick<Time, 'pontos'>>(classificacao: T[]): T[][] {
    const gruposEmpatados: T[][] = [];
    let grupoAtual: T[] = [];
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
