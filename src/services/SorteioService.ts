import { TimeClass, JogoClass, RodadaClass, CampeonatoClass } from '../models';

export class SorteioService {
  static sortearJogosRodada(times: TimeClass[], numeroRodada: number, campeonato: CampeonatoClass): RodadaClass {
    const rodada = new RodadaClass(numeroRodada);
    const timesDisponiveis = [...times];
    const jogosJaRealizados = new Set<string>();

    // Criar conjunto de jogos já realizados para evitar duplicatas
    campeonato.getTodosJogos().forEach(jogo => {
      const chave1 = `${jogo.mandante.id}-${jogo.visitante.id}`;
      const chave2 = `${jogo.visitante.id}-${jogo.mandante.id}`;
      jogosJaRealizados.add(chave1);
      jogosJaRealizados.add(chave2);
    });

    // Algoritmo de sorteio simples
    while (timesDisponiveis.length >= 2) {
      // Sortear dois times aleatórios
      const indiceMandante = Math.floor(Math.random() * timesDisponiveis.length);
      const mandante = timesDisponiveis.splice(indiceMandante, 1)[0];
      
      const indiceVisitante = Math.floor(Math.random() * timesDisponiveis.length);
      const visitante = timesDisponiveis.splice(indiceVisitante, 1)[0];

      // Verificar se este jogo já foi realizado
      const chaveJogo = `${mandante.id}-${visitante.id}`;
      if (!jogosJaRealizados.has(chaveJogo)) {
        const jogo = new JogoClass(
          `jogo-${numeroRodada}-${rodada.jogos.length + 1}`,
          mandante,
          visitante,
          numeroRodada
        );
        rodada.adicionarJogo(jogo);
        jogosJaRealizados.add(chaveJogo);
        jogosJaRealizados.add(`${visitante.id}-${mandante.id}`);
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
