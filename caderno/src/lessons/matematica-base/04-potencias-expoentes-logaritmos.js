export const blocks = [
  { type: 'h1', text: 'Potências, Expoentes e Logaritmos' },
  { type: 'p', text: 'Imagine que você dobra uma folha de papel ao meio. Uma dobra: 2 camadas. Duas dobras: 4 camadas. Três dobras: 8 camadas. A cada dobra, o número de camadas não soma um valor fixo — ele **multiplica por 2** o que já tinha. Depois de 10 dobras (se fosse fisicamente possível), você teria mais de mil camadas. Depois de 42 dobras, a pilha de papel seria alta o suficiente para chegar até a Lua.' },
  { type: 'p', text: 'Isso é uma **potência**: multiplicar um número por ele mesmo repetidas vezes. "2 elevado a 3" significa "multiplique 2 por ele mesmo, 3 vezes": `2×2×2 = 8`. O número que se repete (2) é chamado de **base**; o número de vezes que ele se repete (3) é o **expoente**.' },

  { type: 'h2', text: 'Por que potências crescem tão rápido' },
  { type: 'p', text: 'Some 2 repetidamente (2, 4, 6, 8, 10...) e o crescimento é constante — sempre soma o mesmo passo. Multiplique por 2 repetidamente (2, 4, 8, 16, 32...) e cada novo valor já carrega dentro de si tudo que veio antes, multiplicado. É por isso que uma soma repetida cresce em linha reta, e uma multiplicação repetida (uma potência crescendo, chamada de **crescimento exponencial**) dispara pra cima cada vez mais rápido — cada degrau é maior que o anterior, e a distância entre os degraus também cresce.' },
  { type: 'p', text: 'É o mesmo motivo pelo qual boatos "viralizam": se cada pessoa conta pra 2 outras, e essas 2 contam pra mais 2 cada uma, o número de pessoas informadas dobra a cada rodada — não soma um número fixo de pessoas por rodada.' },

  { type: 'h2', text: 'Expoentes que não são números inteiros positivos' },
  { type: 'p', text: 'Até aqui, expoente era "quantas vezes multiplicar". Mas a ideia de potência se estende também para expoentes negativos e fracionários, seguindo um padrão consistente.' },
  { type: 'list', items: [
    'Expoente **zero**: qualquer número (diferente de zero) elevado a 0 vale 1. Pense em cada degrau de expoente como "multiplicar por mais uma base"; descer um degrau é "dividir por uma base" — descendo o suficiente a partir de qualquer potência, você sempre chega em 1 antes de virar fração.',
    'Expoente **negativo**: significa "inverta e use o expoente positivo". `2⁻¹ = 1/2`, `2⁻³ = 1/(2×2×2) = 1/8`. Você continua descendo degraus (dividindo pela base) depois de passar por 1.',
    'Expoente **fracionário**: representa uma raiz. `2^(1/2)` é a raiz quadrada de 2 — o número que, multiplicado por ele mesmo, dá 2. De forma geral, `x^(1/n)` é a raiz n-ésima de `x`.',
  ]},
  { type: 'note', text: 'Resumo: potência = multiplicação repetida. Expoente inteiro positivo conta repetições; expoente 0 dá 1; expoente negativo inverte o resultado; expoente fracionário representa uma raiz. É por isso que exponenciais crescem tão rápido: cada repetição multiplica pelo que já existia, em vez de somar um valor fixo.' },

  { type: 'h2', text: 'Logaritmo: a pergunta inversa' },
  { type: 'p', text: 'Toda operação matemática tem uma pergunta e uma "pergunta ao contrário". Somar 5 tem como operação inversa subtrair 5. Multiplicar por 3 tem como inversa dividir por 3. Elevar a uma potência também tem uma inversa — só que ela recebe um nome próprio, porque a pergunta é um pouco menos óbvia: **logaritmo**.' },
  { type: 'p', text: 'A pergunta que a potência responde é: "2 elevado a 3 dá quanto?" — resposta: 8. A pergunta que o logaritmo responde é a mesma conta, só que ao contrário: "**quantas vezes** eu preciso multiplicar 2 por ele mesmo pra chegar em 8?" — resposta: 3.' },
  { type: 'p', text: 'Ou seja: logaritmo é a pergunta "qual é o expoente?", quando você já sabe a base e o resultado, mas não sabe quantas vezes a base foi multiplicada por ela mesma para chegar lá.' },

  { type: 'h3', text: 'Exemplo com números' },
  { type: 'p', text: 'Quantas vezes eu multiplico 10 por ele mesmo pra chegar em 1000? `10×10×10 = 1000`, então a resposta é 3. Quantas vezes eu multiplico 2 por ele mesmo pra chegar em 16? `2×2×2×2 = 16`, resposta 4.' },
  { type: 'note', text: 'Resumo: logaritmo é a operação inversa da potência. Se a potência responde "base elevada a este expoente dá quanto?", o logaritmo responde "para chegar neste resultado, a partir desta base, qual foi o expoente?".' },

  { type: 'h2', text: 'A notação formal' },
  { type: 'formal', eq: 'bⁿ = r     ⟺     logᵦ(r) = n', legend: [
    '`b` — a base (o número que se repete na multiplicação)',
    '`n` — o expoente (quantas vezes a base se multiplica)',
    '`r` — o resultado da potência',
    '`⟺` — "equivale a": as duas expressões são exatamente a mesma relação, escritas de dois jeitos diferentes',
    '`logᵦ(r)` — "logaritmo de `r` na base `b`" — a pergunta "qual expoente, aplicado à base `b`, dá `r`?"',
  ]},
  { type: 'p', text: 'Aplicando aos exemplos acima: como `10³ = 1000`, então `log₁₀(1000) = 3`. Como `2⁴ = 16`, então `log₂(16) = 4`.' },

  { type: 'h3', text: 'A propriedade mais importante do logaritmo' },
  { type: 'p', text: 'Multiplicar dois números grandes é trabalhoso. Mas existe uma propriedade que transforma multiplicação em soma, o que é bem mais simples de lidar: o logaritmo de um produto é igual à soma dos logaritmos.' },
  { type: 'formal', eq: 'log(a × b) = log(a) + log(b)', legend: [
    '`log(a × b)` — logaritmo do produto de dois números',
    '`log(a) + log(b)` — o mesmo resultado, obtido somando o logaritmo de cada número separadamente',
  ]},
  { type: 'p', text: 'Por que isso funciona? Porque multiplicar potências de mesma base soma os expoentes: `2³ × 2² = 2⁵` (repare: `3+2=5`). Como o logaritmo é justamente "qual é o expoente", multiplicar dois números equivale a somar os expoentes correspondentes — e logaritmo transforma exatamente essa soma de expoentes numa soma comum.' },

  { type: 'note', text: 'Essas duas ferramentas — exponencial crescendo rápido, e logaritmo transformando produto em soma — vão reaparecer mais adiante em duas ideias com nome próprio: uma técnica chamada **softmax**, que usa exponenciais para transformar números em algo parecido com "chances", e uma forma de medir erro chamada **entropia cruzada**, que usa logaritmos exatamente pela propriedade que acabamos de ver. Por enquanto, guarde só as ferramentas — o uso específico delas vem depois.' },
];
