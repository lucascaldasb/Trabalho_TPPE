import { ValidacaoService } from '../services/ValidacaoService';
import { CampeonatoClass } from '../models/Campeonato';
import { TimeClass } from '../models/Time';
import { JogoClass } from '../models/Jogo';
import { RodadaClass } from '../models/Rodada';

describe('ValidacaoService', () => {
  let campeonato: CampeonatoClass;
  let times: TimeClass[];

  beforeEach(() => {
    campeonato = new CampeonatoClass('Brasileirão', 2025);
    times = [
      new TimeClass('1', 'Flamengo'),
      new TimeClass('2', 'Vasco'),
      new TimeClass('3', 'Botafogo'),
      new TimeClass('4', 'Fluminense')
    ];
    times.forEach(time => campeonato.adicionarTime(time));
  });

  test('deve detectar jogos duplicados', () => {
    const rodada1 = new RodadaClass(1);
    const rodada2 = new RodadaClass(2);
    
    // Criar jogos duplicados
    const jogo1 = new JogoClass('jogo-1', times[0], times[1], 1);
    const jogo2 = new JogoClass('jogo-2', times[0], times[1], 2);
    
    rodada1.adicionarJogo(jogo1);
    rodada2.adicionarJogo(jogo2);
    
    campeonato.adicionarRodada(rodada1);
    campeonato.adicionarRodada(rodada2);
    
    const jogosDuplicados = ValidacaoService.verificarJogosDuplicados(campeonato);
    
    expect(jogosDuplicados.length).toBeGreaterThan(0);
  });

  test('deve validar rodada completa', () => {
    const rodada = new RodadaClass(1);
    
    // Adicionar jogos para todos os times
    rodada.adicionarJogo(new JogoClass('jogo-1', times[0], times[1], 1));
    rodada.adicionarJogo(new JogoClass('jogo-2', times[2], times[3], 1));
    
    const rodadaCompleta = ValidacaoService.validarRodadaCompleta(rodada, times.length);
    
    expect(rodadaCompleta).toBe(true);
  });

  test('deve detectar rodada incompleta', () => {
    const rodada = new RodadaClass(1);
    
    // Adicionar apenas um jogo (rodada incompleta)
    rodada.adicionarJogo(new JogoClass('jogo-1', times[0], times[1], 1));
    
    const rodadaCompleta = ValidacaoService.validarRodadaCompleta(rodada, times.length);
    
    expect(rodadaCompleta).toBe(false);
  });

  test('deve validar número correto de jogos por rodada', () => {
    const rodada = new RodadaClass(1);
    
    // Adicionar número correto de jogos (4 times = 2 jogos)
    rodada.adicionarJogo(new JogoClass('jogo-1', times[0], times[1], 1));
    rodada.adicionarJogo(new JogoClass('jogo-2', times[2], times[3], 1));
    
    const numeroCorreto = ValidacaoService.validarNumeroJogosRodada(rodada, times.length);
    
    expect(numeroCorreto).toBe(true);
  });

  test('deve detectar número incorreto de jogos por rodada', () => {
    const rodada = new RodadaClass(1);
    
    // Adicionar apenas um jogo (número incorreto)
    rodada.adicionarJogo(new JogoClass('jogo-1', times[0], times[1], 1));
    
    const numeroCorreto = ValidacaoService.validarNumeroJogosRodada(rodada, times.length);
    
    expect(numeroCorreto).toBe(false);
  });

  test('deve validar equilíbrio de jogos entre times', () => {
    const rodada1 = new RodadaClass(1);
    const rodada2 = new RodadaClass(2);
    
    // Criar jogos equilibrados
    rodada1.adicionarJogo(new JogoClass('jogo-1', times[0], times[1], 1));
    rodada1.adicionarJogo(new JogoClass('jogo-2', times[2], times[3], 1));
    
    rodada2.adicionarJogo(new JogoClass('jogo-3', times[0], times[2], 2));
    rodada2.adicionarJogo(new JogoClass('jogo-4', times[1], times[3], 2));
    
    campeonato.adicionarRodada(rodada1);
    campeonato.adicionarRodada(rodada2);
    
    const equilibrio = ValidacaoService.validarEquilibrioJogos(campeonato);
    
    expect(equilibrio).toBe(true);
  });
});
