import { JogoClass } from "../models/Jogo";
import { TimeClass } from "../models/Time";

describe("Jogo", () => {
  let mandante: TimeClass;
  let visitante: TimeClass;
  let jogo: JogoClass;

  beforeEach(() => {
    mandante = new TimeClass("1", "Flamengo");
    visitante = new TimeClass("2", "Vasco");
    jogo = new JogoClass("jogo-1", mandante, visitante, 1);
  });

  test("deve inicializar com placar zerado e não jogado", () => {
    expect(jogo.golsMandante).toBe(0);
    expect(jogo.golsVisitante).toBe(0);
    expect(jogo.jogado).toBe(false);
  });

  test("deve jogar partida e atualizar estatísticas dos times", () => {
    jogo.jogar(2, 1);

    expect(jogo.golsMandante).toBe(2);
    expect(jogo.golsVisitante).toBe(1);
    expect(jogo.jogado).toBe(true);

    // Verificar estatísticas do mandante (vitória)
    expect(mandante.pontos).toBe(3);
    expect(mandante.vitorias).toBe(1);
    expect(mandante.golsMarcados).toBe(2);
    expect(mandante.golsSofridos).toBe(1);
    expect(mandante.saldoGols).toBe(1);

    // Verificar estatísticas do visitante (derrota)
    expect(visitante.pontos).toBe(0);
    expect(visitante.derrotas).toBe(1);
    expect(visitante.golsMarcados).toBe(1);
    expect(visitante.golsSofridos).toBe(2);
    expect(visitante.saldoGols).toBe(-1);
  });

  test("deve tratar empate corretamente", () => {
    jogo.jogar(1, 1);

    expect(jogo.golsMandante).toBe(1);
    expect(jogo.golsVisitante).toBe(1);
    expect(jogo.jogado).toBe(true);

    // Ambos devem ter 1 ponto e 1 empate
    expect(mandante.pontos).toBe(1);
    expect(mandante.empates).toBe(1);
    expect(visitante.pontos).toBe(1);
    expect(visitante.empates).toBe(1);
  });

  test("deve retornar resultado correto", () => {
    jogo.jogar(2, 1);
    expect(jogo.getResultado()).toBe("Flamengo venceu");

    jogo.jogar(1, 2);
    expect(jogo.getResultado()).toBe("Vasco venceu");

    jogo.jogar(1, 1);
    expect(jogo.getResultado()).toBe("Empate");
  });

  test('deve retornar "Não jogado" quando jogo não foi realizado', () => {
    expect(jogo.getResultado()).toBe("Não jogado");
  });
});
