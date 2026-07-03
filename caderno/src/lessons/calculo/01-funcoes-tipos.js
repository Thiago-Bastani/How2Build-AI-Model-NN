export const blocks = [
  { type: 'h1', text: 'Funções (revisão aplicada)' },
  { type: 'p', text: 'Pensa numa máquina de café. Você aperta o botão do expresso: sai expresso. Aperta o do cappuccino: sai cappuccino. Sempre o mesmo botão, sempre o mesmo resultado. Isso é uma função.' },
  { type: 'p', text: 'Você já viu, na Matemática de Base, que função é uma regra: entra `x`, sai `f(x)`. Aqui a gente aplica essa ideia direto no que interessa pro Cálculo — reconhecer o **formato** de cada tipo de função, porque é esse formato que determina como ela se comporta perto de um ponto.' },

  { type: 'h2', text: 'Tipos de função que você vai encontrar' },
  { type: 'p', text: 'Cada tipo de função tem uma forma diferente no gráfico. Aprender a reconhecê-las de cara é mais valioso que decorar fórmulas — é o que vai te dizer, só de olhar, se uma curva sobe sempre no mesmo ritmo, acelera, ou dispara.' },
  { type: 'p', text: '**Linear** — o gráfico é uma linha reta. A saída cresce no mesmo ritmo constante pra sempre. Dobra a entrada, dobra a saída.' },
  { type: 'p', text: '**Quadrática** — o gráfico é uma curva suave em forma de U, chamada parábola. Quanto mais longe do centro, a saída cresce cada vez mais rápido.' },
  { type: 'p', text: '**Exponencial** — cresce devagar no começo e depois explode. É a curva dos juros compostos, das epidemias, de qualquer coisa que cresce sobre si mesma.' },
  { type: 'viz', id: 'funcoes-custo' },

  { type: 'h2', text: 'Compor funções' },
  { type: 'p', text: 'Você pode enfiar uma função dentro da outra — a saída de uma vira a entrada da próxima. É como ligar máquinas em série: café sai de uma e entra na próxima que adiciona leite.' },
  { type: 'p', text: 'Se a primeira máquina eleva ao quadrado e a segunda soma 1, colocar x=3 dá: primeiro 3²=9, depois 9+1=10.' },
  { type: 'note', text: 'Resumo: função = regra que transforma uma entrada em saída. Cada tipo de função tem um formato de gráfico característico — linear é reta, quadrática é curva em U, exponencial explode pra cima. Composição = encadear funções, aplicando de dentro pra fora.' },

  { type: 'h2', text: 'A notação formal' },
  { type: 'formal', eq: 'f(x) = x²\ng(x) = x + 1\n(f ∘ g)(x) = f(g(x)) = (x+1)²', legend: [
    '`f(x)` — função f aplicada em x: a entrada é x, a saída é x²',
    '`∘` — símbolo de composição, lê-se "composto com"',
    '`f(g(x))` — aplica g primeiro, depois f. Avalia de dentro pra fora',
    'Cuidado: `f(g(x))` quase nunca é igual a `g(f(x))`',
  ]},
];
