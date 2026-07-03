export const tensores = [
  { type: 'h1', text: 'Tensores & a Matemática de ML' },
  { type: 'p', text: 'Pensa numa planilha do Excel. Uma célula isolada é um número só. Uma linha de células é uma lista de valores — os preços de cada produto, por exemplo. A planilha inteira é uma grade: linhas por colunas. E se você empilhar várias planilhas uma sobre a outra, como páginas de um caderno? Você tem um bloco tridimensional de números. Isso é exatamente o que é um **tensor** — um jeito de organizar números em diferentes dimensões. A palavra intimida, mas o conceito você já usa todo dia.' },
  { type: 'p', text: 'Em ML, tudo passa por tensores: as imagens que a rede processa, os pesos que ela aprende, os erros que ela calcula. Entender tensores é entender o idioma do TensorFlow.' },

  // ── Tensores ──────────────────────────────────────────────────────────────
  { type: 'h2', text: 'O que é um Tensor?' },
  { type: 'p', text: 'Tensor é um array N-dimensional. Cada "nível" a mais de dimensão é uma nova forma de organizar os dados:' },
  { type: 'list', items: [
    '**Escalar (0D)** — um número: `42`',
    '**Vetor (1D)** — um array: `[1, 2, 3]`',
    '**Matriz (2D)** — array de arrays: `[[1,2],[3,4]]`',
    '**Tensor (3D+)** — ex: uma imagem colorida tem shape `[altura, largura, 3]` (3 canais: R, G, B)',
  ]},
  { type: 'p', text: 'O **shape** descreve as dimensões. Uma matriz 3×4 tem shape `[3, 4]` — 3 linhas, 4 colunas.' },
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

  // ── Operações ─────────────────────────────────────────────────────────────
  { type: 'h2', text: 'Operações Matemáticas' },
  { type: 'p', text: 'Todas as operações numéricas básicas funcionam **elemento a elemento** por padrão. Isso é diferente de arrays normais em JS.' },
  { type: 'code', code:
`const a = tf.tensor1d([1, 2, 3]);
const b = tf.tensor1d([4, 5, 6]);

print('a + b:'); a.add(b).print();   // [5, 7, 9]
print('a * b:'); a.mul(b).print();   // [4, 10, 18]
print('a²:');    a.square().print(); // [1, 4, 9]

// Operações com escalar aplicam em todos os elementos
print('b * 10:'); b.mul(tf.scalar(10)).print(); // [40, 50, 60]` },

  // ── Neurônio ──────────────────────────────────────────────────────────────
  { type: 'h2', text: 'Um Neurônio na Prática' },
  { type: 'p', text: 'Em redes neurais, cada neurônio faz exatamente esta conta:' },
  { type: 'formula', text: 'saída = ativação( entrada · pesos + bias )' },
  { type: 'p', text: 'O `·` é o **produto de matrizes** (dot product), não multiplicação simples. Ele combina múltiplas entradas num único número de saída.' },
  { type: 'p', text: 'Pensa assim: você tem 3 features (ex: quartos, área, andar). Cada uma tem um **peso** que diz o quanto importa. O bias é um ajuste fixo, como o intercepto numa reta.' },
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

  // ── Ativações ─────────────────────────────────────────────────────────────
  { type: 'h2', text: 'Funções de Ativação' },
  { type: 'p', text: 'Sem uma função de ativação, qualquer rede neural — não importa quantas camadas — é matematicamente equivalente a uma **regressão linear**. A ativação introduz **não-linearidade**, que é o que permite aprender padrões complexos.' },
  { type: 'list', items: [
    '**ReLU** — `max(0, x)`. Simples e eficiente. Padrão para camadas intermediárias.',
    '**Sigmoid** — espreme tudo entre 0 e 1. Usada na saída de classificadores binários (sim/não).',
    '**Softmax** — normaliza um vetor pra somar 1. Usada na saída de classificadores com múltiplas classes.',
    '**Tanh** — similar à sigmoid mas vai de -1 a 1. Usada em alguns contextos de RNNs.',
  ]},
  { type: 'code', code:
`const x = tf.tensor1d([-3, -1, 0, 1, 3]);

print('entrada:'); x.print();

print('\\nReLU (max(0,x)) — zera negativos:');
x.relu().print();

print('\\nSigmoid — espreme entre 0 e 1:');
x.sigmoid().print();

print('\\nTanh — espreme entre -1 e 1:');
x.tanh().print();

// Softmax: distribui probabilidade entre classes
const logits = tf.tensor1d([2.0, 1.0, 0.5, 0.1]);
print('\\nSoftmax de [2.0, 1.0, 0.5, 0.1]:');
logits.softmax().print();
// Soma sempre = 1.0 (é uma distribuição de probabilidade)` },

  { type: 'note', text: '**Quando usar qual?** Camadas intermediárias → ReLU. Saída binária (0 ou 1) → Sigmoid. Saída com N classes → Softmax. Não existe regra absoluta, mas essas são as escolhas padrão.' },

  // ── Gradiente ─────────────────────────────────────────────────────────────
  { type: 'h2', text: 'Gradiente: a Matemática do Aprendizado' },
  { type: 'p', text: 'O gradiente é a **derivada** da função de erro em relação aos pesos. Ele responde: "se eu mudar este peso um pouquinho, o erro sobe ou desce?"' },
  { type: 'p', text: 'O treino move os pesos na direção **oposta** ao gradiente — porque queremos diminuir o erro. Isso é o **gradient descent**.' },
  { type: 'formula', text: 'novo_peso = peso − taxa_de_aprendizado × gradiente' },
  { type: 'p', text: 'O TensorFlow calcula gradientes automaticamente — você não precisa fazer a matemática na mão. Isso se chama **autodiff** (diferenciação automática).' },
  { type: 'code', code:
`// Exemplo simples: gradiente de f(x) = x²
// Derivada analítica: f'(x) = 2x

const grad_quadrado = tf.grad(x => x.square());

print('f(x) = x²');
print('gradiente em x=3:',  grad_quadrado(tf.scalar(3)).dataSync()[0]);   // 6  (2*3)
print('gradiente em x=-2:', grad_quadrado(tf.scalar(-2)).dataSync()[0]);  // -4 (2*-2)
print('gradiente em x=0:',  grad_quadrado(tf.scalar(0)).dataSync()[0]);   // 0  (mínimo)

// Gradiente = 0 no mínimo → é por isso que o treino converge!
// No mínimo, não tem mais direção pra ir.` },

  { type: 'h3', text: 'Visualizando o Gradient Descent' },
  { type: 'p', text: 'Imagina que o erro é uma colina. O gradiente aponta morro acima. Você anda na direção **oposta** (morro abaixo). A `taxa_de_aprendizado` controla o tamanho do passo — muito grande e você pula o vale, muito pequena e demora demais.' },
  { type: 'code', code:
`// Simulação manual de gradient descent
// Objetivo: encontrar o mínimo de f(x) = (x - 3)²
// Mínimo real: x = 3

const f     = x => Math.pow(x - 3, 2);
const gradf = x => 2 * (x - 3);    // derivada de (x-3)²

let x   = 0.0;   // começa em 0
const lr = 0.1;  // taxa de aprendizado

for (let step = 0; step < 10; step++) {
  const erro = f(x);
  const grad = gradf(x);
  x = x - lr * grad;  // dá um passo na direção oposta ao gradiente
  print(\`step \${step+1}: x=\${x.toFixed(4)} | erro=\${erro.toFixed(4)} | grad=\${grad.toFixed(4)}\`);
}

print('\\nConvergiu para x =', x.toFixed(4), '(esperado: 3)');` },

  { type: 'divider' },
  { type: 'note', text: '**Resumo da aula:** Tensores são arrays N-dimensionais. Um neurônio faz `ativação(entrada · pesos + bias)`. A ativação adiciona não-linearidade. O gradiente diz em qual direção ajustar os pesos. O TF calcula tudo isso automaticamente.' },
];
