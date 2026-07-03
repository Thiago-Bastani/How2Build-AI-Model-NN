export const construirModelo = [
  { type: 'h1', text: 'Construir e Treinar um Modelo' },

  { type: 'p', text: 'Imagine que você quer ensinar alguém a adivinhar o preço de uma pizza só olhando pro tamanho. No começo, essa pessoa não faz ideia — chuta qualquer coisa. Você mostra um exemplo: "essa pizza de 30cm custa R$35". Ela erra, você diz quanto errou, ela ajusta o raciocínio. Você mostra outro, ela erra menos. Depois de centenas de exemplos, ela aprendeu o padrão: pizza maior, preço maior — e de quanto em quanto. Isso é treinar um modelo de machine learning.' },

  { type: 'p', text: 'O modelo é uma função com parâmetros ajustáveis — os **pesos**. No começo, os pesos são aleatórios (a pessoa chutando). O treino é o processo de ver exemplos, medir o erro, e ajustar os pesos — repetidamente, até acertar bem.' },

  // ── Arquitetura ────────────────────────────────────────────────────────────
  { type: 'h2', text: 'Arquitetura: empilhando camadas' },

  { type: 'p', text: 'Um modelo sequencial é uma linha de montagem. A matéria-prima (seus dados) entra no começo, cada estação faz uma transformação, e o produto sai no final. Cada "estação" é uma **camada**.' },

  { type: 'p', text: 'A camada mais comum é a **densa** (também chamada de fully connected). Ela pega todos os números que chegaram, multiplica cada um por um peso, soma tudo, e passa o resultado pra frente. O "densa" vem do fato de que cada neurônio se conecta a todos os neurônios da camada anterior — nenhum atalho, nenhum pulo.' },

  { type: 'code', code:
`// Modelo simples: 1 entrada → 1 saída
// (prever preço a partir do tamanho da pizza)
const model = tf.sequential();

// Uma camada densa com 1 neurônio, recebendo 1 feature
model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

print('Modelo criado!');
print('Parâmetros totais:', model.countParams());
// → 2 parâmetros: 1 peso × 1 entrada + 1 bias
// É a equação de uma reta: saída = peso × entrada + bias` },

  { type: 'p', text: 'Dois parâmetros. É exatamente a equação de uma linha reta: `y = a·x + b`. O treino vai descobrir quais valores de `a` e `b` melhor descrevem os dados.' },

  { type: 'h3', text: 'Modelos mais profundos' },

  { type: 'p', text: 'Pra problemas mais complexos, você empilha mais camadas e mais neurônios. Cada camada extra permite que o modelo capture padrões mais sutis.' },

  { type: 'code', code:
`// Modelo maior: 4 features → 2 camadas → 1 saída
const model2 = tf.sequential();

model2.add(tf.layers.dense({ units: 8, inputShape: [4], activation: 'relu' }));
model2.add(tf.layers.dense({ units: 4, activation: 'relu' }));
model2.add(tf.layers.dense({ units: 1 })); // camada de saída (sem ativação → regressão)

model2.summary();
// Mostra cada camada, o shape da saída, e quantos parâmetros tem` },

  { type: 'note', text: '**inputShape** só vai na primeira camada. As camadas seguintes calculam automaticamente o shape de entrada pela saída da anterior.' },

  // ── Compilar ───────────────────────────────────────────────────────────────
  { type: 'h2', text: 'Compilar: definir como aprender' },

  { type: 'p', text: 'Antes de treinar, você precisa dizer ao modelo duas coisas:' },

  { type: 'list', items: [
    '**Loss (função de custo)** — como medir o erro. O termômetro do aprendizado: quanto maior a loss, mais longe a previsão está do real.',
    '**Otimizador** — o algoritmo que ajusta os pesos quando erra. É quem aplica o gradient descent que você viu na aula de tensores.',
  ]},

  { type: 'p', text: 'Para problemas de **regressão** (prever um número contínuo, como preço), a loss padrão é o **MSE** — Erro Médio Quadrático. Você soma os erros ao quadrado e tira a média. Elevar ao quadrado tem dois efeitos: elimina o sinal negativo dos erros e pune erros grandes desproporcionalmente.' },

  { type: 'formal', eq: 'MSE = (1/n) × Σ (ŷᵢ − yᵢ)²', legend: [
    '`n` — número de amostras no batch',
    '`ŷᵢ` — o que o modelo previu pra amostra i',
    '`yᵢ` — o valor real da amostra i',
    '`(ŷᵢ − yᵢ)²` — diferença ao quadrado: sempre positiva, pune erros grandes',
    '`Σ` — soma de todas as amostras',
  ]},

  { type: 'p', text: 'O **Adam** é o otimizador padrão pra quase tudo. Ele é uma versão inteligente do gradient descent que se adapta automaticamente — a taxa de aprendizado muda conforme o treino progride. Raramente precisa ser trocado.' },

  { type: 'code', code:
`const model3 = tf.sequential();
model3.add(tf.layers.dense({ units: 1, inputShape: [1] }));

model3.compile({
  optimizer: 'adam',        // ajusta os pesos usando gradient descent adaptativo
  loss: 'meanSquaredError', // mede o erro como média de (previsto - real)²
});

print('Compilado! Pronto pra treinar.');` },

  // ── Treinar ───────────────────────────────────────────────────────────────
  { type: 'h2', text: 'Treinar: repetição que gera aprendizado' },

  { type: 'p', text: 'Uma **epoch** é uma passagem completa pelo dataset de treino. O modelo vê todas as amostras uma vez, ajusta os pesos, e isso conta como uma epoch.' },

  { type: 'p', text: 'Dentro de cada epoch, o dataset é dividido em **batches** — grupos menores. O modelo olha um batch, calcula o erro, calcula o gradiente, ajusta os pesos. Passa pro próximo batch. Quando todos os batches acabam, a epoch termina.' },

  { type: 'list', items: [
    '**Batch size grande** (ex: 64, 128) — estimativa de gradiente mais estável, mas usa mais memória',
    '**Batch size pequeno** (ex: 8, 16) — gradiente mais ruidoso, mas pode escapar de mínimos ruins',
    '**Padrão seguro**: 32',
  ]},

  { type: 'formal', eq: 'pesos_novos = pesos − taxa × ∇loss', legend: [
    '`pesos` — os parâmetros ajustáveis do modelo',
    '`taxa` — learning rate, controla o tamanho do passo (Adam começa em 0.001)',
    '`∇loss` — gradiente da loss: em qual direção o erro cresce. Você anda na direção contrária',
  ]},

  // ── Exemplo completo ──────────────────────────────────────────────────────
  { type: 'h2', text: 'Exemplo completo: tamanho da pizza → preço' },

  { type: 'p', text: 'Vamos treinar um modelo pra aprender a relação `preço ≈ 1.2 × diâmetro`. Os dados têm um pouquinho de ruído — como dados reais sempre têm.' },

  { type: 'code', code:
`// Dataset: diâmetros (cm) e preços (R$)
const tamanhos = tf.tensor2d([20,25,28,30,32,35,38,40,42,45], [10,1]);
const precos   = tf.tensor2d([24,30,33,36,38,42,45,48,50,54], [10,1]);

// Normaliza pro intervalo [0, 1] — mesma escala
const tMax = tamanhos.max();
const pMax = precos.max();
const X = tamanhos.div(tMax);
const Y = precos.div(pMax);

// Modelo: 1 entrada → 1 saída
const model = tf.sequential();
model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });

// Treina por 300 epochs
await model.fit(X, Y, {
  epochs: 300,
  verbose: 0,
  callbacks: {
    onEpochEnd: (epoch, logs) => {
      if (epoch % 100 === 0) {
        print(\`Epoch \${epoch}: loss = \${logs.loss.toFixed(6)}\`);
      }
    }
  }
});

// Prevê pra uma pizza de 33cm
const pmax = pMax.dataSync()[0];
const tmax = tMax.dataSync()[0];
const prev = model.predict(tf.tensor2d([[33 / tmax]])).dataSync()[0] * pmax;

print(\`\\nPizza de 33cm → previsão: R$\${prev.toFixed(2)}\`);
print(\`Esperado: ~R$\${(1.2 * 33).toFixed(2)}\`);` },

  // ── Monitorar ─────────────────────────────────────────────────────────────
  { type: 'h2', text: 'O sinal de que está funcionando: a loss caindo' },

  { type: 'p', text: 'O principal indicador de que o treino vai bem é a loss caindo a cada epoch. Ela nunca chega a zero com dados reais (há ruído que o modelo não consegue eliminar), mas estabiliza num valor baixo.' },

  { type: 'warn', text: '**Sinais de problema:** loss não cai (modelo pequeno demais, ou learning rate errada) — loss cai no treino mas sobe na validação (overfitting: o modelo decorou os exemplos em vez de aprender o padrão).' },

  { type: 'code', code:
`// Treino com monitoramento detalhado
const model4 = tf.sequential();
model4.add(tf.layers.dense({ units: 4, inputShape: [1], activation: 'relu' }));
model4.add(tf.layers.dense({ units: 1 }));
model4.compile({ optimizer: 'adam', loss: 'meanSquaredError' });

// Dados de treino e validação separados
const X_tr = tf.tensor2d([20,25,28,30,32,35,38,40], [8,1]).div(tf.scalar(45));
const Y_tr = tf.tensor2d([24,30,33,36,38,42,45,48], [8,1]).div(tf.scalar(54));
const X_val = tf.tensor2d([42,45], [2,1]).div(tf.scalar(45));
const Y_val = tf.tensor2d([50,54], [2,1]).div(tf.scalar(54));

await model4.fit(X_tr, Y_tr, {
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

  { type: 'note', text: '**Quando parar?** Quando a loss de validação para de cair — não quando a de treino para. Treinar além disso não melhora o modelo em dados novos.' },

  { type: 'divider' },

  { type: 'note', text: '**Resumo da aula:** Você define a arquitetura (camadas + neurônios), compila com loss e otimizador, e treina com `model.fit`. Cada epoch vê o dataset inteiro e ajusta os pesos. O sinal de aprendizado: loss caindo. Sempre monitore treino e validação separados.' },
];
