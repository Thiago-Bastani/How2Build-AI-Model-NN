export const blocks = [
  { type: 'h1', text: 'Média, Variância e Desvio-Padrão' },
  { type: 'p', text: 'Imagine que você está tentando equilibrar uma régua na ponta do dedo, com várias moedas espalhadas em cima dela, algumas mais pesadas que outras. Existe um ponto exato onde, se você colocar o dedo ali, a régua fica perfeitamente equilibrada, sem pender pra nenhum lado. Esse ponto é o "centro de massa" daquele conjunto de moedas.' },
  { type: 'p', text: 'A **média** de um conjunto de números é exatamente esse ponto de equilíbrio. Não é necessariamente um número que existe na lista — é o lugar onde, se você imaginasse cada número como um peso numa régua, tudo ficaria balanceado.' },
  { type: 'p', text: 'Agora pensa em duas turmas de alunos que tiraram nota 7 de média na prova. Na turma A, todo mundo tirou entre 6.5 e 7.5 — bem parecido. Na turma B, metade tirou 2 e a outra metade tirou 12 — a média também dá 7, mas as notas estão extremamente espalhadas. A média sozinha não conta essa diferença. Você precisa de outro número que meça "o quanto os dados se espalham" ao redor do centro — isso é a **variância**, e sua versão mais fácil de interpretar, o **desvio-padrão**.' },
  { type: 'note', text: 'Resumo da fase leiga: média é o ponto de equilíbrio de um conjunto de números. Variância (e desvio-padrão) mede o quanto os números se espalham ao redor desse ponto de equilíbrio — dois conjuntos podem ter a mesma média e espalhamentos completamente diferentes.' },

  { type: 'h2', text: 'Média: a fórmula' },
  { type: 'p', text: 'Somar todos os valores e dividir pela quantidade de valores. Você já viu essa estrutura de "somar tudo e dividir pelo total" na aula de Frequência Relativa, e a notação de somatório já é conhecida da Matemática de Base.' },
  { type: 'formal', eq: 'μ = (1/N) · Σᵢ₌₁ᴺ xᵢ', legend: [
    '`μ` — "mi", a letra grega usada por convenção pra representar a média',
    '`N` — quantos números tem o conjunto',
    '`Σᵢ₌₁ᴺ xᵢ` — soma de todos os valores, um por um, de `x₁` até `x_N`',
    '`(1/N) ·` — divide a soma total pela quantidade de valores, transformando "soma total" em "valor médio por item"',
  ]},
  { type: 'h3', text: 'Exemplo com números' },
  { type: 'p', text: 'Conjunto: `[4, 8, 6, 2]`. Soma: `4+8+6+2 = 20`. Quantidade: `N=4`. Média: `μ = 20/4 = 5`.' },
  { type: 'p', text: 'Repare que 5 não é nenhum dos valores originais — é o ponto de equilíbrio entre eles.' },

  { type: 'h2', text: 'Variância: medindo o espalhamento' },
  { type: 'p', text: 'A ideia natural seria: pra cada número, calcular a distância dele até a média, e depois tirar a média dessas distâncias. O problema é que algumas distâncias são positivas (número acima da média) e outras negativas (número abaixo da média) — e quando você soma tudo, elas se cancelam, sempre dando zero, não importa o quão espalhados os dados estejam. Experimente: no conjunto `[4, 8, 6, 2]` com média 5, as distâncias são `-1, +3, +1, -3` — e a soma delas é zero.' },
  { type: 'p', text: 'A solução: elevar cada distância ao quadrado antes de somar. Elevar ao quadrado sempre dá um resultado positivo (ou zero), então distâncias positivas e negativas não se cancelam mais — ambas contam como "espalhamento", na mesma direção.' },
  { type: 'formal', eq: 'σ² = (1/N) · Σᵢ₌₁ᴺ (xᵢ − μ)²', legend: [
    '`σ²` — "sigma ao quadrado", a variância',
    '`xᵢ − μ` — a distância entre um valor individual e a média — positiva se o valor está acima da média, negativa se está abaixo',
    '`(xᵢ − μ)²` — essa distância elevada ao quadrado, o que garante um resultado sempre positivo (ou zero)',
    '`Σᵢ₌₁ᴺ` — soma dessas distâncias-ao-quadrado, para todos os `N` valores',
    '`(1/N) ·` — divide pelo total, dando a distância-ao-quadrado **média** — daí o nome variância',
  ]},
  { type: 'h3', text: 'Exemplo com números' },
  { type: 'p', text: 'Conjunto: `[4, 8, 6, 2]`, média `μ = 5`. Distâncias: `4-5=-1`, `8-5=3`, `6-5=1`, `2-5=-3`. Ao quadrado: `1, 9, 1, 9`. Soma: `1+9+1+9 = 20`. Variância: `σ² = 20/4 = 5`.' },
  { type: 'warn', text: 'A variância elevou tudo ao quadrado — o que significa que sua unidade também ficou "ao quadrado". Se os números originais eram medidos em metros, a variância está em "metros ao quadrado", um valor difícil de interpretar diretamente em relação aos dados originais.' },

  { type: 'h2', text: 'Desvio-padrão: voltando à escala original' },
  { type: 'p', text: 'Pra desfazer o "elevar ao quadrado" e voltar pra mesma escala dos dados originais, basta tirar a raiz quadrada da variância. Esse valor final é o **desvio-padrão**.' },
  { type: 'formal', eq: 'σ = √σ²  =  √[(1/N) · Σᵢ₌₁ᴺ (xᵢ − μ)²]', legend: [
    '`σ` — "sigma", o desvio-padrão',
    '`√σ²` — raiz quadrada da variância, desfazendo o quadrado e voltando à unidade original dos dados',
  ]},
  { type: 'p', text: 'No exemplo, `σ² = 5`, então `σ = √5 ≈ 2.236`. Isso significa: em média, os valores do conjunto `[4, 8, 6, 2]` se afastam cerca de 2.236 unidades da média (que é 5) — um número que agora faz sentido comparar diretamente com os dados originais, já que está na mesma escala deles.' },
  { type: 'note', text: 'Resumo da fase Expert: média = soma dividida pelo total. Variância = média das distâncias-ao-quadrado até a média (garante que espalhamento nunca é negativo). Desvio-padrão = raiz quadrada da variância, de volta à escala original dos dados.' },

  { type: 'divider' },
  { type: 'h2', text: 'Por que isso importa para IA' },
  { type: 'p', text: 'Quando você for preparar dados de verdade para treinar um modelo — algo que você vai fazer em código numa trilha futura chamada Fundamentos de Implementação — vai encontrar uma técnica chamada **normalização Z-score** (ou padronização), que transforma cada valor `x` do seu conjunto de dados usando exatamente a fórmula `(x − média) / desvio-padrão`.' },
  { type: 'p', text: 'Sem essa aula, isso seria só uma receita decorada. Com ela, é uma consequência lógica direta: você está recentralizando os dados no ponto de equilíbrio (subtraindo a média, o que faz o novo centro virar zero) e depois reescalando pela distância típica que os dados costumam ter em relação a esse centro (dividindo pelo desvio-padrão, o que faz o espalhamento típico virar 1). O resultado é um conjunto de dados centrado em 0 com espalhamento 1 — uma escala padronizada que ajuda demais o treinamento de redes neurais, porque evita que uma variável medida em milhares (tipo "preço de uma casa") domine outra medida em unidades pequenas (tipo "número de quartos").' },
];
