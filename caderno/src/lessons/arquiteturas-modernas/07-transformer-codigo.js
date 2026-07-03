export const blocks = [
  { type: 'h1', text: 'Transformer Implementado' },

  { type: 'p', text: 'Você já viu a atenção rodando em código e a teoria do bloco Transformer inteiro. Aqui está um bloco simplificado — atenção seguida de uma FFN pequena, com a conexão residual — para 4 "palavras" de brinquedo, reaproveitando a função de atenção da aula anterior.' },

  { type: 'code', code:
`function attention(Q, K, V) {
  const dK = Q.shape[1];
  const scores = Q.matMul(K.transpose()).div(tf.scalar(Math.sqrt(dK)));
  return scores.softmax().matMul(V);
}

// 4 "palavras", embeddings de dimensão 4 (valores de brinquedo)
const X = tf.tensor2d([
  [1, 0, 1, 0],
  [0, 1, 0, 1],
  [1, 1, 0, 0],
  [0, 0, 1, 1],
]);

// Matrizes de peso "aprendidas" (aqui, fixas só pra demonstrar o formato)
const Wq = tf.randomNormal([4, 4], 0, 0.5, 'float32', 1);
const Wk = tf.randomNormal([4, 4], 0, 0.5, 'float32', 2);
const Wv = tf.randomNormal([4, 4], 0, 0.5, 'float32', 3);

// 1) Multi-head attention (aqui, 1 cabeça só, pra simplicidade)
const Q = X.matMul(Wq);
const K = X.matMul(Wk);
const V = X.matMul(Wv);
const attnOut = attention(Q, K, V);

// 2) Conexão residual: soma a entrada original de volta
const afterAttn = X.add(attnOut);
print('saída depois de atenção + residual:');
afterAttn.print();

// 3) Feed-forward network: um MLP pequeno, aplicado a cada palavra (linha)
const ffn = tf.sequential();
ffn.add(tf.layers.dense({ units: 8, inputShape: [4], activation: 'relu' }));
ffn.add(tf.layers.dense({ units: 4 })); // volta ao tamanho original
const ffnOut = ffn.predict(afterAttn);

// 4) Mais uma conexão residual
const blockOut = afterAttn.add(ffnOut);
print('\\nsaída final do bloco (depois de FFN + residual):');
blockOut.print();` },

  { type: 'p', text: 'Repare no padrão que se repete: `entrada + Sublayer(entrada)`, duas vezes — uma para a atenção, uma para a FFN. Numa implementação de produção, ainda entraria layer normalization entre cada etapa (já visto na teoria), e múltiplas cabeças em vez de uma só — mas o esqueleto de tensores e produtos de matrizes é exatamente este.' },

  { type: 'divider' },
  { type: 'note', text: 'Resumo: um bloco Transformer em código é a função de atenção (já implementada) somada residualmente à entrada, seguida de um MLP pequeno (`tf.sequential` comum) também somado residualmente. Empilhar esse bloco várias vezes, com pesos diferentes em cada camada, forma o modelo completo.' },
];
