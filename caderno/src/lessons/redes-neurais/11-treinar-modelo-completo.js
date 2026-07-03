export const blocks = [
  { type: 'h1', text: 'Treinando um Modelo Completo' },

  { type: 'p', text: 'Você já tem todas as peças: um MLP montado (`tf.sequential`), uma loss escolhida, gradiente calculado automaticamente por autodiff, e os conceitos de epoch/batch/overfitting já vistos na aula anterior. Falta só juntar tudo num loop de treino de verdade — e é exatamente isso que `model.compile` + `model.fit` fazem por você.' },

  { type: 'h2', text: 'Compilar: escolher loss e otimizador' },
  { type: 'code', code:
`const model = tf.sequential();
model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

model.compile({
  optimizer: 'adam',        // otimizador adaptativo, já visto na aula anterior
  loss: 'meanSquaredError', // MSE, já visto na aula de Função de Custo
});

print('Compilado! Pronto pra treinar.');` },

  { type: 'h2', text: 'Exemplo completo: tamanho da pizza → preço' },
  { type: 'p', text: 'Dados com relação aproximada `preço ≈ 1.2 × diâmetro`, com um pouco de ruído — como dados reais sempre têm. `epochs` controla quantas voltas completas pelo dataset o `fit` vai dar.' },
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

  { type: 'h2', text: 'Monitorando treino vs validação em código' },
  { type: 'p', text: 'Passando `validationData`, o `fit` calcula a loss de validação a cada epoch, junto da loss de treino — o mesmo par `loss_treino`/`loss_validação` que você já viu na aula anterior, agora aparecendo de verdade nos logs do treino.' },
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
print('Se train cai e val sobe → overfitting, como visto na aula anterior.');` },

  { type: 'divider' },
  { type: 'note', text: 'Resumo: `compile` define loss e otimizador, `fit` roda o loop de treino (epochs × batches, calculando gradiente via backpropagation/autodiff e ajustando pesos via gradient descent a cada batch), e `validationData` deixa visível, em código, o sinal de overfitting já visto na teoria.' },
];
