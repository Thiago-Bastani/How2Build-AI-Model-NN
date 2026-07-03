export const blocks = [
  { type: 'h1', text: 'Tensores em Código' },
  { type: 'p', text: 'Você já viu, na Álgebra Linear, que um tensor é a generalização de escalar/vetor/matriz pra N dimensões. Aqui é a mesma ideia, só que rodando de verdade, no navegador, usando `@tensorflow/tfjs` — a biblioteca que faz essas contas rápido.' },

  { type: 'h2', text: 'Criando tensores' },
  { type: 'code', code:
`// Criando tensores de diferentes dimensões
const escalar = tf.scalar(42);
const vetor   = tf.tensor1d([1, 2, 3, 4]);
const matriz  = tf.tensor2d([[1, 2, 3], [4, 5, 6]]);

print('shape do escalar:', escalar.shape);  // []
print('shape do vetor:  ', vetor.shape);    // [4]
print('shape da matriz: ', matriz.shape);   // [2, 3]

print('\\nconteúdo da matriz:');
matriz.print();` },

  { type: 'h2', text: 'Operações elemento a elemento' },
  { type: 'p', text: 'Todas as operações numéricas básicas funcionam elemento a elemento por padrão — diferente de arrays comuns em JS, que exigiriam um loop.' },
  { type: 'code', code:
`const a = tf.tensor1d([1, 2, 3]);
const b = tf.tensor1d([4, 5, 6]);

print('a + b:'); a.add(b).print();   // [5, 7, 9]
print('a * b:'); a.mul(b).print();   // [4, 10, 18]
print('a²:');    a.square().print(); // [1, 4, 9]

// Operações com escalar aplicam em todos os elementos
print('b * 10:'); b.mul(tf.scalar(10)).print(); // [40, 50, 60]` },

  { type: 'h2', text: 'O neurônio em código' },
  { type: 'p', text: 'A aula de Perceptron mostrou que um neurônio é `ativação(entrada · pesos + bias)`. O `·` ali é o `matMul` que você já viu em Produto de Matrizes.' },
  { type: 'code', code:
`// 1 amostra com 3 features → shape [1, 3]
const entrada = tf.tensor2d([[1, 2, 3]]);

// 3 entradas → 1 saída → shape [3, 1]
const pesos   = tf.tensor2d([[0.5], [0.3], [0.2]]);
const bias    = tf.scalar(0.1);

// [1,3] × [3,1] = [1,1]  ← produto de matrizes
const saida = entrada.matMul(pesos).add(bias);

print('resultado do neurônio:');
saida.print();
// 1*0.5 + 2*0.3 + 3*0.2 + 0.1 = 1.8

print('\\nExperimente mudar os pesos e o bias acima!')` },

  { type: 'h2', text: 'Funções de ativação em código' },
  { type: 'p', text: 'As ativações que você viu na aula de Funções de Ativação já vêm prontas no tf.js.' },
  { type: 'code', code:
`const x = tf.tensor1d([-3, -1, 0, 1, 3]);

print('entrada:'); x.print();

print('\\nReLU (max(0,x)):');
x.relu().print();

print('\\nSigmoid:');
x.sigmoid().print();

print('\\nTanh:');
x.tanh().print();

// Softmax: distribui probabilidade entre classes
const logits = tf.tensor1d([2.0, 1.0, 0.5, 0.1]);
print('\\nSoftmax de [2.0, 1.0, 0.5, 0.1]:');
logits.softmax().print();
// Soma sempre = 1.0 (é a distribuição de probabilidade vista em Softmax)` },

  { type: 'divider' },
  { type: 'note', text: 'Resumo: tensores são criados com `tf.scalar/tensor1d/tensor2d/...`, operações elemento a elemento usam `.add/.mul/.square`, e `matMul` implementa o produto de matrizes que já era familiar da Álgebra Linear.' },
];
