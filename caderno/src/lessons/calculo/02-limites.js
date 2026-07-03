export const blocks = [
  { type: 'h1', text: 'Limites' },
  { type: 'p', text: 'Imagina que você está encostado numa parede e resolve andar metade da distância que falta até ela. Anda metade. Depois anda metade do que sobrou. Depois metade do que sobrou daquilo. Você nunca, em nenhum passo, encosta de fato na parede — mas depois de várias repetições, a distância que falta fica tão ridiculamente pequena que, pra qualquer propósito prático, você já chegou lá.' },
  { type: 'p', text: 'Essa é a ideia inteira de limite: descrever pra onde uma coisa está indo, mesmo que ela nunca chegue exatamente naquele valor. Não interessa o que acontece exatamente "na parede" — interessa o que acontece conforme você se aproxima dela cada vez mais.' },
  { type: 'p', text: 'Por que isso importa? Porque tem gente que precisa fazer contas exatamente nesse tipo de situação: "o que acontece bem aqui, neste ponto exato" — mas a conta direta nesse ponto trava ou não faz sentido. O limite é a ferramenta que resolve isso: em vez de perguntar "o que acontece no ponto", pergunta "pra que valor as coisas estão se aproximando conforme cheguei perto do ponto". A próxima aula (Derivada) vai usar exatamente esse truque.' },

  { type: 'h2', text: 'Um exemplo com números' },
  { type: 'p', text: 'Pega a expressão `(x² − 1) / (x − 1)`. Tenta calcular ela em `x = 1` direto: dá `(1 − 1) / (1 − 1) = 0/0`. Isso não tem resposta — é uma "indeterminação", divisão que trava.' },
  { type: 'p', text: 'Só que você pode perguntar: o que acontece com essa expressão quando x chega **perto** de 1, sem ser exatamente 1?' },
  { type: 'list', items: [
    'x = 2:      `(4 − 1)/(2 − 1) = 3/1 = 3`',
    'x = 1.5:    `(2.25 − 1)/(1.5 − 1) = 1.25/0.5 = 2.5`',
    'x = 1.1:    `(1.21 − 1)/(1.1 − 1) = 0.21/0.1 = 2.1`',
    'x = 1.01:   `(1.0201 − 1)/(1.01 − 1) = 0.0201/0.01 = 2.01`',
    'x = 1.001:  ≈ `2.001`',
  ]},
  { type: 'p', text: 'Repare no padrão: conforme x se aproxima de 1, o resultado da expressão se aproxima de **2** — cada vez mais perto, sem nunca precisar calcular exatamente em x=1 (onde a conta trava). Isso não é coincidência: dá pra mostrar algebricamente que `(x²−1)/(x−1) = x+1` para todo x diferente de 1 (fatorando `x²−1 = (x−1)(x+1)` e cancelando o `(x−1)` de cima com o de baixo). E `x+1` em `x=1` vale exatamente 2 — batendo com a tabela.' },
  { type: 'note', text: 'Resumo do exemplo: a expressão trava em x=1 (0/0), mas se aproxima suavemente de 2 conforme x chega perto de 1 por qualquer lado. Dizemos que "o limite de (x²−1)/(x−1) quando x tende a 1 é 2".' },

  { type: 'h2', text: 'Aproximando por dois lados' },
  { type: 'p', text: 'Um detalhe importante: pra um limite existir de verdade, o valor tem que se aproximar do mesmo número não importa de que lado você chega — vindo de valores menores que o ponto (pela esquerda) ou de valores maiores (pela direita). Na tabela acima, só olhamos valores vindo de cima (2, 1.5, 1.1...). Se você repetir com valores vindo de baixo (0, 0.5, 0.9, 0.99...), o resultado também converge pra 2. Os dois lados concordam — o limite existe e vale 2.' },

  { type: 'note', text: 'Resumo: limite descreve pra que valor uma expressão se aproxima, conforme a entrada se aproxima de um ponto — sem exigir (e às vezes sem nem poder calcular) o valor exato naquele ponto. É a ferramenta que permite falar de "o que acontece bem aqui" de forma precisa, mesmo quando a conta direta trava.' },

  { type: 'h2', text: 'A notação formal' },
  { type: 'formal', eq: 'lim(x→a) f(x) = L', legend: [
    '`lim` — abreviação de "limite"',
    '`x→a` — lê-se "x tende a a": x se aproximando cada vez mais do valor a, sem necessariamente ser igual a a',
    '`f(x)` — a expressão sendo avaliada',
    '`= L` — o valor pro qual f(x) se aproxima. `L` é o resultado do limite',
    'Lido inteiro: "o limite de f(x) quando x tende a a é L"',
  ]},
  { type: 'formal', eq: 'lim(x→1) (x² − 1)/(x − 1) = 2', legend: [
    'Essa é exatamente a conta que fizemos na tabela acima, escrita em notação de limite',
    'Repare: a expressão não está definida em x=1 (dá 0/0), mas o limite existe e vale 2',
  ]},
  { type: 'p', text: 'Essa notação — "o que acontece conforme a distância entre dois pontos encolhe rumo a zero" — é exatamente a peça que falta pra definir com precisão o que significa "taxa de variação instantânea": a derivada, tema da próxima aula.' },
];
