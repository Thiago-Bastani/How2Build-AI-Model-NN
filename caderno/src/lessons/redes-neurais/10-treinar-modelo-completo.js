export const blocks = [
  { type: 'h1', text: 'Treinando um Modelo Completo' },

  { type: 'p', text: 'Você já tem todas as peças: um MLP montado (`tf.sequential`), uma loss escolhida, e o gradiente calculado automaticamente por autodiff. Falta só juntar tudo num loop de treino de verdade — e é exatamente isso que `model.compile` + `model.fit` fazem por você.' },

  { type: 'h2', text: 'Compilar: escolher loss e otimizador' },
  { type: 'code', code:
`const model = tf.sequential();
model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

model.compile({
  optimizer: 'adam',        // gradient descent adaptativo, já visto em Cálculo
  loss: 'meanSquaredError', // MSE, já visto na aula de Função de Custo
});

print('Compilado! Pronto pra treinar.');` },
  { type: 'p', text: 'O otimizador `adam` aplica, a cada passo, exatamente o algoritmo de Gradient Descent que você já viu na trilha de Cálculo — só que ajustando automaticamente o tamanho do passo (a taxa de aprendizado) conforme o treino avança.' },

  { type: 'h2', text: 'Epoch e batch: o ritmo do treino' },
  { type: 'p', text: 'Uma **epoch** é uma passagem completa pelo dataset de treino inteiro. Dentro de cada epoch, os dados são divididos em **batches** (lotes menores) — o modelo olha um batch, calcula a loss, calcula o gradiente (via backpropagation/autodiff), ajusta os pesos, e passa pro próximo batch, até a epoch terminar.' },
  { type: 'list', items: [
    '**Batch grande** (64, 128...) — gradiente mais estável, mais memória usada',
    '**Batch pequeno** (8, 16...) — gradiente mais ruidoso, mas às vezes ajuda a escapar de mínimos ruins',
    '**Padrão seguro**: 32',
  ]},

  { type: 'h2', text: 'Exemplo completo: tamanho da pizza → preço' },
  { type: 'p', text: 'Dados com relação aproximada `preço ≈ 1.2 × diâmetro`, com um pouco de ruído — como dados reais sempre têm.' },
  { type: 'code', code:
`const tamanhos = tf.tensor2d([20,25,28,30,32,35,38,40,42,45], [10,1]);
const precos   = tf.tensor2d([24,30,33,36,38,42,45,48,50,54], [10,1]);

// Normaliza pro intervalo [0, 1] — mesma escala (já visto em Preparar Dados)
const tMax = tamanhos.max();
const pMax = precos.max();
const X = tamanhos.div(tMax);
const Y = precos.div(pMax);

const model2 = tf.sequential();
model2.add(tf.layers.dense({ units: 1, inputShape: [1] }));
model2.compile({ optimizer: 'adam', loss: 'meanSquaredError' });

await model2.fit(X, Y, {
  epochs: 300,
  verbose: 0,
  callbacks: {
    onEpochEnd: (epoch, logs) => {
      if (epoch % 100 === 0) print(\`Epoch \${epoch}: loss = \${logs.loss.toFixed(6)}\`);
    }
  }
});

const pmax = pMax.dataSync()[0];
const tmax = tMax.dataSync()[0];
const prev = model2.predict(tf.tensor2d([[33 / tmax]])).dataSync()[0] * pmax;
print(\`\\nPizza de 33cm → previsão: R$\${prev.toFixed(2)} (esperado ~R$\${(1.2*33).toFixed(2)})\`);` },

  { type: 'h2', text: 'Monitorando treino vs validação' },
  { type: 'p', text: 'O sinal de que o treino vai bem é a loss caindo a cada epoch. Mas o número que importa de verdade é a loss de **validação** — calculada num pedaço dos dados que o modelo não usa pra ajustar os pesos (já visto em Preparar Dados: Split).' },
  { type: 'p', text: '**Overfitting** — "decorou os exemplos, não aprendeu o padrão" — acontece quando a loss de treino continua caindo mas a de validação para de cair ou volta a subir: o modelo está memorizando os dados de treino específicos em vez de aprender a regra geral por trás deles. **Underfitting** é o oposto: nem a loss de treino cai o suficiente — o modelo é simples demais ou não treinou por tempo suficiente pra capturar o padrão.' },
  { type: 'code', code:
`const model3 = tf.sequential();
model3.add(tf.layers.dense({ units: 4, inputShape: [1], activation: 'relu' }));
model3.add(tf.layers.dense({ units: 1 }));
model3.compile({ optimizer: 'adam', loss: 'meanSquaredError' });

const X_tr  = tf.tensor2d([20,25,28,30,32,35,38,40], [8,1]).div(tf.scalar(45));
const Y_tr  = tf.tensor2d([24,30,33,36,38,42,45,48], [8,1]).div(tf.scalar(54));
const X_val = tf.tensor2d([42,45], [2,1]).div(tf.scalar(45));
const Y_val = tf.tensor2d([50,54], [2,1]).div(tf.scalar(54));

await model3.fit(X_tr, Y_tr, {
  validationData: [X_val, Y_val],
  epochs: 200,
  verbose: 0,
  callbacks: {
    onEpochEnd: (epoch, logs) => {
      if (epoch % 50 === 0) {
        print(\`Epoch \${epoch} | train: \${logs.loss.toFixed(5)} | val: \${logs.val_loss.toFixed(5)}\`);
      }
    }
  }
});
print('\\nSe train cai e val acompanha → treino saudável.');
print('Se train cai e val sobe → overfitting.');` },

  { type: 'divider' },
  { type: 'note', text: 'Resumo: `compile` define loss e otimizador, `fit` roda o loop de treino (epochs × batches, calculando gradiente via backpropagation/autodiff e ajustando pesos via gradient descent a cada batch). Pare de treinar quando a loss de **validação** parar de cair — treinar além disso não melhora o modelo em dados novos.' },
];
