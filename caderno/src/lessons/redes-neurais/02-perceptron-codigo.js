export const blocks = [
  { type: 'h1', text: 'Perceptron Implementado' },

  { type: 'p', text: 'A aula anterior mostrou que um neurônio é `f(x · w + b)` — um produto escalar entre entrada e pesos, mais um bias, passado por uma função de decisão. Aqui é isso rodando de verdade em tf.js, reaproveitando o `matMul` que você já viu na Trilha de Implementação.' },

  { type: 'h2', text: 'Um neurônio, uma entrada' },

  { type: 'code', code:
`// x · w + b, com uma amostra de 3 entradas
const x = tf.tensor2d([[1, 2, 3]]);      // shape [1, 3] — 1 amostra, 3 features
const w = tf.tensor2d([[0.5], [0.3], [0.2]]); // shape [3, 1] — 1 peso por entrada
const b = tf.scalar(0.1);

// matMul faz o produto escalar de cada amostra com os pesos
const somaPonderada = x.matMul(w).add(b);

print('soma pesada (antes da ativação):');
somaPonderada.print();
// 1*0.5 + 2*0.3 + 3*0.2 + 0.1 = 1.8` },

  { type: 'p', text: 'Por enquanto não aplicamos nenhuma função de decisão em cima — isso é assunto da próxima aula. `somaPonderada` já é o neurônio completo, faltando só essa última etapa.' },

  { type: 'h2', text: 'Vários neurônios ao mesmo tempo, mesma entrada' },

  { type: 'p', text: 'Nada impede de calcular vários neurônios de uma vez — cada coluna de `w` é um neurônio diferente, cada um com seu próprio vetor de pesos.' },

  { type: 'code', code:
`const x2 = tf.tensor2d([[1, 2, 3]]);          // 1 amostra, 3 features
const w2 = tf.tensor2d([                      // 3 entradas → 2 neurônios
  [0.5, -0.2],
  [0.3,  0.8],
  [0.2,  0.1],
]);
const b2 = tf.tensor1d([0.1, -0.3]);

const saida = x2.matMul(w2).add(b2);
print('saída dos 2 neurônios:');
saida.print(); // shape [1, 2] — um valor por neurônio` },

  { type: 'h2', text: 'Vários exemplos ao mesmo tempo (batch)' },

  { type: 'p', text: 'A mesma conta funciona pra várias amostras de uma vez só — cada linha de `x` é uma amostra independente, e o `matMul` calcula a soma pesada de todas em paralelo.' },

  { type: 'code', code:
`const X = tf.tensor2d([   // 3 amostras, 3 features cada
  [1, 2, 3],
  [0, 1, 0],
  [2, 2, 2],
]);
const w3 = tf.tensor2d([[0.5], [0.3], [0.2]]);
const b3 = tf.scalar(0.1);

const saidas = X.matMul(w3).add(b3);
print('saída para as 3 amostras:');
saidas.print(); // shape [3, 1] — uma saída por amostra

print('\\nExperimente mudar os pesos, o bias, ou adicionar mais amostras em X!');` },

  { type: 'divider' },
  { type: 'note', text: 'Resumo: o neurônio inteiro é `entrada.matMul(pesos).add(bias)`. Trocar o número de colunas em `pesos` muda quantos neurônios você calcula de uma vez; trocar o número de linhas em `entrada` muda quantas amostras processa de uma vez — sempre a mesma conta, em paralelo.' },
];
