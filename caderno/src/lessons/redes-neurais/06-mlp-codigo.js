export const blocks = [
  { type: 'h1', text: 'MLP Implementado' },

  { type: 'p', text: 'A aula de Camadas e Redes Densas mostrou que um MLP é uma sequência de camadas densas, cada uma calculando `f(X · W + b)`. Em tf.js, você não precisa montar essa conta manualmente camada por camada — existe `tf.sequential()` e `tf.layers.dense()` prontos pra isso.' },

  { type: 'h2', text: 'Um modelo sequencial: uma linha de montagem' },

  { type: 'p', text: 'Um modelo sequencial encadeia camadas na ordem em que você as adiciona — a saída de uma vira a entrada da próxima, exatamente como na aula de matemática.' },

  { type: 'code', code:
`const model = tf.sequential();

// Uma camada densa com 1 neurônio, recebendo 1 feature de entrada
model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

print('Modelo criado!');
print('Parâmetros totais:', model.countParams());
// → 2 parâmetros: 1 peso (a coluna da matriz W) + 1 bias` },

  { type: 'p', text: 'Com `units: 1` e `inputShape: [1]`, essa camada é literalmente um neurônio só — a equação de uma reta, `y = w·x + b`.' },

  { type: 'h2', text: 'Empilhando camadas: profundidade de verdade' },

  { type: 'code', code:
`// 4 features de entrada → 2 camadas escondidas → 1 saída
const model2 = tf.sequential();

model2.add(tf.layers.dense({ units: 8, inputShape: [4], activation: 'relu' }));
model2.add(tf.layers.dense({ units: 4, activation: 'relu' }));
model2.add(tf.layers.dense({ units: 1 })); // camada de saída, sem ativação (regressão)

model2.summary();
// Mostra cada camada, o shape de saída e quantos parâmetros cada uma tem` },

  { type: 'note', text: '`inputShape` só é necessário na primeira camada. As camadas seguintes já sabem seu shape de entrada — é o shape de saída da camada anterior.' },

  { type: 'h2', text: 'MLP para classificação: softmax na saída' },

  { type: 'p', text: 'Pra um problema de classificação com várias categorias, a última camada troca a ativação: em vez de deixar passar direto (regressão) ou usar ReLU, ela usa `softmax` — a mesma que você já implementou, aqui aplicada como a ativação da camada final.' },

  { type: 'code', code:
`// Classificar entre 3 categorias, a partir de 4 features
const classifier = tf.sequential();

classifier.add(tf.layers.dense({ units: 16, inputShape: [4], activation: 'relu' }));
classifier.add(tf.layers.dense({ units: 8,  activation: 'relu' }));
classifier.add(tf.layers.dense({ units: 3,  activation: 'softmax' })); // 3 classes

classifier.summary();

// Testando com uma entrada de exemplo (pesos ainda aleatórios, sem treino)
const entradaExemplo = tf.tensor2d([[1, 2, 3, 4]]);
const saida = classifier.predict(entradaExemplo);
print('\\nsaída (distribuição sobre 3 classes, pesos aleatórios):');
saida.print();
print('soma das probabilidades:', saida.sum().dataSync()[0]);` },

  { type: 'divider' },
  { type: 'note', text: 'Resumo: `tf.sequential()` cria o modelo, `tf.layers.dense({ units, activation })` adiciona cada camada. `units` decide quantos neurônios; `activation` decide qual função de ativação usar (`relu`, `sigmoid`, `softmax`, ou nenhuma). A ordem em que você chama `.add()` define a ordem das camadas.' },
];
