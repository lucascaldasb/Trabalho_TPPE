UnB - Universidade de Brasilia  
FCTE - Faculdade de Ciencias e Tecnologias em Engenharias  
TPPE - Técnicas de Programação para Plataformas Emergentes  
---

# Sistema de Campeonato Brasileiro Série A

Trabalho Prático desenvolvido para a disciplina TPPE (Técnicas de Programação para Plataformas Emergentes) da Universidade de Brasília.

## 📋 Descrição

Sistema desenvolvido em React com TypeScript e Jest que simula o Campeonato Brasileiro Série A de 2025, implementando todas as funcionalidades solicitadas no trabalho prático.

## 🚀 Tecnologias Utilizadas

- **React 19** - Framework frontend
- **TypeScript** - Linguagem de programação
- **Vite** - Build tool e bundler
- **Jest** - Framework de testes
- **Yarn** - Gerenciador de pacotes

## ✨ Funcionalidades Implementadas

### 1. Sorteio de Jogos ✅
- Realiza sorteios de jogos para cada rodada
- Garante que todos os times joguem em cada rodada
- Implementa algoritmo de sorteio aleatório

### 2. Validação de Jogos Duplicados ✅
- Verifica se não existem jogos iguais ao longo das rodadas
- Valida completude das rodadas
- Confirma equilíbrio de jogos entre times

### 3. Cálculo de Pontuação e Classificação ✅
- Calcula pontuação conforme regras do futebol:
  - Vitória: 3 pontos
  - Empate: 1 ponto
  - Derrota: 0 pontos
- Atualiza classificação a cada rodada

### 4. Estatísticas Detalhadas ✅
- Número de vitórias, empates e derrotas
- Gols marcados e sofridos
- Saldo de gols
- Estatísticas gerais do campeonato

### 5. Critério de Desempate ✅
- Desempate por número de vitórias
- Desempate por saldo de gols
- Desempate por gols marcados
- Identificação de grupos empatados

## 🧪 Testes

O projeto inclui uma suíte completa de testes com Jest:

- **Time.test.ts** - Testes para o modelo Time
- **Jogo.test.ts** - Testes para o modelo Jogo
- **SorteioService.test.ts** - Testes para o serviço de sorteio
- **ValidacaoService.test.ts** - Testes para o serviço de validação
- **ClassificacaoService.test.ts** - Testes para o serviço de classificação
- **AllTests.test.ts** - Suíte principal que executa todos os testes

### Executar Testes

```bash
# Executar todos os testes
yarn test

# Executar testes em modo watch
yarn test:watch

# Executar testes com cobertura
yarn test:coverage
```

## 🏗️ Estrutura do Projeto

```
src/
├── models/           # Modelos de dados
│   ├── Time.ts      # Classe Time
│   ├── Jogo.ts      # Classe Jogo
│   ├── Rodada.ts    # Classe Rodada
│   ├── Campeonato.ts # Classe Campeonato
│   └── index.ts     # Exports dos modelos
├── services/         # Serviços de negócio
│   ├── SorteioService.ts      # Lógica de sorteio
│   ├── ValidacaoService.ts    # Validações
│   ├── ClassificacaoService.ts # Cálculos de classificação
│   └── index.ts     # Exports dos serviços
├── __tests__/        # Casos de teste
│   ├── Time.test.ts
│   ├── Jogo.test.ts
│   ├── SorteioService.test.ts
│   ├── ValidacaoService.test.ts
│   ├── ClassificacaoService.test.ts
│   └── AllTests.test.ts
├── exemploUso.ts    # Exemplo de uso do sistema
├── App.tsx          # Interface principal
└── App.css          # Estilos da aplicação
```

## 🎮 Como Usar

### Desenvolvimento

```bash
# Instalar dependências
yarn install

# Executar em modo desenvolvimento
yarn dev

# Build para produção
yarn build

# Preview da build
yarn preview
```

### Interface Web

1. Acesse a aplicação no navegador
2. Clique em "Criar Campeonato" para inicializar
3. Use "Simular Próxima Rodada" para jogar rodadas
4. Clique em "Ver Classificação" para ver a tabela
5. Use "Verificar Duplicatas" para validar jogos

### Exemplo Programático

```typescript
import { TimeClass, CampeonatoClass } from './models';
import { SorteioService, ClassificacaoService } from './services';

// Criar times
const times = [
  new TimeClass('1', 'Flamengo'),
  new TimeClass('2', 'Vasco')
];

// Criar campeonato
const campeonato = new CampeonatoClass('Brasileirão', 2025);
times.forEach(time => campeonato.adicionarTime(time));

// Sortear rodadas
const rodadas = SorteioService.sortearTodasRodadas(times);
rodadas.forEach(rodada => campeonato.adicionarRodada(rodada));

// Simular resultados
rodadas[0].jogos.forEach(jogo => {
  jogo.jogar(2, 1); // Flamengo 2 x 1 Vasco
});

// Ver classificação
const classificacao = ClassificacaoService.calcularClassificacao(campeonato);
```

## 📊 Regras do Campeonato

- **20 times** participam do campeonato
- **38 rodadas** no total (turno e returno)
- **Pontuação**: Vitória (3pts), Empate (1pt), Derrota (0pts)
- **Critérios de desempate**:
  1. Pontos
  2. Vitórias
  3. Saldo de gols
  4. Gols marcados

## 🎯 Objetivos Alcançados

- ✅ Desenvolvimento orientado a testes (TDD)
- ✅ Implementação de todas as funcionalidades solicitadas
- ✅ Código bem estruturado e documentado
- ✅ Interface web funcional e responsiva
- ✅ Suíte de testes completa e executável
- ✅ Uso de TypeScript para tipagem estática
- ✅ Arquitetura modular e escalável

----

Trabalho Prático - Valor 40 pontos. 

Enunciado Geral 

* Os trabalho prático será realizado em 3 etapas, com os conteúdos distribuídos
  da seguinte maneira: 
  - Etapa 1: TDD
  - Etapa 2: Refactoring
  - Etapa 3: Design by Contracts (DbC)

* O trabalho deverá ser realizado em grupos de 3 a 5 alunos. 
* Os grupos deverão ser informados através do formulário presente em [link](https://forms.gle/A28odYrQxo7fv19J8).
* A divisão dos pontos do trabalho será a seguinte: 
  - Etapa 1 (TDD): 10 pontos
  - Etapa 2 (Refactoring): 15 pontos
  - Etapa 3 (DbC): 15 pontos

* O trabalho pode ser desenvolvido na linguagem que o grupo desejar, desde que
  haja 

# Cenário da aplicação

O Campeonato Brasileiro Série A de 2025 é disputado por 20 clubes em sistema de pontos corridos, com 38 rodadas ao longo da temporada. Cada rodada representa uma jornada em que todos os clubes jogam uma partida, enfrentando os demais em turno e returno — ou seja, cada equipe joga contra todas as outras duas vezes, uma em casa e outra fora. Ao final das 38 rodadas, o clube que acumular o maior número de pontos será declarado campeão brasileiro.

A pontuação dos times é definida com base no resultado de cada partida: uma vitória concede 3 pontos ao vencedor, um empate concede 1 ponto a cada equipe, e uma derrota não concede nenhum ponto. A soma desses pontos ao longo das rodadas determina a posição de cada clube na tabela de classificação. Além da pontuação, outros indicadores são fundamentais para definir o desempenho e, em casos de empate, o desempate entre os clubes.

O número de vitórias corresponde à quantidade de jogos em que o clube saiu vencedor. Esse critério é o primeiro a ser considerado em caso de empate na pontuação entre dois ou mais clubes. O saldo de gols é calculado subtraindo o número de gols sofridos do número de gols marcados. Por exemplo, se um time marcou 45 gols e sofreu 30, seu saldo de gols é +15. Esse saldo é o segundo critério de desempate. O número de gols marcados, por sua vez, é a soma total de todos os gols que o clube fez ao longo do campeonato, independentemente dos gols sofridos. Esse indicador é usado como terceiro critério de desempate.

Se ainda houver igualdade após esses três critérios, o confronto direto entre os clubes empatados é considerado, mas apenas quando o empate envolve dois clubes. Caso o empate persista, são analisados os cartões vermelhos recebidos (menor número favorece o clube), depois os cartões amarelos, e, por fim, se necessário, realiza-se um sorteio na sede da Confederação Brasileira de Futebol (CBF).

Esses critérios não apenas definem o campeão, mas também determinam os clubes classificados para competições internacionais e os rebaixados para a Série B. Os seis primeiros colocados garantem vaga na Copa Libertadores da América do ano seguinte, enquanto os clubes entre a sétima e a décima segunda posição se classificam para a Copa Sul-Americana. Já os quatro últimos colocados ao final da 38ª rodada são rebaixados para a Série B de 2026.

Assim, a pontuação, o número de vitórias, o saldo de gols e os gols marcados são elementos centrais que não apenas refletem o desempenho esportivo dos clubes, mas também influenciam diretamente seus destinos na temporada.


# Enunciado do Trabalho Prático 1

Considerando o cenário descrito acima, os grupos deverão desenvolver umaa
aplicação que seja capaz de: 
1)  realizar os sorteios de jogos de cada rodada; 
2)  garantir que não existam dois jogos iguais ao longo de todas as rodadas (por jogos iguais entenda jogos com os mesmos times como mandantes e visitantes). 
3)  calcular a pontuação dos times e a classificação a cada rodada, conforme os critérios de pontuação apresentados no enunciado (vitória - 3 pontos, empate - 1 ponto, derrota - 0 pontos). 
4)  calcular os números de  vitórias, gols marcados, gols sofridos, e saldos de gols com base nos resultados dos jogos de cada rodada. 
5)  aplicar o critério de desempate pelo número de vitórias. 

Cada uma dessas funcionalidades deve ser desenvolvida em seu caso de teste
próprio. O conjunto final contendo todos os casos de testes deve ser executado
de uma só vez, através da suíte de testes ``AllTests``.

# Critérios de correção:
- Os sorteios de cada rodada acontecem adequadamente? 
  - Não há repetição de times na rodada?
  - Todos os times estão sorteados na rodada?
- Não há duplicidade de confrontos entre todas as rodadas do campeonato? 
- A pontuação é calculada adequadamente a cada rodada, para cada time, com base nos resultados dos confrontos?
- Os cálculos de vitórias, gols marcados e sofridos, saldo de gols são calculados adequadamente com base nos resultados dos confrontos?
- Dois (ou mais) times de mesma pontuação estão classificados de acordo com o número de vitórias? 

# Data de entrega: 

- ~~22/10/2025~~ 27/10/2025, 16:00hs, via moodle da disciplina. 
