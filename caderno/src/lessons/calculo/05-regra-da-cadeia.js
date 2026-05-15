export const regraDaCadeiaViz = ['cadeia'];

export const regraDaCadeia = [
  { type: 'h1', text: 'Regra da Cadeia' },
  { type: 'p', text: 'Você sabe que 1 dólar compra 5 reais. E que 1 real compra 3 pesos argentinos. Quanto 1 dólar compra em pesos?' },
  { type: 'p', text: '`5 × 3 = 15 pesos`. Você multiplicou as taxas.' },
  { type: 'p', text: 'A regra da cadeia é exatamente isso — mas com taxas de mudança em vez de taxas de câmbio. Se y muda 3x quando z muda, e z muda 5x quando x muda, então y muda `3 × 5 = 15x` quando x muda.' },

  { type: 'h2', text: 'Por que isso importa em ML?' },
  { type: 'p', text: 'Uma rede neural é uma sequência de transformações: entrada → camada 1 → camada 2 → camada 3 → erro.' },
  { type: 'p', text: 'O treino precisa saber: "quanto esse peso lá na camada 1 contribuiu pro erro lá no final?". O peso está três camadas longe do erro — como calcular isso?' },
  { type: 'p', text: 'Você encadeia as taxas de mudança. Quanto a camada 2 muda quando a camada 1 muda? Quanto a camada 3 muda quando a camada 2 muda? Quanto o erro muda quando a camada 3 muda? Multiplica tudo. Chegou.' },

  { type: 'h2', text: 'Por que "backpropagation"?' },
  { type: 'p', text: 'Esse cálculo começa no erro — no final — e vai caminhando de trás pra frente, camada por camada, até chegar nos primeiros pesos. Cada camada recebe o "quanto o erro mudou" da camada seguinte e passa pra anterior.' },
  { type: 'p', text: 'Por isso o nome: **back**propagation. O sinal de erro se propaga de volta pela rede.' },

  { type: 'h2', text: 'Vanishing gradient — quando o sinal some' },
  { type: 'p', text: 'Lembra que a derivada do Sigmoid perto dos extremos é `0.007`? Na regra da cadeia, você multiplica essas derivadas a cada camada.' },
  { type: 'p', text: '10 camadas com Sigmoid: `0.007 × 0.007 × 0.007...` — depois de algumas camadas, o número é praticamente zero. O sinal de erro não chega nas primeiras camadas. Elas simplesmente param de aprender.' },
  { type: 'p', text: 'Com ReLU a derivada é 1 nos positivos. `1 × 1 × 1...` — o sinal chega inteiro em todas as camadas. É por isso que ReLU resolveu o vanishing gradient e dominou as redes profundas modernas.' },

  { type: 'note', text: '**Resumo:** regra da cadeia = multiplica taxas de mudança em sequência. Backpropagation = aplica isso de trás pra frente em toda a rede. Vanishing gradient = derivadas menores que 1 multiplicadas muitas vezes viram zero.' },

  { type: 'h2', text: 'A notação formal' },
  { type: 'formal', eq: 'd/dx [f(g(x))]  =  f\'(g(x)) · g\'(x)', legend: [
    'Derivada de uma função composta f(g(x))',
    "`f'(g(x))` — derivada de f, avaliada no ponto g(x)",
    "`g'(x)` — derivada de g em relação a x",
    'Você multiplica as derivadas — as taxas de câmbio se encadeiam',
  ]},
  { type: 'formal', eq: '∂L/∂w  =  ∂L/∂ŷ  ·  ∂ŷ/∂z  ·  ∂z/∂w', legend: [
    'Regra da cadeia no backpropagation de um neurônio',
    '`∂L/∂ŷ` — quanto o erro muda com a saída do neurônio',
    '`∂ŷ/∂z` — quanto a saída muda com a entrada pré-ativação (derivada da ativação)',
    '`∂z/∂w` — quanto a entrada pré-ativação muda com o peso (= a entrada x)',
    'Multiplicando tudo: "quanto o erro muda se eu mexer nesse peso"',
  ]},
  { type: 'formal', eq: 'δˡ  =  ((Wˡ⁺¹)ᵀ δˡ⁺¹) ⊙ σ\'(zˡ)', legend: [
    'A fórmula completa do backprop em notação matricial — a versão monstruosa',
    '`δˡ` — o "delta" da camada l: o erro que chegou nessa camada',
    '`(Wˡ⁺¹)ᵀ` — pesos da camada seguinte transpostos (para inverter a direção)',
    '`δˡ⁺¹` — o erro da camada seguinte, que está sendo propagado de volta',
    '`⊙` — produto elemento a elemento (Hadamard)',
    "`σ'(zˡ)` — derivada da ativação aplicada na entrada pré-ativação dessa camada",
    'Leia como: "o erro desta camada vem do erro da próxima, filtrado pela derivada da ativação"',
  ]},

  { type: 'h2', text: 'Ver na prática' },
  { type: 'code', code:
`// TF calculando backprop automaticamente
// erro = (sigmoid(w*x + b) - y)²
// Quanto o erro muda se w mudar?

const sigmoid = v => v.sigmoid();
const x = tf.scalar(2.0);
const y = tf.scalar(1.0);
const b = tf.scalar(0.1);

const dErro_dW = tf.grad(w => {
  const saida = sigmoid(w.mul(x).add(b));
  return saida.sub(y).square();
});

[-1, 0, 0.5, 1, 2].forEach(wVal => {
  const w    = tf.scalar(wVal);
  const grad = dErro_dW(w).dataSync()[0];
  print(\`w=\${wVal.toFixed(1)}: gradiente=\${grad.toFixed(5)}  → \${grad > 0 ? 'diminuir w' : 'aumentar w'}\`);
});` },
];
