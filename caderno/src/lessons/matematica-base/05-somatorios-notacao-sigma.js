export const blocks = [
  { type: 'h1', text: 'Somatórios e Notação Sigma' },
  { type: 'p', text: 'Imagine que você trabalha num caixa de mercado e, no fim do dia, precisa somar o valor de cada nota fiscal emitida. Você pega a primeira nota, anota o valor. Pega a segunda, soma ao total. Pega a terceira, soma de novo. E assim por diante, até acabarem as notas. No final, você tem um único número: o total do dia.' },
  { type: 'p', text: 'Esse processo — pegar uma lista inteira de valores e somar todos eles, um por um, até sobrar um único número — é tão comum em matemática (e em ciência de forma geral) que ganhou um símbolo próprio, só pra evitar escrever "some o primeiro, mais o segundo, mais o terceiro..." toda vez que aparece.' },

  { type: 'h2', text: 'Somando sem símbolo nenhum' },
  { type: 'p', text: 'Antes de qualquer notação, o que importa é entender o processo. Suponha uma lista de 5 valores: `[4, 7, 2, 9, 1]`. Somar a lista inteira significa: comece com um total zerado, percorra a lista item por item, e vá acumulando cada valor no total.' },
  { type: 'list', items: [
    'Total começa em 0',
    'Soma o 1º item: total = 0 + 4 = 4',
    'Soma o 2º item: total = 4 + 7 = 11',
    'Soma o 3º item: total = 11 + 2 = 13',
    'Soma o 4º item: total = 13 + 9 = 22',
    'Soma o 5º item: total = 22 + 1 = 23',
  ]},
  { type: 'p', text: 'O resultado final é 23. Repare que a operação, em cada passo, é sempre a mesma: pega o total que já tinha, soma o próximo item da lista, guarda o novo total.' },

  { type: 'h2', text: 'A mesma ideia como um processo repetitivo' },
  { type: 'p', text: 'Se você já programa, esse processo provavelmente já é familiar — é exatamente um "percorra a lista e acumule":' },
  { type: 'formula', text: 'soma = 0\npara cada item na lista:\n    soma = soma + item' },
  { type: 'p', text: 'Isso não é nenhuma novidade: é a mesma coisa que a lista de passos acima, só escrita como uma receita genérica que funciona pra lista de qualquer tamanho — 5 itens, 100 itens, um milhão de itens. A variável `soma` é a caixa que guarda o total acumulado até aquele ponto; ela é atualizada a cada volta.' },
  { type: 'note', text: 'Resumo até aqui: somar uma lista inteira = zerar um total, percorrer a lista item por item, e ir acumulando cada valor no total. Isso é exatamente um laço de repetição com um acumulador — algo que você já sabe programar.' },

  { type: 'h2', text: 'A notação formal: o símbolo Σ' },
  { type: 'p', text: 'A letra grega maiúscula **sigma**, escrita `Σ`, é o símbolo que representa exatamente esse processo de "percorrer e acumular somando" — só que de forma compacta, sem escrever o laço por extenso.' },
  { type: 'formal', eq: 'Σᵢ₌₁⁵ xᵢ  =  x₁ + x₂ + x₃ + x₄ + x₅', legend: [
    '`Σ` — "some tudo o que vem a seguir, para cada valor do índice indicado embaixo e em cima do símbolo"',
    '`i` — o índice: a variável que representa "em qual posição da lista eu estou agora" — equivalente ao contador de um laço de repetição',
    '`i = 1` (embaixo do Σ) — o índice começa em 1, ou seja, comece pelo primeiro item da lista',
    '`5` (em cima do Σ) — o índice vai até 5, ou seja, pare depois do quinto item',
    '`xᵢ` — o item da lista na posição `i`; conforme `i` percorre de 1 a 5, `xᵢ` percorre cada item da lista, um de cada vez',
    'O resultado inteiro é a soma de todos esses itens, exatamente como o total acumulado no laço acima',
  ]},
  { type: 'p', text: 'Usando a lista do exemplo, `[4, 7, 2, 9, 1]`, temos `x₁=4, x₂=7, x₃=2, x₄=9, x₅=1`. Substituindo:' },
  { type: 'formula', text: 'Σᵢ₌₁⁵ xᵢ  =  4 + 7 + 2 + 9 + 1  =  23' },
  { type: 'p', text: 'Exatamente o mesmo resultado do laço item por item — porque é a mesma operação, só que escrita como símbolo em vez de como sequência de passos.' },

  { type: 'h3', text: 'Somando uma expressão, não só uma lista crua' },
  { type: 'p', text: 'O que fica dentro do Σ não precisa ser um valor puro da lista — pode ser qualquer expressão que dependa do índice `i`. Por exemplo, somar o quadrado de cada item:' },
  { type: 'formal', eq: 'Σᵢ₌₁³ i²  =  1² + 2² + 3²  =  1 + 4 + 9  =  14', legend: [
    '`i²` — em vez de somar o índice puro, a expressão que está sendo somada é "o índice ao quadrado"',
    'Para cada valor de `i` de 1 a 3, calcula-se `i²` primeiro, e só depois soma-se tudo',
  ]},
  { type: 'p', text: 'Em código, isso seria só um passo a mais dentro do mesmo laço: `soma = soma + (item × item)` em vez de `soma = soma + item`. O símbolo Σ acomoda naturalmente qualquer conta que você queira fazer item por item antes de acumular.' },

  { type: 'note', text: 'Resumo formal: `Σᵢ₌₁ⁿ` significa "percorra o índice `i` de 1 até `n`, e some o que está escrito à direita do Σ para cada valor de `i`". É exatamente o mesmo processo do laço com acumulador que você já sabe programar — só embalado num símbolo compacto.' },
  { type: 'p', text: 'Esse símbolo vai aparecer sempre que uma fórmula precisar dizer "some isso para todos os exemplos" ou "some isso para todas as posições de uma lista" — o que é extremamente comum em fórmulas mais adiante no caderno. Sabendo que Σ é só um `for` com acumulador disfarçado de símbolo, nenhuma dessas fórmulas deve assustar.' },
];
