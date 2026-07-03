export const blocks = [
  { type: 'h1', text: 'Transformer Implementado' },

  { type: 'p', text: 'Você já viu a atenção rodando em código, a teoria de multi-head attention, e o bloco Transformer inteiro (atenção + FFN + conexões residuais + layer normalization). Aqui está um bloco completo de verdade — com mais de uma cabeça e com layer normalization implementada — para 4 "palavras" de brinquedo.' },

  { type: 'h2', text: 'Layer normalization, em código' },
  { type: 'p', text: 'Você já viu, na teoria, que layer normalization reaplica a mesma ideia de centralizar-e-reescalar (média e desvio-padrão, já vistos em Probabilidade & Estatística) aos números que saem de cada sub-camada, linha por linha (uma linha por palavra).' },
  { type: 'code', code:
`function layerNorm(x) {
  // média e variância calculadas por LINHA (por palavra), não pela matriz inteira
  const mean = x.mean(1, true);                       // [n, 1]
  const variance = x.sub(mean).square().mean(1, true); // [n, 1]
  const std = variance.add(tf.scalar(1e-6)).sqrt();
  return x.sub(mean).div(std); // cada linha vira média 0, desvio-padrão 1
}` },

  { type: 'h2', text: 'Multi-head attention, de verdade' },
  { type: 'p', text: 'Cada cabeça tem suas próprias matrizes de peso e opera numa fatia menor da dimensão total — se a dimensão do modelo é 4 e temos 2 cabeças, cada cabeça trabalha com Q/K/V de dimensão 2. As saídas das cabeças são concatenadas e passam por uma matriz de saída `Wo`, exatamente como você viu na teoria.' },
  { type: 'code', code:
`function attention(Q, K, V) {
  const dK = Q.shape[1];
  const scores = Q.matMul(K.transpose()).div(tf.scalar(Math.sqrt(dK)));
  return scores.softmax().matMul(V);
}

function multiHeadAttention(X, numHeads, seed) {
  const dModel = X.shape[1];
  const dHead = dModel / numHeads;
  const heads = [];

  for (let h = 0; h < numHeads; h++) {
    const Wq = tf.randomNormal([dModel, dHead], 0, 0.5, 'float32', seed + h * 3 + 1);
    const Wk = tf.randomNormal([dModel, dHead], 0, 0.5, 'float32', seed + h * 3 + 2);
    const Wv = tf.randomNormal([dModel, dHead], 0, 0.5, 'float32', seed + h * 3 + 3);
    const Q = X.matMul(Wq), K = X.matMul(Wk), V = X.matMul(Wv);
    heads.push(attention(Q, K, V)); // [n, dHead]
  }

  const concatenado = tf.concat(heads, 1); // [n, dModel] — todas as cabeças lado a lado
  const Wo = tf.randomNormal([dModel, dModel], 0, 0.5, 'float32', seed + 99);
  return concatenado.matMul(Wo); // mistura final das cabeças
}` },

  { type: 'h2', text: 'O bloco completo: atenção + residual + norm, FFN + residual + norm' },
  { type: 'code', code:
`// 4 "palavras", embeddings de dimensão 4 (valores de brinquedo)
const X = tf.tensor2d([
  [1, 0, 1, 0],
  [0, 1, 0, 1],
  [1, 1, 0, 0],
  [0, 0, 1, 1],
]);

// 1) Multi-head attention, de verdade (2 cabeças)
const attnOut = multiHeadAttention(X, 2, 1);

// 2) Conexão residual + layer norm
const afterAttn = layerNorm(X.add(attnOut));
print('saída depois de multi-head attention + residual + layer norm:');
afterAttn.print();

// 3) Feed-forward network: um MLP pequeno, aplicado a cada palavra (linha)
const ffn = tf.sequential();
ffn.add(tf.layers.dense({ units: 8, inputShape: [4], activation: 'relu' }));
ffn.add(tf.layers.dense({ units: 4 })); // volta ao tamanho original
const ffnOut = ffn.predict(afterAttn);

// 4) Mais uma conexão residual + layer norm
const blockOut = layerNorm(afterAttn.add(ffnOut));
print('\\nsaída final do bloco (depois de FFN + residual + layer norm):');
blockOut.print();` },

  { type: 'p', text: 'Repare no padrão que se repete duas vezes: `LayerNorm(entrada + Sublayer(entrada))` — uma vez para a atenção, uma vez para a FFN. Isso é exatamente o bloco Transformer da teoria, sem simplificações escondidas. Empilhar esse bloco várias vezes, cada um com suas próprias matrizes de peso, forma o modelo completo.' },

  { type: 'divider' },
  { type: 'note', text: 'Resumo: multi-head attention roda cada cabeça numa fatia menor da dimensão, concatena e mistura com `Wo`; layer normalization recentraliza e reescala cada linha usando média e desvio-padrão; as duas conexões residuais (`entrada + Sublayer(entrada)`) protegem o gradiente em blocos empilhados. Este é o bloco Transformer real, do jeito que a teoria descreveu.' },
];
