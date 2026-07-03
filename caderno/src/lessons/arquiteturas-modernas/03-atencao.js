export const blocks = [
  { type: 'h1', text: 'Atenção' },
  { type: 'p', text: 'Imagine uma biblioteca enorme. Você chega com uma pergunta na cabeça — digamos, "livros sobre o oceano Pacífico". Essa pergunta é a sua **busca**. Cada livro na estante tem uma etiqueta na lombada resumindo do que ele trata — "geografia da Ásia", "história naval", "receitas culinárias", "correntes marítimas". Você compara sua busca com a etiqueta de cada livro, e livros cuja etiqueta combina bem com sua busca chamam mais sua atenção do que os outros. No fim, você não lê um livro só — você monta seu entendimento misturando um pouco do conteúdo de vários livros, dando mais peso aos que combinaram melhor com o que você procurava.' },
  { type: 'p', text: 'Isso é, quase literalmente, o mecanismo de **atenção** — a peça central de toda arquitetura de linguagem moderna. Cada palavra de uma frase, ao processar a frase, faz uma "pergunta" sobre as outras palavras, compara essa pergunta com o que cada outra palavra tem a "oferecer", e monta sua representação final misturando o conteúdo das palavras mais relevantes, com mais peso pras mais relevantes.' },

  { type: 'h2', text: 'Três papéis para cada palavra' },
  { type: 'p', text: 'Levando a analogia da biblioteca a sério: cada palavra da frase desempenha, ao mesmo tempo, três papéis diferentes.' },
  { type: 'list', items: [
    '**Query** (a busca) — o que esta palavra está "procurando" nas outras palavras da frase, pra entender melhor seu próprio papel no contexto.',
    '**Key** (a etiqueta) — o resumo que esta palavra oferece de si mesma, pra que outras palavras possam avaliar "isso combina com o que eu procuro?".',
    '**Value** (o conteúdo) — a informação real que esta palavra carrega, que será de fato misturada na resposta final, proporcionalmente a quão bem sua Key combinou com a Query de quem perguntou.',
  ]},
  { type: 'p', text: 'Nenhuma dessas três coisas é a palavra "crua" — cada uma é calculada a partir do embedding da palavra (já somado ao positional encoding) através de uma transformação aprendida durante o treino: um produto de matrizes, do tipo que você já viu em Produto de Matrizes, usando três matrizes de pesos diferentes — uma pra gerar Queries, uma pra gerar Keys, uma pra gerar Values. A rede aprende sozinha, durante o treino, quais transformações produzem Queries, Keys e Values úteis.' },
  { type: 'p', text: 'Quando as Queries, Keys e Values usados vêm todos da mesma frase (cada palavra perguntando sobre as outras palavras da própria frase em que está), o mecanismo é chamado de **self-attention** — atenção da frase sobre ela mesma.' },

  { type: 'h2', text: 'Como a comparação vira peso' },
  { type: 'p', text: 'A pergunta natural: como, na prática, "comparar" uma Query com uma Key? A resposta é a operação que você já conhece bem: o **produto escalar**, visto em Operações com Vetores. Query e Key são vetores de mesma dimensão, e o produto escalar entre eles é exatamente a medida de "o quanto essas duas coisas concordam em direção" — um número alto quando a Query e a Key apontam pra direções parecidas (alta compatibilidade), um número baixo ou negativo quando não têm nada a ver.' },
  { type: 'p', text: 'Fazendo isso entre a Query de uma palavra e a Key de **cada** palavra da frase (incluindo ela mesma), você obtém uma lista de números — um "placar de compatibilidade" entre essa palavra e todas as outras. Esse placar ainda não são pesos utilizáveis: são só números crus, que podem ser positivos, negativos, grandes ou pequenos.' },
  { type: 'p', text: 'É aqui que entra o **softmax**, que você já viu formalmente em Probabilidade: ele pega uma lista de números crus e transforma numa distribuição — uma lista de pesos, todos positivos, que somam exatamente 1. Aplicado a esse placar de compatibilidade, o softmax vira os "placares" em **attention weights** (pesos de atenção): quanto uma palavra deve "prestar atenção" em cada outra palavra da frase, numa escala onde tudo soma 100%.' },
  { type: 'p', text: 'Com os pesos de atenção em mãos, o passo final é simples: misturar os Values de todas as palavras, cada um multiplicado pelo seu peso de atenção correspondente, e somar tudo. O resultado é a nova representação daquela palavra — enriquecida com o contexto das palavras que mais importavam para ela.' },

  { type: 'h2', text: 'A fórmula completa' },
  { type: 'p', text: 'Fazendo essa conta para todas as palavras da frase de uma vez (não uma por uma), usando matrizes onde cada linha é uma palavra, chega-se à fórmula que a literatura chama de **scaled dot-product attention**:' },
  { type: 'formal', eq: 'Attention(Q, K, V) = softmax( (Q Kᵀ) / √d_k ) V', legend: [
    '`Q` — matriz de Queries: uma linha por palavra da frase',
    '`K` — matriz de Keys: uma linha por palavra da frase',
    '`V` — matriz de Values: uma linha por palavra da frase',
    '`Q Kᵀ` — produto de matrizes entre Q e a transposta de K (transposição vista em Transposição e Broadcasting). O resultado é uma matriz onde a posição (i,j) é o produto escalar entre a Query da palavra i e a Key da palavra j — ou seja, o placar de compatibilidade de cada palavra com cada outra, todos de uma vez',
    '`d_k` — a dimensão dos vetores de Query e Key',
    '`√d_k` — a raiz quadrada de `d_k`, usada para dividir os placares antes do softmax',
    '`softmax(...)` — aplicado linha a linha na matriz de placares: transforma cada linha (os placares de uma palavra contra todas as outras) numa distribuição de pesos que soma 1',
    '`... V` — o produto de matrizes entre a matriz de pesos de atenção (já normalizada pelo softmax) e a matriz de Values: a soma ponderada final, uma linha de resultado por palavra',
  ]},
  { type: 'h3', text: 'Por que dividir por √d_k' },
  { type: 'p', text: 'Esse detalhe da fórmula tem um motivo concreto, não é só estética. Quando `d_k` é grande (vetores de Query e Key com muitas dimensões), o produto escalar `Q·K` tende a resultar em números com magnitude bem maior, simplesmente porque há mais termos sendo somados. Softmax é sensível a isso: quando os números de entrada são muito grandes em magnitude, o softmax produz uma distribuição quase "tudo ou nada" — um peso próximo de 1 pra um item e quase 0 pros demais, mesmo quando a diferença real de compatibilidade entre eles era pequena. Isso deixa o gradiente durante o treino quase plano, dificultando o aprendizado. Dividir por `√d_k` reescala os placares de volta pra uma faixa numérica saudável antes de entrar no softmax, mantendo a distribuição de pesos mais suave e o treino mais estável.' },

  { type: 'note', text: 'Resumo: cada palavra gera três vetores — Query (o que busca), Key (o que oferece) e Value (o que carrega) — via transformações aprendidas. O produto escalar entre Query e Key mede compatibilidade; dividir por `√d_k` estabiliza a escala; softmax transforma os placares em pesos que somam 1 (attention weights); e a soma ponderada dos Values, usando esses pesos, é a saída da atenção. Essa é a fórmula: `Attention(Q,K,V) = softmax(QKᵀ/√d_k)V` — o mecanismo por trás de todo modelo de linguagem moderno.' },
];
