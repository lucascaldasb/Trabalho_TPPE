import { ClassificacaoService } from '../services/ClassificacaoService';
import { CampeonatoClass } from '../models/Campeonato';
import { TimeClass } from '../models/Time';
import { JogoClass } from '../models/Jogo';
import { RodadaClass } from '../models/Rodada';

describe('ClassificacaoService', () => {
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

  test('deve calcular classificação corretamente', () => {
    const rodada = new RodadaClass(1);
    
    // Flamengo vence Vasco 2-1
    const jogo1 = new JogoClass('jogo-1', times[0], times[1], 1);
    jogo1.jogar(2, 1);
    rodada.adicionarJogo(jogo1);
    
    // Botafogo empata com Fluminense 1-1
    const jogo2 = new JogoClass('jogo-2', times[2], times[3], 1);
    jogo2.jogar(1, 1);
    rodada.adicionarJogo(jogo2);
    
    campeonato.adicionarRodada(rodada);
    
    const classificacao = ClassificacaoService.calcularClassificacao(campeonato);
    
    // Flamengo deve estar em primeiro (3 pontos)
    expect(classificacao[0].nome).toBe('Flamengo');
    expect(classificacao[0].pontos).toBe(3);
    
    // Botafogo e Fluminense devem estar empatados em segundo (1 ponto cada)
    expect(classificacao[1].pontos).toBe(1);
    expect(classificacao[2].pontos).toBe(1);
    
    // Vasco deve estar em último (0 pontos)
    expect(classificacao[3].nome).toBe('Vasco');
    expect(classificacao[3].pontos).toBe(0);
  });

  test('deve aplicar desempate por vitórias corretamente', () => {
    const timesEmpatados = [
      { ...times[0], pontos: 10, vitorias: 3 },
      { ...times[1], pontos: 10, vitorias: 2 },
      { ...times[2], pontos: 10, vitorias: 4 }
    ];
    
    const classificacao = ClassificacaoService.aplicarDesempatePorVitorias(timesEmpatados);
    
    // Deve ordenar por número de vitórias (maior primeiro)
    expect(classificacao[0].vitorias).toBe(4);
    expect(classificacao[1].vitorias).toBe(3);
    expect(classificacao[2].vitorias).toBe(2);
  });

  test('deve identificar empates corretamente', () => {
    const classificacao = [
      { ...times[0], pontos: 10 },
      { ...times[1], pontos: 10 },
      { ...times[2], pontos: 8 },
      { ...times[3], pontos: 8 }
    ];
    
    const gruposEmpatados = ClassificacaoService.identificarEmpates(classificacao);
    
    expect(gruposEmpatados.length).toBe(2);
    expect(gruposEmpatados[0].length).toBe(2); // Flamengo e Vasco com 10 pontos
    expect(gruposEmpatados[1].length).toBe(2); // Botafogo e Fluminense com 8 pontos
  });

  test('deve calcular classificação até rodada específica', () => {
    const rodada1 = new RodadaClass(1);
    const rodada2 = new RodadaClass(2);
    
    // Rodada 1: Flamengo vence Vasco 2-1
    const jogo1 = new JogoClass('jogo-1', times[0], times[1], 1);
    jogo1.jogar(2, 1);
    rodada1.adicionarJogo(jogo1);
    
    // Rodada 2: Flamengo vence Botafogo 1-0
    const jogo2 = new JogoClass('jogo-2', times[0], times[2], 2);
    jogo2.jogar(1, 0);
    rodada2.adicionarJogo(jogo2);
    
    campeonato.adicionarRodada(rodada1);
    campeonato.adicionarRodada(rodada2);
    
    const classificacaoRodada1 = ClassificacaoService.calcularClassificacaoAteRodada(campeonato, 1);
    const classificacaoRodada2 = ClassificacaoService.calcularClassificacaoAteRodada(campeonato, 2);
    
    // Após rodada 1: Flamengo deve ter 3 pontos
    expect(classificacaoRodada1[0].pontos).toBe(3);
    
    // Após rodada 2: Flamengo deve ter 6 pontos
    expect(classificacaoRodada2[0].pontos).toBe(6);
  });

  test('deve calcular estatísticas gerais do campeonato', () => {
    const rodada = new RodadaClass(1);
    
    const jogo1 = new JogoClass('jogo-1', times[0], times[1], 1);
    jogo1.jogar(2, 1);
    rodada.adicionarJogo(jogo1);
    
    const jogo2 = new JogoClass('jogo-2', times[2], times[3], 1);
    jogo2.jogar(1, 1);
    rodada.adicionarJogo(jogo2);
    
    campeonato.adicionarRodada(rodada);
    
    const estatisticas = ClassificacaoService.calcularEstatisticasGerais(campeonato);
    
    expect(estatisticas.totalJogos).toBe(2);
    expect(estatisticas.totalGols).toBe(5); // 2+1+1+1
    expect(estatisticas.totalVitorias).toBe(1);
    expect(estatisticas.totalEmpates).toBe(1);
    expect(estatisticas.mediaGolsPorJogo).toBe(2.5);
  });
});
