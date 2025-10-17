import { TimeClass } from '../models/Time';

describe('Time', () => {
  let time: TimeClass;

  beforeEach(() => {
    time = new TimeClass('1', 'Flamengo');
  });

  test('deve inicializar com estatísticas zeradas', () => {
    expect(time.pontos).toBe(0);
    expect(time.vitorias).toBe(0);
    expect(time.empates).toBe(0);
    expect(time.derrotas).toBe(0);
    expect(time.golsMarcados).toBe(0);
    expect(time.golsSofridos).toBe(0);
    expect(time.saldoGols).toBe(0);
  });

  test('deve atualizar estatísticas corretamente em caso de vitória', () => {
    time.atualizarEstatisticas(2, 1, 'vitoria');
    
    expect(time.pontos).toBe(3);
    expect(time.vitorias).toBe(1);
    expect(time.golsMarcados).toBe(2);
    expect(time.golsSofridos).toBe(1);
    expect(time.saldoGols).toBe(1);
  });

  test('deve atualizar estatísticas corretamente em caso de empate', () => {
    time.atualizarEstatisticas(1, 1, 'empate');
    
    expect(time.pontos).toBe(1);
    expect(time.empates).toBe(1);
    expect(time.golsMarcados).toBe(1);
    expect(time.golsSofridos).toBe(1);
    expect(time.saldoGols).toBe(0);
  });

  test('deve atualizar estatísticas corretamente em caso de derrota', () => {
    time.atualizarEstatisticas(0, 2, 'derrota');
    
    expect(time.pontos).toBe(0);
    expect(time.derrotas).toBe(1);
    expect(time.golsMarcados).toBe(0);
    expect(time.golsSofridos).toBe(2);
    expect(time.saldoGols).toBe(-2);
  });

  test('deve acumular estatísticas corretamente', () => {
    time.atualizarEstatisticas(2, 1, 'vitoria');
    time.atualizarEstatisticas(1, 1, 'empate');
    time.atualizarEstatisticas(0, 1, 'derrota');
    
    expect(time.pontos).toBe(4); // 3 + 1 + 0
    expect(time.vitorias).toBe(1);
    expect(time.empates).toBe(1);
    expect(time.derrotas).toBe(1);
    expect(time.golsMarcados).toBe(3);
    expect(time.golsSofridos).toBe(3);
    expect(time.saldoGols).toBe(0);
  });
});
