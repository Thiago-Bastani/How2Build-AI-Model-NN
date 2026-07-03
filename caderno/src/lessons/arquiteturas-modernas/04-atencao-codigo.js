export const blocks = [
  { type: 'h1', text: 'Atenção Implementada' },

  { type: 'p', text: 'Você já viu a fórmula completa: `Attention(Q,K,V) = softmax(QKᵀ/√d_k)V`. Aqui está ela rodando de verdade em tf.js, com uma frase pequena de 4 "palavras" representadas por embeddings de brinquedo.' },

  { type: 'h2', text: 'Scaled dot-product attention, passo a passo' },
  { type: 'code', code:
`// 4 "palavras", cada uma já com Q, K, V de dimensão 3 (valores de brinquedo,
// como se já tivessem passado pelas transformações aprendidas de Q/K/V)
const Q = tf.tensor2d([
  [1, 0, 1],
  [0, 1, 1],
  [1, 1, 0],
  [0, 0, 1],
]);
const K = tf.tensor2d([
  [1, 0, 1],
  [0, 1, 1],
  [1, 1, 0],
  [0, 0, 1],
]);
const V = tf.tensor2d([
  [10, 0, 0],
  [0, 10, 0],
  [0, 0, 10],
  [5, 5, 5],
]);

const dK = Q.shape[1]; // dimensão dos vetores de Q/K

// 1) Q · Kᵀ — placar de compatibilidade entre cada par de palavras
const scores = Q.matMul(K.transpose());
print('placar bruto (Q·Kᵀ):');
scores.print();

// 2) escala por √d_k
const scaled = scores.div(tf.scalar(Math.sqrt(dK)));
print('\\nplacar escalado (÷ √d_k):');
scaled.print();

// 3) softmax linha a linha — vira attention weights (soma 1 por linha)
const weights = scaled.softmax();
print('\\nattention weights (cada linha soma 1):');
weights.print();

// 4) soma ponderada dos Values
const output = weights.matMul(V);
print('\\nsaída da atenção (uma linha por palavra):');
output.print();` },

  { type: 'p', text: 'Repare: cada linha de `weights` soma exatamente 1 (é uma distribuição de probabilidade, como esperado do softmax), e cada linha de `output` é uma mistura dos Values, pesada por o quanto aquela palavra "prestou atenção" em cada outra.' },

  { type: 'divider' },
  { type: 'note', text: 'Resumo: a fórmula inteira de atenção é só 4 operações de tensor encadeadas — `matMul`, `div`, `softmax`, `matMul` de novo — todas já conhecidas de aulas anteriores. Numa arquitetura real, Q, K e V não seriam valores fixos como aqui: viriam de multiplicar os embeddings por três matrizes de pesos aprendidas durante o treino.' },
];
