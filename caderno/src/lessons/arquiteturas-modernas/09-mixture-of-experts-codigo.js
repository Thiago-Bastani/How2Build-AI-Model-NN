export const blocks = [
  { type: 'h1', text: 'Mixture of Experts Implementado' },

  { type: 'p', text: 'Última aula do caderno. Você já viu a teoria completa: vários experts (MLPs comuns) e um roteador (camada densa + softmax) que escolhe os top-k experts por token. Aqui está uma versão pequena disso tudo, rodando de verdade — 4 experts, top-2 routing, 3 tokens de brinquedo.' },

  { type: 'h2', text: 'Montando os experts' },
  { type: 'code', code:
`const NUM_EXPERTS = 4;
const DIM = 4;

// Cada expert é um MLP pequeno e independente — igual ao que você já treinou
function criarExpert(seed) {
  const m = tf.sequential();
  m.add(tf.layers.dense({ units: 8, inputShape: [DIM], activation: 'relu' }));
  m.add(tf.layers.dense({ units: DIM }));
  return m;
}
const experts = Array.from({ length: NUM_EXPERTS }, (_, i) => criarExpert(i));

// O roteador: uma camada densa + softmax, decidindo pesos sobre os experts
const roteador = tf.sequential();
roteador.add(tf.layers.dense({ units: NUM_EXPERTS, inputShape: [DIM], activation: 'softmax' }));

print(\`Criados \${NUM_EXPERTS} experts + 1 roteador.\`);` },

  { type: 'h2', text: 'Top-k routing' },
  { type: 'code', code:
`const K = 2; // ativa só os 2 experts mais relevantes por token

function moeForward(x) {
  // x: tensor2d [1, DIM] — um token
  const pesos = roteador.predict(x); // [1, NUM_EXPERTS], soma 1
  const pesosArr = pesos.dataSync();

  // Acha os índices dos K maiores pesos (top-k routing)
  const indices = [...pesosArr.keys()]
    .sort((a, b) => pesosArr[b] - pesosArr[a])
    .slice(0, K);

  print(\`  roteador escolheu experts [\${indices.join(', ')}]  (pesos: \${indices.map(i => pesosArr[i].toFixed(3)).join(', ')})\`);

  // Soma ponderada das saídas SÓ dos experts escolhidos
  let saida = tf.zeros([1, DIM]);
  for (const i of indices) {
    const saidaExpert = experts[i].predict(x);
    saida = saida.add(saidaExpert.mul(tf.scalar(pesosArr[i])));
  }
  return saida;
}

// 3 tokens de brinquedo
const tokens = [
  tf.tensor2d([[1, 0, 1, 0]]),
  tf.tensor2d([[0, 1, 0, 1]]),
  tf.tensor2d([[1, 1, 1, 1]]),
];

tokens.forEach((token, i) => {
  print(\`token \${i}:\`);
  const saida = moeForward(token);
  saida.print();
});` },

  { type: 'p', text: 'Repare que cada token, ao passar pelo roteador, pode acionar um conjunto diferente de experts — exatamente como visto na teoria. Os experts não escolhidos para um dado token nem são executados: `experts[i].predict` só é chamado para os índices dentro de `indices`, o que é a própria definição de sparse activation em código.' },

  { type: 'divider' },
  { type: 'note', text: 'Você chegou ao fim do caderno: começou em tensores e um único neurônio, e terminou implementando o mecanismo por trás de arquiteturas de linguagem de grande escala usadas hoje. Cada peça que você viu — produto de matrizes, gradiente, backpropagation, softmax, atenção — está presente, em algum grau, dentro deste último bloco de código. Nada aqui foi mágica: foi construção, uma aula de cada vez.' },
];
