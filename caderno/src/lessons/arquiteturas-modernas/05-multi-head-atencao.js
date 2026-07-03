export const blocks = [
  { type: 'h1', text: 'Múltiplas Cabeças de Atenção' },

  { type: 'p', text: 'Volta pra biblioteca da aula de Atenção. Você fez uma busca — "livros sobre o oceano Pacífico" — e comparou com a etiqueta de cada livro. Mas uma única busca captura só um tipo de relação. E se, ao mesmo tempo, você quisesse também descobrir "quais livros têm o mesmo autor que este aqui" e "quais livros foram publicados na mesma década"? Seria mais rápido mandar três pesquisadores diferentes à biblioteca ao mesmo tempo, cada um fazendo uma busca com um critério diferente, e depois juntar os três relatórios.' },
  { type: 'p', text: 'É exatamente essa a ideia de **multi-head attention**: em vez de calcular atenção uma única vez, calcular várias vezes em paralelo — cada "cabeça" com seu próprio conjunto de matrizes de peso pra gerar Q, K e V — e depois juntar os resultados.' },

  { type: 'h2', text: 'Por que uma cabeça só não basta' },
  { type: 'p', text: 'Numa frase como "o banco estava cheio, então ele sentou na grama ao lado do banco do parque", a palavra "banco" aparece duas vezes com significados diferentes (instituição financeira vs. assento). Uma única cabeça de atenção aprende um padrão específico de "o que combina com o quê" — por exemplo, pode aprender a focar em relações de proximidade física entre palavras. Outra cabeça, rodando em paralelo com seus próprios pesos, pode aprender a focar em relações gramaticais (sujeito com verbo). Uma terceira pode aprender a desambiguar sentido pelo contexto ao redor. Nenhuma dessas cabeças é programada manualmente pra fazer isso — cada uma aprende, durante o treino, a se especializar num tipo de relação diferente, simplesmente por ter seu próprio conjunto de pesos livre pra se ajustar.' },

  { type: 'h2', text: 'Como as cabeças se combinam' },
  { type: 'p', text: 'Cada cabeça roda exatamente o mesmo mecanismo de scaled dot-product attention que você já viu — `softmax(QKᵀ/√d_k)V` — só que com sua própria Q, K e V, geradas a partir de suas próprias matrizes de peso. Se você tem `h` cabeças, cada uma produz sua própria matriz de saída.' },
  { type: 'p', text: 'Essas `h` saídas são concatenadas lado a lado (empilhadas numa única linha maior, uma ao lado da outra) e depois passam por mais uma transformação linear (mais um produto de matrizes, com uma matriz de pesos própria) que mistura as informações das diferentes cabeças numa única representação final, do mesmo tamanho que a entrada original.' },
  { type: 'formal', eq: 'headᵢ = Attention(Q·Wᵢ_Q,  K·Wᵢ_K,  V·Wᵢ_V)\nMultiHead(Q,K,V) = Concat(head₁, ..., headₕ) · W_O', legend: [
    '`Wᵢ_Q, Wᵢ_K, Wᵢ_V` — as matrizes de peso próprias da cabeça i, usadas pra gerar sua Query/Key/Value',
    '`headᵢ` — a saída da atenção calculada só com os Q/K/V daquela cabeça',
    '`Concat(head₁, ..., headₕ)` — todas as saídas das `h` cabeças, coladas lado a lado numa única linha maior',
    '`W_O` — uma matriz de pesos final, que mistura as informações vindas de todas as cabeças de volta num único vetor por palavra',
  ]},
  { type: 'p', text: 'O custo computacional de `h` cabeças pequenas rodando em paralelo é comparável ao de uma cabeça grande sozinha — a divisão em múltiplas cabeças não é mais cara, é uma forma diferente de organizar a mesma quantidade de cálculo, trocando "uma busca ampla" por "várias buscas especializadas simultâneas".' },

  { type: 'note', text: 'Resumo: multi-head attention roda várias atenções em paralelo, cada uma com seus próprios pesos, permitindo que cada cabeça se especialize num tipo de relação diferente entre as palavras. As saídas de todas as cabeças são concatenadas e misturadas por mais uma transformação linear, formando a saída final.' },
];
