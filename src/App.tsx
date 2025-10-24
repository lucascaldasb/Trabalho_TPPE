import { useState } from 'react'
import { TimeClass, CampeonatoClass, JogoClass, RodadaClass } from './models'
import { ValidacaoService, ClassificacaoService } from './services'
import './App.css'

function App() {
  const [campeonato, setCampeonato] = useState<CampeonatoClass | null>(null)
  const [classificacao, setClassificacao] = useState<TimeClass[]>([])
  const [mensagem, setMensagem] = useState('')

  const criarCampeonato = () => {
    const times = [
      new TimeClass('1', 'Flamengo'),
      new TimeClass('2', 'Vasco'),
      new TimeClass('3', 'Botafogo'),
      new TimeClass('4', 'Fluminense'),
      new TimeClass('5', 'São Paulo'),
      new TimeClass('6', 'Palmeiras'),
      new TimeClass('7', 'Corinthians'),
      new TimeClass('8', 'Santos')
    ]

    const novoCampeonato = new CampeonatoClass('Brasileirão Série A', 2025)
    times.forEach(time => novoCampeonato.adicionarTime(time))

    // Criar apenas 3 rodadas para demonstração
    const rodadas: RodadaClass[] = []
    
    for (let i = 1; i <= 3; i++) {
      const rodada = new RodadaClass(i)
      
      // Criar jogos simples para cada rodada
      if (i === 1) {
        rodada.adicionarJogo(new JogoClass(`jogo-${i}-1`, times[0], times[1], i))
        rodada.adicionarJogo(new JogoClass(`jogo-${i}-2`, times[2], times[3], i))
        rodada.adicionarJogo(new JogoClass(`jogo-${i}-3`, times[4], times[5], i))
        rodada.adicionarJogo(new JogoClass(`jogo-${i}-4`, times[6], times[7], i))
      } else if (i === 2) {
        rodada.adicionarJogo(new JogoClass(`jogo-${i}-1`, times[0], times[2], i))
        rodada.adicionarJogo(new JogoClass(`jogo-${i}-2`, times[1], times[3], i))
        rodada.adicionarJogo(new JogoClass(`jogo-${i}-3`, times[4], times[6], i))
        rodada.adicionarJogo(new JogoClass(`jogo-${i}-4`, times[5], times[7], i))
      } else if (i === 3) {
        rodada.adicionarJogo(new JogoClass(`jogo-${i}-1`, times[0], times[3], i))
        rodada.adicionarJogo(new JogoClass(`jogo-${i}-2`, times[1], times[2], i))
        rodada.adicionarJogo(new JogoClass(`jogo-${i}-3`, times[4], times[7], i))
        rodada.adicionarJogo(new JogoClass(`jogo-${i}-4`, times[5], times[6], i))
      }
      
      rodadas.push(rodada)
      novoCampeonato.adicionarRodada(rodada)
    }

    setCampeonato(novoCampeonato)
    setMensagem(`Campeonato criado com ${times.length} times e ${rodadas.length} rodadas!`)
  }

  const simularRodada = () => {
    if (!campeonato) return

    const rodadaAtual = campeonato.getRodadaAtual()
    if (!rodadaAtual) {
      setMensagem('Todas as rodadas já foram concluídas!')
      return
    }

    // Simular resultados aleatórios
    rodadaAtual.jogos.forEach(jogo => {
      const golsMandante = Math.floor(Math.random() * 4)
      const golsVisitante = Math.floor(Math.random() * 4)
      if (jogo instanceof JogoClass) {
        jogo.jogar(golsMandante, golsVisitante)
      }
    })

    if (rodadaAtual instanceof RodadaClass) {
      rodadaAtual.concluirRodada()
    }
    setCampeonato(campeonato)
    setMensagem(`Rodada ${rodadaAtual.numero} concluída!`)
  }

  const mostrarClassificacao = () => {
    if (!campeonato) return

    const classificacaoAtual = ClassificacaoService.calcularClassificacao(campeonato)
    setClassificacao(classificacaoAtual)
    setMensagem('Classificação atualizada!')
  }

  const verificarDuplicatas = () => {
    if (!campeonato) return

    const duplicatas = ValidacaoService.verificarJogosDuplicados(campeonato)
    setMensagem(`Jogos duplicados encontrados: ${duplicatas.length}`)
  }

  return (
    <div className="app">
      <header>
        <h1>🏆 Sistema de Campeonato Brasileiro</h1>
        <p>Trabalho Prático - TPPE - Desenvolvido com React + TypeScript + Jest</p>
      </header>

      <main>
        <div className="controls">
          <button onClick={criarCampeonato} disabled={!!campeonato}>
            Criar Campeonato
          </button>
          <button onClick={simularRodada} disabled={!campeonato}>
            Simular Próxima Rodada
          </button>
          <button onClick={mostrarClassificacao} disabled={!campeonato}>
            Ver Classificação
          </button>
          <button onClick={verificarDuplicatas} disabled={!campeonato}>
            Verificar Duplicatas
          </button>
        </div>

        {mensagem && (
          <div className="mensagem">
            {mensagem}
          </div>
        )}

        {campeonato && (
          <div className="info-campeonato">
            <h2>{campeonato.nome} {campeonato.ano}</h2>
            <p>Times: {campeonato.times.length} | Rodadas: {campeonato.rodadas.length}</p>
            <p>Rodadas concluídas: {campeonato.rodadas.filter(r => r.concluida).length}</p>
          </div>
        )}

        {classificacao.length > 0 && (
          <div className="classificacao">
            <h2>📊 Classificação</h2>
            <table>
              <thead>
                <tr>
                  <th>Pos</th>
                  <th>Time</th>
                  <th>Pts</th>
                  <th>V</th>
                  <th>E</th>
                  <th>D</th>
                  <th>GP</th>
                  <th>GC</th>
                  <th>SG</th>
                </tr>
              </thead>
              <tbody>
                {classificacao.map((time, index) => (
                  <tr key={time.id}>
                    <td>{index + 1}º</td>
                    <td>{time.nome}</td>
                    <td>{time.pontos}</td>
                    <td>{time.vitorias}</td>
                    <td>{time.empates}</td>
                    <td>{time.derrotas}</td>
                    <td>{time.golsMarcados}</td>
                    <td>{time.golsSofridos}</td>
                    <td>{time.saldoGols}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
