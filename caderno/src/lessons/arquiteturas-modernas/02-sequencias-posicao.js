export const blocks = [
  { type: 'h1', text: 'Sequências e o Problema da Ordem' },
  { type: 'p', text: 'Leia estas duas frases: "o cachorro morde o homem" e "o homem morde o cachorro". Mesmas palavras exatas, mesma quantidade de cada uma — só a ordem muda. E o significado inverte completamente: numa frase o cachorro é o agressor, na outra é a vítima.' },
  { type: 'p', text: 'Agora imagine que você representasse cada frase só por um saco embaralhado dos embeddings das suas palavras — sem nenhuma informação de qual veio primeiro, qual veio depois. Os dois "sacos" seriam idênticos: as mesmas cinco palavras, os mesmos cinco vetores. Uma rede que enxergasse só esse saco jamais conseguiria diferenciar as duas frases — pra ela, seriam a mesma coisa.' },
  { type: 'p', text: 'A ordem carrega significado. Qualquer arquitetura que processe linguagem precisa, de algum jeito, saber não só quais palavras apareceram, mas em qual posição cada uma apareceu.' },

  { type: 'h2', text: 'A ideia: carimbar cada posição' },
  { type: 'p', text: 'A saída é simples de enunciar: além do embedding que representa o significado da palavra, some a cada palavra uma segunda informação — um "carimbo" que diz "eu sou a palavra número 1 da frase", "eu sou a número 2", e assim por diante. Esse carimbo precisa ser único por posição, e precisa ser somável ao embedding sem estragá-lo.' },
  { type: 'p', text: 'A forma mais ingênua de fazer isso seria simplesmente colar o número da posição (1, 2, 3, ...) em cada vetor. O problema: esses números crescem sem limite conforme a frase fica mais longa, e uma rede neural lida mal com valores de escala muito diferente aparecendo em posições diferentes — a posição 500 dominaria numericamente a posição 2, mesmo que a informação relevante seja só "qual veio antes de qual".' },
  { type: 'p', text: 'A solução usada de fato — chamada de **positional encoding** — usa ondas. Especificamente, seno e cosseno, que você já viu na Trigonometria Básica: funções que sobem e descem entre −1 e 1, repetindo o padrão em ciclos. Em vez de um número que cresce sem limite, cada posição ganha um padrão de onda, e esse padrão é o mesmo processo — bem comportado, sempre entre −1 e 1 — não importa quão longa seja a frase.' },

  { type: 'h2', text: 'Por que ondas em várias frequências' },
  { type: 'p', text: 'Uma única onda não bastaria: se você usasse só um seno com um período fixo, posições diferentes poderiam coincidentemente cair no mesmo valor da onda (a onda se repete), e o carimbo deixaria de ser único. A solução do paper original do Transformer é usar **várias ondas em frequências diferentes** ao mesmo tempo — uma onda bem rápida (que oscila muito de posição pra posição), outras mais lentas, até uma quase parada. Cada posição recebe um valor diferente em cada uma dessas ondas, e a combinação de "onde você está" em todas elas simultaneamente funciona como uma impressão digital única daquela posição — praticamente impossível de se repetir mesmo em frases muito longas.' },
  { type: 'p', text: 'Como o embedding de cada palavra já é um vetor com várias dezenas ou centenas de posições (dimensões), a solução usa exatamente essa estrutura: cada par de dimensões do vetor de embedding recebe sua própria onda, com sua própria frequência, calculada a partir da posição da palavra na frase.' },

  { type: 'h2', text: 'A fórmula real' },
  { type: 'p', text: 'Para uma palavra na posição `pos` da frase, e um embedding com `d_model` dimensões, o valor a somar em cada dimensão `i` do embedding é dado por duas fórmulas — uma para dimensões pares, outra para ímpares:' },
  { type: 'formal', eq: 'PE(pos, 2i)   = sen( pos / 10000^(2i/d_model) )\nPE(pos, 2i+1) = cos( pos / 10000^(2i/d_model) )', legend: [
    '`pos` — a posição da palavra dentro da frase (0, 1, 2, ...)',
    '`i` — o índice do par de dimensões dentro do vetor de embedding (0, 1, 2, ... até d_model/2)',
    '`d_model` — o número total de dimensões do vetor de embedding',
    '`2i` e `2i+1` — as posições, dentro do vetor, que recebem respectivamente o valor do seno e o valor do cosseno daquele par',
    '`10000^(2i/d_model)` — o "divisor de frequência": quando `i` é pequeno (dimensões iniciais do vetor), esse divisor é pequeno, e `pos` dividido por um número pequeno oscila rápido — onda de alta frequência. Quando `i` cresce (dimensões finais), o divisor cresce até perto de 10000, e a onda fica muito mais lenta — quase constante',
      'sen(...) e cos(...) — as funções trigonométricas já vistas: mantêm o valor sempre entre −1 e 1, não importa quão grande `pos` fique',
  ]},
  { type: 'p', text: 'Ou seja: cada posição da frase recebe uma "assinatura" — um vetor de mesma dimensão do embedding, feito de senos e cossenos em frequências que vão de muito rápidas (nas primeiras dimensões) a muito lentas (nas últimas). Essa assinatura é somada, posição a posição, ao embedding da palavra que ocupa aquele lugar na frase.' },
  { type: 'p', text: 'Usar seno numa metade das dimensões e cosseno na outra metade (em vez de só seno em tudo) tem um motivo técnico: as duas funções, juntas, tornam mais fácil para a rede aprender, mais adiante, a calcular a **distância relativa** entre duas posições (quantas palavras uma está à frente da outra) só combinando linearmente essas duas ondas — uma propriedade que o seno sozinho não oferece com a mesma facilidade.' },

  { type: 'h2', text: 'O resultado' },
  { type: 'p', text: 'Depois dessa soma, cada palavra da frase deixa de ser representada só pelo seu embedding "puro" (que só carrega significado) e passa a carregar também a informação de "onde ela está" na sequência. "Cachorro" na posição 1 e "cachorro" na posição 4 têm embeddings de significado idênticos, mas, depois de somado o positional encoding, os vetores finais são diferentes — porque cada um carrega o carimbo da sua própria posição.' },
  { type: 'note', text: 'Resumo: representar uma frase como um saco de embeddings sem ordem perde informação essencial, porque a posição das palavras muda o significado. Positional encoding resolve isso somando, a cada embedding, um padrão de ondas seno/cosseno único por posição — usando várias frequências diferentes por dimensão do vetor, seguindo a fórmula do paper original do Transformer.' },
];
