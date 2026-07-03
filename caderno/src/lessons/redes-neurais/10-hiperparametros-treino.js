export const blocks = [
  { type: 'h1', text: 'Epoch, Batch e Overfitting' },

  { type: 'p', text: 'Pensa num estudante se preparando pra uma prova usando uma lista de exercícios resolvidos. Ele pode passar pela lista inteira várias vezes — cada passagem completa é uma chance de reforçar o que aprendeu. Mas ele também pode estudar de dois jeitos bem diferentes: resolver um exercício por vez e já corrigir a rota antes do próximo, ou resolver um bloco de vários exercícios de uma vez e só depois olhar no geral onde errou mais.' },
  { type: 'p', text: 'Um problema mais sutil: se esse estudante decorar as respostas exatas da lista de exercícios (em vez de entender o raciocínio por trás), ele vai mandar bem nessa lista específica, mas se sair mal numa prova com questões parecidas, porém diferentes. Treinar uma rede neural tem exatamente esses três ingredientes: quantas vezes repassar os dados, quanto processar de cada vez, e o risco de "decorar" em vez de aprender.' },

  { type: 'h2', text: 'Epoch: uma volta completa pelos dados' },
  { type: 'p', text: 'Uma **epoch** é uma passagem completa pelo dataset de treino inteiro. Depois que o modelo já viu cada exemplo do dataset uma vez e ajustou os pesos (via gradient descent, já visto), isso conta como 1 epoch. Treinar por 300 epochs significa repassar o dataset inteiro 300 vezes, ajustando os pesos um pouquinho a cada passagem.' },
  { type: 'p', text: 'Mais epochs geralmente significam pesos mais refinados — até um certo ponto. Depois desse ponto, treinar por mais epochs para de ajudar (ou passa a atrapalhar, como você vai ver adiante em overfitting).' },

  { type: 'h2', text: 'Batch: processar em lotes, não tudo de uma vez' },
  { type: 'p', text: 'Dentro de cada epoch, calcular o gradiente (já visto) usando o dataset inteiro de uma só vez seria caro e lento, especialmente com datasets grandes. Em vez disso, o dataset é dividido em **batches** — lotes menores. O modelo olha um batch, calcula a loss daquele batch, calcula o gradiente, ajusta os pesos, e passa pro próximo batch. Quando todos os batches acabam, a epoch termina.' },
  { type: 'p', text: 'O tamanho do batch (**batch size**) é uma escolha de projeto, com uma troca clara:' },
  { type: 'list', items: [
    '**Batch grande** (64, 128, ...) — o gradiente calculado é uma estimativa mais estável e confiável (baseada em mais exemplos de uma vez), mas usa mais memória e cada passo de ajuste é mais lento de calcular.',
    '**Batch pequeno** (8, 16, ...) — o gradiente é mais "ruidoso" (baseado em poucos exemplos, pode apontar numa direção só aproximadamente certa), mas os passos são mais rápidos e, às vezes, esse ruído até ajuda o treino a não ficar preso num ajuste ruim.',
    '**Padrão seguro, usado como ponto de partida na maioria dos casos**: 32.',
  ]},

  { type: 'h2', text: 'Overfitting: quando o modelo decora em vez de aprender' },
  { type: 'p', text: 'Você já viu, em Preparar Dados, que os dados são separados em conjuntos de treino, validação e teste — e que o modelo nunca deveria "estudar pelo gabarito" olhando os dados de teste. Isso existe justamente para detectar o problema do estudante que decorou as respostas em vez de entender o padrão.' },
  { type: 'p', text: '**Overfitting** — "decorou os exemplos, não aprendeu o padrão" — acontece quando o modelo se ajusta tão de perto aos dados específicos de treino (incluindo o ruído e as particularidades daquele conjunto exato) que perde a capacidade de generalizar para dados novos, nunca vistos antes. O sinal característico: a loss de treino continua caindo a cada epoch, mas a loss de **validação** (calculada nos dados que o modelo não usa pra ajustar pesos) para de cair, ou pior, volta a subir.' },
  { type: 'p', text: '**Underfitting** é o problema oposto: nem a loss de treino cai o suficiente. O modelo é simples demais (poucos neurônios, poucas camadas) ou não treinou por epochs suficientes pra sequer capturar o padrão geral dos dados — como um estudante que nem chegou a entender o conteúdo básico da lista de exercícios.' },
  { type: 'formal', eq: 'loss_treino ↓  e  loss_validação ↓   → treino saudável\nloss_treino ↓  e  loss_validação ↑   → overfitting\nloss_treino permanece alta            → underfitting', legend: [
    '`loss_treino` — a loss calculada nos dados de treino, a cada epoch',
    '`loss_validação` — a loss calculada nos dados de validação (nunca usados pra ajustar peso), a cada epoch',
    '`↓` — caindo ao longo das epochs; `↑` — subindo',
    'A regra prática de quando parar de treinar: pare quando `loss_validação` parar de cair — continuar treinando depois disso só aumenta o overfitting, sem melhorar o desempenho em dados novos',
  ]},

  { type: 'h2', text: 'Otimizadores que se ajustam sozinhos' },
  { type: 'p', text: 'Você já viu, em Gradient Descent — o Algoritmo Completo, que a taxa de aprendizado controla o tamanho do passo, e que escolher um valor fixo é arriscado: grande demais faz o treino oscilar sem convergir, pequeno demais faz o treino demorar uma eternidade. Otimizadores como o **Adam**, já citados por nome naquela aula, resolvem esse problema ajustando automaticamente o tamanho efetivo do passo — dando passos maiores enquanto o gradiente aponta de forma consistente na mesma direção ao longo de várias atualizações, e passos menores quando o gradiente começa a variar bastante de uma atualização pra outra, sinal de que o treino está perto de um ajuste fino. Isso reduz bastante a necessidade de testar manualmente vários valores fixos de taxa de aprendizado.' },

  { type: 'divider' },
  { type: 'note', text: 'Resumo: epoch = uma volta completa pelo dataset; batch = um pedaço do dataset processado por vez dentro de cada epoch; overfitting = decorou o treino e perdeu a generalização (loss de validação sobe); underfitting = nem aprendeu o padrão básico (loss de treino não cai). Otimizadores adaptativos como Adam ajustam o tamanho do passo sozinhos ao longo do treino. Com esses conceitos, a próxima aula junta tudo num treino de verdade, em código.' },
];
