export const blocks = [
  { type: 'h1', text: 'Funções de Ativação Implementadas' },

  { type: 'p', text: 'A aula anterior derivou ReLU, Sigmoid e Tanh — o formato de cada curva e quando usar cada uma. Em tf.js, cada uma já vem pronta como método de tensor, então aplicar é uma chamada só.' },

  { type: 'h2', text: 'ReLU, Sigmoid e Tanh lado a lado' },

  { type: 'code', code:
`const z = tf.tensor1d([-3, -1, 0, 1, 3]);

print('entrada (soma pesada z):');
z.print();

print('\\nReLU — max(0, z):');
z.relu().print();

print('\\nSigmoid — espreme entre 0 e 1:');
z.sigmoid().print();

print('\\nTanh — espreme entre -1 e 1:');
z.tanh().print();` },

  { type: 'h2', text: 'Aplicando a ativação depois do neurônio' },

  { type: 'p', text: 'Retomando o neurônio da aula de Perceptron Implementado: agora fechamos o que faltava, aplicando a ativação em cima da soma pesada.' },

  { type: 'code', code:
`const x = tf.tensor2d([[1, 2, 3]]);
const w = tf.tensor2d([[0.5], [0.3], [0.2]]);
const b = tf.scalar(0.1);

const somaPonderada = x.matMul(w).add(b);
print('soma pesada:', somaPonderada.dataSync()[0]);

// Agora sim, o neurônio completo: f(x·w + b)
const saidaRelu    = somaPonderada.relu();
const saidaSigmoid = somaPonderada.sigmoid();

print('neurônio com ReLU:   ', saidaRelu.dataSync()[0]);
print('neurônio com Sigmoid:', saidaSigmoid.dataSync()[0]);` },

  { type: 'h2', text: 'Softmax: a ativação de uma camada inteira' },

  { type: 'p', text: 'Diferente de ReLU/Sigmoid/Tanh, que atuam número a número, a softmax (já vista na Trilha de Probabilidade) atua sobre um vetor inteiro de uma vez — transformando um grupo de números em uma distribuição de probabilidade que soma 1. É a ativação típica da última camada de um classificador.' },

  { type: 'code', code:
`const logits = tf.tensor1d([2.0, 1.0, 0.5, 0.1]); // saída bruta pra 4 classes

print('logits (antes da softmax):');
logits.print();

print('\\ndepois da softmax:');
logits.softmax().print();
// cada valor entre 0 e 1, e a soma total é exatamente 1.0

print('\\nsoma total:', logits.softmax().sum().dataSync()[0]);` },

  { type: 'divider' },
  { type: 'note', text: 'Resumo: `.relu()`, `.sigmoid()` e `.tanh()` transformam cada número do tensor independentemente; `.softmax()` transforma o vetor inteiro numa distribuição de probabilidade. Todas encaixam direto depois de `matMul(...).add(bias)`.' },
];
