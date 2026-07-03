export const blocks = [
  { type: 'h1', text: 'Tensores como Generalização' },
  { type: 'p', text: 'Pense numa gaveta de organização: primeiro você tem uma caixinha com um número dentro. Depois, uma fileira de caixinhas — uma lista. Depois, uma grade de fileiras — uma tabela. Cada nível é a mesma ideia de "guardar números organizados", só que com mais uma camada de aninhamento por cima da anterior. É exatamente essa progressão que fecha toda a trilha de Álgebra Linear.' },

  { type: 'h2', text: 'Recapitulando os três níveis que você já viu' },
  { type: 'p', text: 'Um número sozinho, sem lista nenhuma ao redor — `7`, `-3.5`, `0` — é chamado de **escalar**. Não tem direção, não tem posição, é só uma grandeza. Dizemos que um escalar tem **0 dimensões**: não precisa de nenhum índice pra localizar o número dentro dele, porque ele é o número.' },
  { type: 'p', text: 'Uma lista ordenada de escalares — `[3, 120, 2]`, o vetor da casa que você viu na primeira aula desta trilha — tem **1 dimensão**. Você precisa de exatamente um índice (`v₁`, `v₂`, `v₃`) pra localizar um número dentro dele.' },
  { type: 'p', text: 'Uma tabela de vetores empilhados — a matriz de notas, `[[8,6],[7,9]]` — tem **2 dimensões**. Você precisa de dois índices (`Aᵢⱼ`: linha i, coluna j) pra localizar um número dentro dela.' },
  { type: 'list', items: [
    'Escalar — 0 dimensões — 1 número sozinho — `7`',
    'Vetor — 1 dimensão — lista de números — `[3, 120, 2]`',
    'Matriz — 2 dimensões — tabela de números — `[[8,6],[7,9]]`',
  ]},

  { type: 'h2', text: 'O próximo nível: e se a lista tiver matrizes dentro?' },
  { type: 'p', text: 'Nada te impede de continuar empilhando. Uma lista de matrizes — cada posição da lista sendo uma tabela `2×2` inteira, por exemplo — tem **3 dimensões**. Você precisa de três índices pra localizar um número: qual matriz da lista, qual linha, qual coluna.' },
  { type: 'p', text: 'E não precisa parar aí: uma lista de listas de matrizes tem 4 dimensões. E assim por diante, sem limite teórico. O nome que engloba **todos** esses casos — escalar, vetor, matriz, e qualquer nível acima — é **tensor**.' },
  { type: 'p', text: 'Um tensor é um array N-dimensional: números organizados em camadas de aninhamento, onde N pode ser 0 (escalar), 1 (vetor), 2 (matriz), 3, 4, ou qualquer valor. Escalar, vetor e matriz não são "coisas diferentes de tensor" — são os três primeiros casos particulares dele. Todo vetor é um tensor de 1 dimensão. Toda matriz é um tensor de 2 dimensões.' },
  { type: 'note', text: 'Não existe um limite de 3 ou 4 dimensões — é só que a partir daí fica difícil desenhar ou visualizar. Mas matematicamente e computacionalmente, um tensor de 10 dimensões é uma estrutura perfeitamente válida, só maior.' },

  { type: 'h2', text: 'Um exemplo concreto de tensor 3D' },
  { type: 'p', text: 'Uma imagem colorida no computador é guardada como um tensor de 3 dimensões. A primeira dimensão é a altura (quantas linhas de pixels), a segunda é a largura (quantas colunas de pixels), e a terceira são os **canais de cor** — tipicamente 3 números por pixel: quanto de vermelho, quanto de verde, quanto de azul (R, G, B) aquele pixel tem.' },
  { type: 'p', text: 'Uma foto de `100 × 100` pixels, colorida, é um tensor de shape `100 × 100 × 3`: 100 linhas, 100 colunas, e em cada uma dessas 10.000 posições, 3 números (a intensidade de cada cor). No total, `100 × 100 × 3 = 30.000` números guardados, todos organizados dentro de um único tensor.' },
  { type: 'formula', text: 'imagem colorida: shape [altura, largura, 3 canais de cor]\nfoto 100×100: shape [100, 100, 3] → 30.000 números' },
  { type: 'p', text: 'Se a imagem fosse preto e branco, bastaria 1 canal em vez de 3, e o tensor teria shape `100 × 100 × 1` — praticamente uma matriz só, com uma dimensão extra "sobrando". E se você tiver um lote de 32 fotos coloridas pra processar de uma vez (comum em IA, pra treinar mais rápido), o tensor ganha mais uma dimensão: shape `32 × 100 × 100 × 3` — um tensor de 4 dimensões.' },

  { type: 'h2', text: 'A notação formal' },
  { type: 'formal', eq: 'ordem 0: escalar — s\nordem 1: vetor — v = [v₁, ..., vₙ]\nordem 2: matriz — A, shape [m, n]\nordem k: tensor — T, shape [d₁, d₂, ..., dₖ]', legend: [
    '`ordem` (ou "rank") — quantos índices são necessários pra localizar um número dentro da estrutura',
    '`s` — um escalar, ordem 0, sem índice nenhum',
    '`v`, com shape `[n]` — vetor, ordem 1, um índice',
    '`A`, com shape `[m, n]` — matriz, ordem 2, dois índices',
    '`T`, com shape `[d₁, ..., dₖ]` — tensor de ordem k, k índices — a generalização completa',
  ]},
  { type: 'p', text: 'Tudo o que você aprendeu nesta trilha — soma, produto escalar, norma, produto de matrizes, transposição, broadcasting — são, na prática, operações sobre tensores. Vetor e matriz foram os casos mais simples pra construir a intuição; a partir de agora, "tensor" é a palavra que engloba todos eles.' },

  { type: 'h2', text: 'O que isso significa pra você, a partir daqui' },
  { type: 'p', text: 'Essa foi a aula de fechamento da trilha de Álgebra Linear inteira. Vetores, matrizes, suas operações e agora tensores são a linguagem em que absolutamente todo dado de IA é representado, processado e transformado — desde uma casa descrita por 3 números até uma imagem colorida com dezenas de milhares deles.' },
  { type: 'p', text: 'Na próxima trilha, essa matemática deixa de ser só teoria no papel: você vai escrever código de verdade, rodando ao vivo no navegador, criando tensores e aplicando exatamente essas operações — soma, produto escalar, produto de matrizes — em dados reais. Tudo o que era abstrato até aqui vira algo que você constrói e executa com as próprias mãos.' },
  { type: 'note', text: 'Resumo: tensor = array N-dimensional, a generalização de escalar (0D), vetor (1D) e matriz (2D) pra qualquer número de dimensões. Uma imagem colorida é um exemplo concreto de tensor 3D: altura × largura × 3 canais de cor. A partir daqui, é código.' },
];
