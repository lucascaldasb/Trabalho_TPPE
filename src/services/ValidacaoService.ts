import type { Jogo } from '../models';
import type { CampeonatoClass } from '../models';
import { RodadaClass } from '../models/Rodada';

export class ValidacaoService {
  static verificarJogosDuplicados(campeonato: CampeonatoClass): Jogo[] {
    const jogosDuplicados: Jogo[] = [];
    const todosJogos = campeonato.getTodosJogos();
    
    for (let i = 0; i < todosJogos.length; i++) {
      for (let j = i + 1; j < todosJogos.length; j++) {
        const jogo1 = todosJogos[i];
        const jogo2 = todosJogos[j];
        
        if (this.saoJogosIguais(jogo1, jogo2)) {
          jogosDuplicados.push(jogo1, jogo2);
        }
      }
    }
    
    return jogosDuplicados;
  }

  private static saoJogosIguais(jogo1: Jogo, jogo2: Jogo): boolean {
    return jogo1.mandante.id === jogo2.mandante.id && 
           jogo1.visitante.id === jogo2.visitante.id;
  }

  static validarRodadaCompleta(rodada: RodadaClass, totalTimes: number): boolean {
    const timesQueJogaram = new Set<string>();
    
    rodada.jogos.forEach((jogo: Jogo) => {
      timesQueJogaram.add(jogo.mandante.id);
      timesQueJogaram.add(jogo.visitante.id);
    });
    
    return timesQueJogaram.size === totalTimes;
  }

  static validarNumeroJogosRodada(rodada: RodadaClass, totalTimes: number): boolean {
    const jogosEsperados = totalTimes / 2;
    return rodada.jogos.length === jogosEsperados;
  }

  static validarEquilibrioJogos(campeonato: CampeonatoClass): boolean {
    const todosJogos = campeonato.getTodosJogos();
    const jogosPorTime = new Map<string, number>();
    
    todosJogos.forEach(jogo => {
      const mandanteJogos = jogosPorTime.get(jogo.mandante.id) || 0;
      const visitanteJogos = jogosPorTime.get(jogo.visitante.id) || 0;
      
      jogosPorTime.set(jogo.mandante.id, mandanteJogos + 1);
      jogosPorTime.set(jogo.visitante.id, visitanteJogos + 1);
    });
    
    const valores = Array.from(jogosPorTime.values());
    return valores.every(valor => valor === valores[0]);
  }
}
