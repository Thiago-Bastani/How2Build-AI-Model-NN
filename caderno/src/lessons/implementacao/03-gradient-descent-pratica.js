export const blocks = [
  { type: 'h1', text: 'Gradient Descent na Prática' },
  { type: 'p', text: 'Você já viu a matemática completa disso na aula de Gradient Descent — o Algoritmo Completo: chutar, medir o gradiente, andar contra ele, repetir. Aqui está rodando de verdade, usando o `tf.grad` da aula anterior pra calcular o gradiente a cada passo.' },

  { type: 'h2', text: 'O alvo: encontrar o mínimo de (x - 3)²' },
  { type: 'p', text: 'Essa função tem seu valor mínimo exatamente em `x = 3` — é fácil conferir olhando, mas o objetivo aqui é ver o algoritmo achar isso sozinho, sem nunca ter sido informado do 3 diretamente.' },
  { type: 'code', code:
`// f(x) = (x - 3)²  → mínimo em x = 3, erro zero
const f = x => x.sub(3).square();
const gradiente = tf.grad(f);

// Chute inicial longe do mínimo, de propósito
let x = tf.scalar(-10);
const taxaDeAprendizado = 0.1;

print('chute inicial: x =', x.dataSync()[0]);` },

  { type: 'h2', text: 'O loop: chutar, medir, andar, repetir' },
  { type: 'code', code:
`for (let passo = 0; passo < 20; passo++) {
  const erro = f(x).dataSync()[0];
  const grad = gradiente(x).dataSync()[0];

  print(\`passo \${passo}: x=\${x.dataSync()[0].toFixed(4)}  erro=\${erro.toFixed(4)}  gradiente=\${grad.toFixed(4)}\`);

  // o passo do algoritmo: x_novo = x - taxaDeAprendizado * gradiente
  x = tf.tidy(() => x.sub(tf.scalar(taxaDeAprendizado).mul(gradiente(x))));
}

print('\\nresultado final: x ≈', x.dataSync()[0].toFixed(4), '(o mínimo real é x = 3)');` },

  { type: 'h2', text: 'Reparando na convergência' },
  { type: 'p', text: 'O gradiente começa grande (longe do mínimo, a inclinação é forte) e vai encolhendo conforme x se aproxima de 3 — até ficar perto de zero, que é exatamente o sinal de que o algoritmo chegou onde a inclinação some.' },
  { type: 'code', code:
`// Mesmo experimento, mas guardando o histórico pra ver a curva de convergência
let x2 = tf.scalar(-10);
const historico = [];

for (let passo = 0; passo < 30; passo++) {
  historico.push(x2.dataSync()[0]);
  x2 = tf.tidy(() => x2.sub(tf.scalar(taxaDeAprendizado).mul(gradiente(x2))));
}

print('x a cada 5 passos:', historico.filter((_, i) => i % 5 === 0).map(v => v.toFixed(3)).join(' → '));
print('foi convergindo pra 3 sem nunca ter sido informado do 3 diretamente.');` },

  { type: 'divider' },
  { type: 'note', text: 'O loop inteiro é: calcular o gradiente com `tf.grad`, andar na direção contrária multiplicada pela taxa de aprendizado, repetir. Essa é a mesma receita que vai treinar redes neurais inteiras mais adiante — só que lá o "x" vira uma lista de milhares de pesos.' },
];
