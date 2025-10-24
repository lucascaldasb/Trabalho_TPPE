import { SorteioService } from '../services/SorteioService';
import { TimeClass } from '../models/Time';
import { CampeonatoClass } from '../models/Campeonato';

describe('SorteioService', () => {
  let times: TimeClass[];

  beforeEach(() => {
    times = [
      new TimeClass('1', 'Flamengo'),
      new TimeClass('2', 'Vasco'),
      new TimeClass('3', 'Botafogo'),
      new TimeClass('4', 'Fluminense')
    ];
  });

  test('deve sortear jogos para uma rodada', () => {
    const campeonato = new CampeonatoClass('Brasileirão', 2025);
    times.forEach(time => campeonato.adicionarTime(time));
    
    const rodada = SorteioService.sortearJogosRodada(times, 1, campeonato);
    
    expect(rodada.numero).toBe(1);
    expect(rodada.jogos.length).toBe(2); // 4 times = 2 jogos por rodada
  });

  test('deve garantir que todos os times joguem na rodada', () => {
    const campeonato = new CampeonatoClass('Brasileirão', 2025);
    times.forEach(time => campeonato.adicionarTime(time));
    
    const rodada = SorteioService.sortearJogosRodada(times, 1, campeonato);
    const timesQueJogaram = new Set<string>();
    
    rodada.jogos.forEach(jogo => {
      timesQueJogaram.add(jogo.mandante.id);
      timesQueJogaram.add(jogo.visitante.id);
    });
    
    expect(timesQueJogaram.size).toBe(times.length);
  });

  test('deve evitar jogos duplicados entre rodadas', () => {
    const campeonato = new CampeonatoClass('Brasileirão', 2025);
    times.forEach(time => campeonato.adicionarTime(time));
    
    // Sortear primeira rodada
    const rodada1 = SorteioService.sortearJogosRodada(times, 1, campeonato);
    campeonato.adicionarRodada(rodada1);
    
    // Sortear segunda rodada
    const rodada2 = SorteioService.sortearJogosRodada(times, 2, campeonato);
    
    // Verificar se não há jogos duplicados
    const todosJogos = [...rodada1.jogos, ...rodada2.jogos];
    const jogosDuplicados = new Set<string>();
    
    for (let i = 0; i < todosJogos.length; i++) {
      for (let j = i + 1; j < todosJogos.length; j++) {
        const jogo1 = todosJogos[i];
        const jogo2 = todosJogos[j];
        
        if (jogo1.mandante.id === jogo2.mandante.id && 
            jogo1.visitante.id === jogo2.visitante.id) {
          jogosDuplicados.add(`${jogo1.mandante.id}-${jogo1.visitante.id}`);
        }
      }
    }
    
    expect(jogosDuplicados.size).toBe(0);
  });

  test('deve sortear todas as rodadas do campeonato', () => {
    const rodadas = SorteioService.sortearTodasRodadas(times);
    
    expect(rodadas.length).toBe(38);
    rodadas.forEach((rodada, index) => {
      expect(rodada.numero).toBe(index + 1);
    });
  });

  test('deve verificar completude do campeonato', () => {
    const rodadas = SorteioService.sortearTodasRodadas(times);
    const completude = SorteioService.verificarCompletude(times, rodadas);
    
    expect(completude).toBe(true);
  });
});
