export const blocks = [
  { type: 'h1', text: 'Derivada' },
  { type: 'p', text: 'Você está num carro. O GPS mostra sua posição. O velocímetro mostra sua velocidade. A velocidade é exatamente a taxa em que sua posição está mudando agora. Se você está a 100 km/h, sua posição muda 100 km por hora neste instante.' },
  { type: 'p', text: 'A derivada é isso. É a velocidade de mudança de uma função num ponto específico. Não a mudança total — a mudança instantânea, agora, neste ponto.' },
  { type: 'p', text: 'Geometricamente: se você traçar uma reta que toca a curva em um único ponto sem cruzá-la — a **reta tangente** — a inclinação dessa reta é a derivada naquele ponto.' },
  { type: 'viz', id: 'derivada' },

  { type: 'h2', text: 'Construindo a ideia a partir do limite' },
  { type: 'p', text: 'Você já viu, na aula de Limites, o que significa uma razão "se aproximar" de um valor sem nunca precisar chegar nele de fato. A derivada usa exatamente essa ideia.' },
  { type: 'p', text: 'Pra medir a inclinação **média** entre dois pontos de uma curva, você pega "quanto subiu" dividido por "quanto andou" — a mesma conta de inclinação de uma reta. O problema é que isso dá a inclinação **entre** dois pontos, não **num** ponto só.' },
  { type: 'p', text: 'A saída: você encolhe a distância entre os dois pontos cada vez mais — vai de 1 unidade, pra 0.1, pra 0.001 — e observa pra que valor a inclinação média está se aproximando. Esse valor-limite é a derivada naquele ponto exato.' },

  { type: 'h3', text: 'Exemplo com números' },
  { type: 'p', text: 'Seja `f(x) = x²`. Qual a inclinação em x=2?' },
  { type: 'list', items: [
    'Entre x=2 e x=3 (distância 1): inclinação média = `(9−4)/1 = 5`',
    'Entre x=2 e x=2.1 (distância 0.1): inclinação média = `(4.41−4)/0.1 = 4.1`',
    'Entre x=2 e x=2.001 (distância 0.001): inclinação média ≈ `4.001`',
  ]},
  { type: 'p', text: 'Conforme a distância encolhe rumo a zero, a inclinação média se aproxima de **4**. Esse é o valor da derivada de `x²` em x=2 — e é exatamente `2×2`, um padrão que a aula de Regras de Derivação vai generalizar.' },

  { type: 'note', text: 'Resumo: derivada = inclinação da reta tangente num ponto = o limite da inclinação média quando a distância entre os dois pontos encolhe pra zero. É a taxa de variação instantânea.' },

  { type: 'h2', text: 'A notação formal' },
  { type: 'formal', eq: "f'(x)  =  lim(h→0)  [f(x+h) − f(x)] / h", legend: [
    "`f'(x)` — a derivada de f, lida \"f linha de x\"",
    '`lim(h→0)` — o valor que a expressão se aproxima quando h encolhe rumo a zero (sem nunca ser zero)',
    '`f(x+h) − f(x)` — quanto a função subiu, entre x e x+h',
    '`h` — quanto você andou no eixo x — a distância que está encolhendo',
    'A fração inteira é a "inclinação média" — o limite dela é a derivada',
  ]},
  { type: 'p', text: 'Essa é a definição por trás de toda derivada que existe. Na prática, ninguém recalcula esse limite toda vez — existem regras prontas (próxima aula) derivadas exatamente dessa definição, uma vez, para sempre.' },
];
