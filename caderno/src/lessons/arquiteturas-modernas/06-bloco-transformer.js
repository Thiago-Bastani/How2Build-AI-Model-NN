export const blocks = [
  { type: 'h1', text: 'O Bloco Transformer' },

  { type: 'p', text: 'Imagine uma linha de montagem onde cada estação faz duas coisas: primeiro, os trabalhadores da estação conversam entre si comparando notas sobre a peça que estão montando (isso é a atenção — cada palavra "conversando" com as outras); depois, cada trabalhador processa individualmente o que aprendeu dessa conversa, refinando sua própria parte do trabalho (isso é uma rede densa comum, processando cada palavra separadamente). Essa estação completa — conversa em grupo, seguida de processamento individual — é repetida várias vezes em sequência, cada repetição refinando um pouco mais o entendimento.' },
  { type: 'p', text: 'Essa "estação completa" é o **bloco Transformer**: multi-head attention seguida de uma rede densa (a mesma MLP que você já construiu inteira, na trilha de Redes Neurais), empilhados um atrás do outro várias vezes.' },

  { type: 'h2', text: 'As duas metades de um bloco' },
  { type: 'list', items: [
    '**Multi-head attention** — cada palavra atualiza sua representação misturando informação das outras palavras relevantes (já visto nas duas aulas anteriores).',
    '**Feed-forward network (FFN)** — depois da atenção, cada palavra passa, individualmente e sem olhar pras outras, por uma rede densa comum: normalmente duas camadas, a primeira expandindo a dimensão com ativação (ReLU ou GELU, já visto em Funções de Ativação), a segunda voltando ao tamanho original. É literalmente um MLP pequeno, igual ao que você já treinou, aplicado à representação de cada palavra.',
  ]},
  { type: 'p', text: 'A atenção mistura informação **entre** palavras; a FFN processa cada palavra **individualmente**, mas com mais capacidade de transformação não-linear do que a atenção sozinha oferece. As duas juntas, alternadas, é o que dá ao Transformer seu poder.' },

  { type: 'h2', text: 'Conexões residuais: um atalho para o gradiente' },
  { type: 'p', text: 'Você já viu, na aula de Backpropagation, que o gradiente precisa atravessar a regra da cadeia camada por camada, voltando da saída até a entrada. Num Transformer com dezenas de blocos empilhados, esse caminho fica muito longo — e gradientes que atravessam muitas multiplicações em sequência tendem a encolher até quase sumir (ou, mais raramente, explodir), fazendo as primeiras camadas aprenderem devagar demais ou nada.' },
  { type: 'p', text: 'A solução usada em cada sub-camada do bloco (tanto na atenção quanto na FFN) é somar a entrada original de volta à saída daquela sub-camada, em vez de deixar só a saída transformada seguir adiante: `saída = entrada + Sublayer(entrada)`. Esse atalho — chamado **conexão residual** — dá ao gradiente um caminho direto de volta, sem precisar atravessar toda a transformação, o que mantém o treino estável mesmo com muitos blocos empilhados.' },

  { type: 'h2', text: 'Layer normalization: reajustando a escala' },
  { type: 'p', text: 'Você já viu, em Média/Variância/Desvio-Padrão, como centralizar e reescalar um conjunto de números usando a média e o desvio-padrão. **Layer normalization** faz exatamente essa mesma operação, mas aplicada aos números que saem de cada sub-camada do bloco, pra cada palavra individualmente — recentraliza e reescala esses valores antes de seguirem para a próxima etapa. Isso evita que os números cresçam ou encolham descontroladamente conforme atravessam blocos empilhados, mantendo o treino estável, exatamente pela mesma razão que normalizar os dados de entrada (já visto em Preparar Dados) ajuda o treino desde o início.' },

  { type: 'note', text: 'Resumo: um bloco Transformer = multi-head attention (mistura informação entre palavras) + feed-forward network (processa cada palavra individualmente, é um MLP comum) — cada uma envolvida por uma conexão residual (atalho que soma a entrada de volta, protegendo o gradiente) e seguida de layer normalization (reescala os números, estabilizando o treino). Vários desses blocos são empilhados em sequência para formar o modelo completo.' },
];
