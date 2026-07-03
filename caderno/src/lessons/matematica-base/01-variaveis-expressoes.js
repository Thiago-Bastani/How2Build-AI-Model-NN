export const blocks = [
  { type: 'h1', text: 'Variáveis e Expressões' },
  { type: 'p', text: 'Imagine uma caixa de papelão com uma etiqueta escrita "idade". Hoje você pode colocar dentro dela o papel com o número 30. Ano que vem, você tira o papel de dentro e coloca outro, com o número 31. A etiqueta da caixa nunca muda — só o que está guardado dentro dela muda.' },
  { type: 'p', text: 'Isso é uma **variável**: uma caixa com um nome fixo, que guarda um valor que pode mudar. O nome da caixa não é o valor — é só o rótulo que você usa pra se referir ao que está guardado ali dentro, sem precisar saber de antemão qual vai ser esse valor.' },
  { type: 'p', text: 'Por que isso é útil? Porque deixa você escrever uma conta **uma única vez** e reaproveitá-la pra qualquer valor que vier a entrar na caixa, sem reescrever a conta toda vez.' },

  { type: 'h2', text: 'Expressões: contas escritas com caixas' },
  { type: 'p', text: 'Pense numa receita de bolo: "misture 2 xícaras de farinha para cada xícara de açúcar". Essa receita não diz "hoje eu uso exatamente 4 xícaras de farinha" — ela diz **como calcular** a quantidade de farinha a partir da quantidade de açúcar, seja ela qual for.' },
  { type: 'p', text: 'Uma **expressão** matemática é exatamente isso: uma receita escrita com caixas (variáveis) em vez de números fixos. Por exemplo, se uma loja vende um produto a um certo preço unitário, o valor total de uma compra é "preço unitário vezes quantidade comprada" — não importa qual seja o preço nem quantas unidades alguém compre, a receita pra calcular o total é sempre a mesma.' },
  { type: 'p', text: 'Quando você troca as caixas pelos valores que elas guardam num momento específico e faz a conta, isso se chama **substituição**: você "substitui" a caixa pelo número de dentro dela e resolve a expressão até sobrar um único resultado.' },

  { type: 'h3', text: 'Exemplo com números' },
  { type: 'p', text: 'Receita: "total = preço unitário vezes quantidade". Se o preço unitário é 8 e a quantidade é 5, você substitui os dois nomes pelos valores e calcula: `8 × 5 = 40`. Se amanhã o preço for outro, digamos 10, e a quantidade for 3, a mesma receita continua valendo: `10 × 3 = 30`. A receita não muda — só o que você põe nas caixas muda.' },
  { type: 'note', text: 'Resumo: variável = caixa com nome fixo e valor trocável. Expressão = uma receita de conta escrita usando essas caixas. Substituir = trocar cada caixa pelo valor de dentro dela e resolver a conta.' },

  { type: 'h2', text: 'A notação formal' },
  { type: 'p', text: 'Na matemática, em vez de escrever "preço unitário" e "quantidade" por extenso toda vez, usamos letras curtas como nomes das caixas — geralmente `x`, `y`, `n`, ou uma letra que lembre o que ela representa. Uma expressão fica assim:' },
  { type: 'formal', eq: 'E(x) = 3x + 5', legend: [
    '`E` — o nome que demos a essa expressão, só pra poder falar dela depois',
    '`(x)` — indica que essa expressão depende da caixa `x`; troque `x` e o resultado muda',
    '`x` — a variável: a caixa cujo valor ainda não foi decidido',
    '`3x` — abreviação de "3 vezes o valor guardado em `x`" — em matemática, colocar um número colado numa letra sempre significa multiplicação',
    '`+ 5` — um número fixo somado ao resultado, chamado de **constante**, porque ele não muda nunca, não importa o que você colocar em `x`',
  ]},
  { type: 'p', text: 'Substituir significa trocar `x` por um valor concreto e calcular. Se `x = 2`:' },
  { type: 'formula', text: 'E(2) = 3×2 + 5 = 6 + 5 = 11' },
  { type: 'p', text: 'Se `x = 10`, a mesma receita dá um resultado diferente: `E(10) = 3×10 + 5 = 35`. A expressão é sempre a mesma — só o valor substituído muda o resultado.' },

  { type: 'h3', text: 'Expressões com mais de uma caixa' },
  { type: 'p', text: 'Nada impede uma expressão de depender de mais de uma variável ao mesmo tempo. O exemplo da compra é assim: o total depende do preço **e** da quantidade, duas caixas diferentes.' },
  { type: 'formal', eq: 'T(p, q) = p × q', legend: [
    '`T` — nome da expressão (total)',
    '`(p, q)` — duas variáveis das quais o resultado depende: preço (`p`) e quantidade (`q`)',
    '`p × q` — a receita: multiplique o valor de uma caixa pelo valor da outra',
  ]},
  { type: 'p', text: 'Substituindo `p = 8` e `q = 5`: `T(8, 5) = 8 × 5 = 40`. Cada caixa é substituída pelo seu próprio valor, na mesma conta.' },

  { type: 'note', text: 'Se você já programa, você já usa exatamente essa ideia: uma variável em código (`let preco = 8`) é a mesma caixa-com-nome-e-valor-trocável da matemática. A diferença é só de contexto — aqui a caixa guarda um número usado numa conta, lá ela guarda um dado usado num programa.' },
  { type: 'p', text: 'Existe um caso especial de variável que vai reaparecer bastante daqui pra frente: quando o próprio sistema que está fazendo a conta é quem escolhe o valor de uma variável sozinho — ajustando-o repetidamente até a conta funcionar bem — a literatura de IA dá a essa variável um nome específico: **parâmetro**. Por enquanto, guarde só isso: parâmetro é uma variável, só que quem decide seu valor não é você digitando um número, é o próprio processo de cálculo, ajustando-o sozinho.' },
];
