import { TimeClass, JogoClass, RodadaClass, CampeonatoClass } from '../models';

export class SorteioService {

  static conjuntoJogosRealizados(campeonato: CampeonatoClass): Set<string> {
    const jogosJaRealizados = new Set<string>();
    campeonato.getTodosJogos().forEach(jogo => {
      const chave1 = `${jogo.mandante.id}-${jogo.visitante.id}`;
      const chave2 = `${jogo.visitante.id}-${jogo.mandante.id}`;
      jogosJaRealizados.add(chave1);
      jogosJaRealizados.add(chave2);
    });
    return jogosJaRealizados;
  }

  static sorteiaTimes(times: TimeClass[]): [TimeClass, TimeClass] | null {
    if (times.length < 2) {
      return null;
    }
    const indiceMandante = Math.floor(Math.random() * times.length);
    const mandante = times.splice(indiceMandante, 1)[0];
      
    const indiceVisitante = Math.floor(Math.random() * times.length);
    const visitante = times.splice(indiceVisitante, 1)[0];

    return [mandante, visitante];
  }

  static verificaJogoJaRealizado(mandante: TimeClass, visitante: TimeClass, jogosJaRealizados: Set<string>): [boolean, string] {
    const chave = `${mandante.id}-${visitante.id}`;
    return [jogosJaRealizados.has(chave), chave];
  }

  static registrarJogo(numeroRodada: number, mandante: TimeClass, visitante: TimeClass, rodada: RodadaClass, chave : string, jogosJaRealizados: Set<string> ): void {
    const jogo = new JogoClass(
          `jogo-${numeroRodada}-${rodada.jogos.length + 1}`,
          mandante,
          visitante,
          numeroRodada
        );
        rodada.adicionarJogo(jogo);
        jogosJaRealizados.add(chave);
        jogosJaRealizados.add(`${visitante.id}-${mandante.id}`);
  }

  static sortearJogosRodada(times: TimeClass[], numeroRodada: number, campeonato: CampeonatoClass): RodadaClass {
    const rodada = new RodadaClass(numeroRodada);
    const timesDisponiveis = [...times];
    const jogosJaRealizados = this.conjuntoJogosRealizados(campeonato);

    while (timesDisponiveis.length >= 2) {
      const resultadoSorteio = this.sorteiaTimes(timesDisponiveis);
      if (!resultadoSorteio) {
        break;
      }

      const [mandante, visitante] = resultadoSorteio;
      const [jogoOcorreu, chaveJogo] = this.verificaJogoJaRealizado(mandante, visitante, jogosJaRealizados);

      if (!jogoOcorreu) {
        this.registrarJogo(numeroRodada, mandante, visitante, rodada, chaveJogo, jogosJaRealizados);
      } else {
        // Se o jogo já foi realizado, devolver os times para tentar novamente
        timesDisponiveis.push(mandante, visitante);
        
        // Se não conseguimos formar mais jogos sem duplicatas, parar
        if (timesDisponiveis.length === times.length) {
          break;
        }
      }
    }

    return rodada;
  }

  static sortearTodasRodadas(times: TimeClass[]): RodadaClass[] {
    const campeonato = new CampeonatoClass('Brasileirão', 2025);
    times.forEach(time => campeonato.adicionarTime(time));
    
    const rodadas: RodadaClass[] = [];
    
    for (let i = 1; i <= 38; i++) {
      const rodada = this.sortearJogosRodada(times, i, campeonato);
      campeonato.adicionarRodada(rodada);
      rodadas.push(rodada);
    }
    
    return rodadas;
  }

  static sortearRodadasLimitadas(times: TimeClass[], numeroRodadas: number): RodadaClass[] {
    const campeonato = new CampeonatoClass('Brasileirão', 2025);
    times.forEach(time => campeonato.adicionarTime(time));
    
    const rodadas: RodadaClass[] = [];
    
    for (let i = 1; i <= numeroRodadas; i++) {
      const rodada = this.sortearJogosRodada(times, i, campeonato);
      campeonato.adicionarRodada(rodada);
      rodadas.push(rodada);
    }
    
    return rodadas;
  }

  static verificarCompletude(times: TimeClass[], rodadas: RodadaClass[]): boolean {
    const totalJogosPossiveis = (times.length * (times.length - 1)) / 2;
    const totalJogosRealizados = rodadas.reduce((total, rodada) => total + rodada.jogos.length, 0);
    
    return totalJogosRealizados >= totalJogosPossiveis;
  }
}
