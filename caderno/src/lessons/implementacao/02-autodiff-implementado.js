export const blocks = [
  { type: 'h1', text: 'Autodiff: Derivada Automática' },
  { type: 'p', text: 'Você já viu a regra da cadeia e derivadas parciais na Trilha de Cálculo — é exatamente isso que o `tf.grad` está calculando por trás dos panos, automaticamente, mesmo pra funções com centenas de variáveis. Aqui é o "como fazer isso rodar" em código.' },

  { type: 'h2', text: 'tf.grad: a derivada sem fazer a conta na mão' },
  { type: 'p', text: 'Pra `f(x) = x²`, você já sabe que a derivada é `2x`. `tf.grad(f)` devolve uma nova função que, dado um `x`, calcula esse resultado sozinha.' },
  { type: 'code', code:
`// f(x) = x²
const f = x => x.square();

// tf.grad devolve a FUNÇÃO derivada de f — não um número, uma função
const df = tf.grad(f);

// Testando em alguns pontos e comparando com o valor analítico 2x
[1, 2, 3, 5].forEach(valor => {
  const x = tf.scalar(valor);
  const gradienteCalculado = df(x).dataSync()[0];
  const esperadoAnalitico = 2 * valor;

  print(\`x=\${valor} → tf.grad deu \${gradienteCalculado}, 2x deu \${esperadoAnalitico}\`);
});` },

  { type: 'h2', text: 'Funciona pra qualquer função, não só x²' },
  { type: 'p', text: 'O mesmo `tf.grad` calcula a derivada de qualquer função que você escrever com operações de tensor — inclusive as compostas, onde a regra da cadeia entra em ação por trás dos panos.' },
  { type: 'code', code:
`// g(x) = (x² + 1)³  — uma composição, exatamente o tipo de função
// onde a regra da cadeia é necessária pra derivar na mão
const g = x => x.square().add(1).pow(tf.scalar(3));
const dg = tf.grad(g);

const x = tf.scalar(2);
print('g(2):', g(x).dataSync()[0]);
print('derivada de g em x=2:', dg(x).dataSync()[0]);
// tf.grad aplicou a regra da cadeia sozinho, sem você escrever nenhuma derivada` },

  { type: 'h2', text: 'tf.tidy: limpando a memória dos tensores intermediários' },
  { type: 'p', text: 'Cada operação acima cria tensores intermediários que ficam ocupando memória até serem descartados. `tf.tidy` executa uma função e libera automaticamente tudo que não for o resultado final — boa prática pra qualquer código com tf.js.' },
  { type: 'code', code:
`const resultado = tf.tidy(() => {
  // tudo aqui dentro é temporário e será liberado automaticamente
  const x = tf.scalar(4);
  const df = tf.grad(f);
  return df(x); // só isso escapa do tf.tidy
});

print('resultado que sobreviveu ao tf.tidy:', resultado.dataSync()[0]);` },

  { type: 'divider' },
  { type: 'note', text: 'Isso é o que a literatura chama de **autodiff** (diferenciação automática) — é o motor por trás de todo framework de deep learning (TensorFlow, PyTorch). `tf.grad` faz o mesmo trabalho que você fez na mão com a regra da cadeia, só que automaticamente e pra qualquer função.' },
];
