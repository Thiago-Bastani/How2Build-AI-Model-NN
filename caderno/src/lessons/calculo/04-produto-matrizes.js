export const produtoMatrizesViz = ['produto-matriz'];

export const produtoMatrizes = [
  { type: 'h1', text: 'Produto de Matrizes' },
  { type: 'p', text: 'Cada camada de uma rede neural faz uma operação. Essa operação é o produto de matrizes. Antes de aprender como calcular, vale entender **por que** ela existe.' },

  { type: 'h2', text: 'Começando simples: combinando entradas' },
  { type: 'p', text: 'Imagina um neurônio que recebe 3 sinais: temperatura, umidade e vento. Ele não trata os três igualmente — cada um tem um peso diferente. Ele multiplica cada sinal pelo peso dele e soma tudo.' },
  { type: 'p', text: '`temperatura × 0.5 + umidade × 0.3 + vento × 0.2`' },
  { type: 'p', text: 'Isso é o produto escalar — combina duas listas em um número. É exatamente o que um único neurônio faz.' },

  { type: 'h2', text: 'Mas uma rede tem muitos neurônios e muitas amostras' },
  { type: 'p', text: 'Você não tem um neurônio — tem 256. E não tem uma amostra — tem 1000.' },
  { type: 'p', text: 'Fazer cada combinação separadamente, um por um, seria absurdamente lento. O produto de matrizes faz tudo isso de uma vez: **todas as 1000 amostras passando pelos 256 neurônios em uma única operação**.' },
  { type: 'p', text: 'É por isso que ele existe. É eficiência em escala.' },

  { type: 'h2', text: 'A regra que você precisa memorizar' },
  { type: 'p', text: 'Pra multiplicar duas matrizes, os números do meio têm que bater. O resultado tem os números das bordas.' },
  { type: 'p', text: '`[1000 amostras × 128 features]  ×  [128 features × 256 neurônios]  =  [1000 × 256]`' },
  { type: 'p', text: 'O `128` no meio é igual nos dois — beleza. O resultado é `[1000 × 256]`: cada uma das 1000 amostras tem 256 saídas.' },
  { type: 'warn', text: 'Quando der erro de shape no TensorFlow, é quase sempre porque o meio não bate. Escreva os dois shapes lado a lado e procure o "128 ≠ 64" que está lá.' },

  { type: 'h2', text: 'Por que GPUs?' },
  { type: 'p', text: 'Cada número do resultado é independente dos outros — dá pra calcular todos em paralelo. Uma GPU tem milhares de núcleos pequenos feitos exatamente pra isso. O que uma CPU faria em segundos, uma GPU faz em milissegundos.' },
  { type: 'p', text: 'É a razão principal pra usar GPU em treino. A operação central da rede neural se encaixa perfeitamente na arquitetura da GPU.' },

  { type: 'note', text: '**Resumo:** produto escalar combina dois vetores em um número — é o que um neurônio faz. Produto de matrizes faz isso pra todas as amostras e todos os neurônios de uma vez. Regra: o meio tem que bater.' },

  { type: 'h2', text: 'A notação formal' },
  { type: 'formal', eq: 'a · b  =  Σᵢ aᵢbᵢ  =  a₁b₁ + a₂b₂ + ... + aₙbₙ', legend: [
    '`·` — ponto: produto escalar (dot product)',
    '`Σᵢ` — somatório sobre i: repete a multiplicação pra cada posição',
    '`aᵢbᵢ` — i-ésimo elemento de a multiplicado pelo i-ésimo de b',
    'Resultado: um único número',
  ]},
  { type: 'formal', eq: 'C = A · B\nonde  Cᵢⱼ = Σₖ Aᵢₖ · Bₖⱼ', legend: [
    '`Cᵢⱼ` — elemento na linha i, coluna j do resultado',
    '`Aᵢₖ` — linha i de A (uma amostra)',
    '`Bₖⱼ` — coluna j de B (pesos do j-ésimo neurônio)',
    '`Σₖ` — soma sobre k: cada elemento do resultado é um produto escalar completo',
    'O produto de matrizes é: "faça o produto escalar de cada linha com cada coluna"',
  ]},
  { type: 'formal', eq: '[A × B]  ·  [B × C]  =  [A × C]', legend: [
    'Regra dos shapes: o B do meio precisa ser igual',
    'A = amostras, B = features/entradas, C = neurônios/saídas',
    'Ex: [32 × 128] · [128 × 64] = [32 × 64]  ✓',
    'Ex: [32 × 128] · [64 × 64] — ERRO, 128 ≠ 64  ✗',
  ]},

  { type: 'h2', text: 'Ver na prática' },
  { type: 'code', code:
`// 3 amostras, 2 features cada → shape [3, 2]
const X = tf.tensor2d([
  [1, 2],
  [3, 4],
  [5, 6],
]);

// 2 entradas → 3 neurônios → shape [2, 3]
const W = tf.tensor2d([
  [0.1, 0.2, 0.3],
  [0.4, 0.5, 0.6],
]);

// [3,2] · [2,3] = [3,3]
print('Entradas [3 × 2]:'); X.print();
print('Pesos [2 × 3]:');    W.print();
print('Saída [3 × 3]:');    X.matMul(W).print();` },
];
