import { TimeClass } from "./Time";

export interface Jogo {
  id: string;
  mandante: TimeClass;
  visitante: TimeClass;
  golsMandante: number;
  golsVisitante: number;
  rodada: number;
  jogado: boolean;
}

export class JogoClass implements Jogo {
  id: string;
  mandante: TimeClass;
  visitante: TimeClass;
  golsMandante: number = 0;
  golsVisitante: number = 0;
  rodada: number;
  jogado: boolean = false;

  constructor(
    id: string,
    mandante: TimeClass,
    visitante: TimeClass,
    rodada: number
  ) {
    this.id = id;
    this.mandante = mandante;
    this.visitante = visitante;
    this.rodada = rodada;
  }

  jogar(golsMandante: number, golsVisitante: number): void {
    this.golsMandante = golsMandante;
    this.golsVisitante = golsVisitante;
    this.jogado = true;

    let resultadoMandante: "vitoria" | "empate" | "derrota";
    let resultadoVisitante: "vitoria" | "empate" | "derrota";

    if (golsMandante > golsVisitante) {
      resultadoMandante = "vitoria";
      resultadoVisitante = "derrota";
    } else if (golsMandante < golsVisitante) {
      resultadoMandante = "derrota";
      resultadoVisitante = "vitoria";
    } else {
      resultadoMandante = "empate";
      resultadoVisitante = "empate";
    }

    this.mandante.atualizarEstatisticas(
      golsMandante,
      golsVisitante,
      resultadoMandante
    );
    this.visitante.atualizarEstatisticas(
      golsVisitante,
      golsMandante,
      resultadoVisitante
    );
  }

  getResultado(): string {
    if (!this.jogado) return "Não jogado";
    if (this.golsMandante > this.golsVisitante)
      return `${this.mandante.nome} venceu`;
    if (this.golsMandante < this.golsVisitante)
      return `${this.visitante.nome} venceu`;
    return "Empate";
  }
}
