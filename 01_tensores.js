const tf = require('@tensorflow/tfjs');

// ─── O QUE É UM TENSOR ────────────────────────────────────────────────────────
// Tensor = array N-dimensional. É a unidade básica de tudo em ML.
//
//   escalar  (0D) → um número:          42
//   vetor    (1D) → array:              [1, 2, 3]
//   matriz   (2D) → array de arrays:   [[1,2],[3,4]]
//   tensor   (3D+) → ex: imagem RGB:   [[[r,g,b], ...], ...]

const escalar = tf.scalar(42);
const vetor   = tf.tensor1d([1, 2, 3]);
const matriz  = tf.tensor2d([[1, 2], [3, 4]]);

console.log('=== FORMAS (shapes) ===');
console.log('escalar:', escalar.shape);   // []
console.log('vetor:  ', vetor.shape);     // [3]
console.log('matriz: ', matriz.shape);    // [2, 2]

// ─── OPERAÇÕES MATEMÁTICAS ────────────────────────────────────────────────────
// Todas as operações são aplicadas elemento a elemento por padrão.

const a = tf.tensor1d([1, 2, 3]);
const b = tf.tensor1d([4, 5, 6]);

console.log('\n=== OPERAÇÕES BÁSICAS ===');
a.add(b).print();       // [5, 7, 9]
a.mul(b).print();       // [4, 10, 18]
a.sub(b).print();       // [-3, -3, -3]

// ─── POR QUE ISSO IMPORTA EM ML ──────────────────────────────────────────────
// Em redes neurais, cada "camada" faz basicamente isso:
//
//   saída = ativação( entrada · pesos + bias )
//
// Onde · é produto de matrizes (dot product).

const entrada = tf.tensor2d([[1, 2, 3]]);          // shape [1, 3]  → 1 amostra, 3 features
const pesos   = tf.tensor2d([[0.5], [0.3], [0.2]]); // shape [3, 1]  → 3 entradas, 1 saída
const bias    = tf.scalar(0.1);

// produto de matrizes: [1,3] × [3,1] = [1,1]
const saida_linear = entrada.matMul(pesos).add(bias);

console.log('\n=== NEURÔNIO SIMPLES (sem ativação) ===');
saida_linear.print(); // 1*0.5 + 2*0.3 + 3*0.2 + 0.1 = 1.8

// ─── FUNÇÕES DE ATIVAÇÃO ─────────────────────────────────────────────────────
// Sem ativação, qualquer rede neural é só uma regressão linear.
// Ativações introduzem não-linearidade — é isso que permite aprender padrões complexos.

const valores = tf.tensor1d([-2, -1, 0, 1, 2]);

console.log('\n=== FUNÇÕES DE ATIVAÇÃO ===');

// ReLU: max(0, x) — simples, funciona bem em camadas intermediárias
// "Se negativo, vira 0. Se positivo, passa igual."
console.log('ReLU:');
valores.relu().print();    // [0, 0, 0, 1, 2]

// Sigmoid: 1 / (1 + e^-x) — espreme tudo entre 0 e 1
// Usada na saída de classificadores binários (sim/não)
console.log('Sigmoid:');
valores.sigmoid().print(); // [0.12, 0.27, 0.5, 0.73, 0.88]

// Softmax: normaliza um vetor pra somar 1 (distribuição de probabilidade)
// Usada na saída de classificadores com múltiplas classes
console.log('Softmax (para classificação multi-classe):');
tf.tensor1d([2.0, 1.0, 0.1]).softmax().print(); // soma = 1.0

// ─── GRADIENTE: A MATEMÁTICA DO APRENDIZADO ──────────────────────────────────
// O gradiente diz: "se eu mudar esse parâmetro um pouquinho, o erro sobe ou desce?"
// O TF calcula isso automaticamente com tf.grad()

const f = x => x.square(); // f(x) = x²  →  derivada = 2x

const grad_f = tf.grad(f);

console.log('\n=== GRADIENTE de x² em x=3 ===');
grad_f(tf.scalar(3)).print(); // deve ser 6  (2 * 3)

console.log('\n=== GRADIENTE de x² em x=-2 ===');
grad_f(tf.scalar(-2)).print(); // deve ser -4  (2 * -2)

// O gradiente negativo aponta para onde o erro DIMINUI.
// O treino move os pesos nessa direção — isso é o "gradient descent".
