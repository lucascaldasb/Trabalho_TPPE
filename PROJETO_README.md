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

## 👥 Desenvolvido por

Trabalho desenvolvido para a disciplina TPPE da Universidade de Brasília, implementando todas as funcionalidades solicitadas no trabalho prático sobre o Campeonato Brasileiro Série A.
