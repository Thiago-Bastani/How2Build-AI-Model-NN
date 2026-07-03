export const blocks = [
  { type: 'h1', text: 'Backpropagation via Autodiff' },

  { type: 'p', text: 'Você acabou de derivar backpropagation na mão pra uma rede de 2 pesos e 2 bias — já deu trabalho. Uma rede real tem milhões de parâmetros. Ninguém escreve essa álgebra à mão pra cada peso: é exatamente esse trabalho que o `tf.grad`/autodiff, já visto na Trilha de Implementação, automatiza — usando por trás dos panos o mesmo encadeamento de regra da cadeia que você calculou.' },

  { type: 'h2', text: 'A mesma rede, calculada automaticamente' },
  { type: 'p', text: 'Vamos usar exatamente os mesmos números do exemplo da aula anterior (`x=2`, `y=1`, `w₁=0.5`, `b₁=0`, `w₂=0.8`, `b₂=0.1`) e deixar o tf.js calcular os quatro gradientes sozinho.' },

  { type: 'code', code:
`// Mesma rede da aula de Backpropagation: x -> [w1,b1,sigmoid] -> h -> [w2,b2] -> ŷ -> loss
const x = tf.scalar(2);
const y = tf.scalar(1);

function forward([w1, b1, w2, b2]) {
  const z1 = w1.mul(x).add(b1);
  const h  = z1.sigmoid();
  const yHat = w2.mul(h).add(b2);
  return yHat.sub(y).square(); // loss = (ŷ - y)²
}

const w1 = tf.scalar(0.5);
const b1 = tf.scalar(0.0);
const w2 = tf.scalar(0.8);
const b2 = tf.scalar(0.1);

// tf.grads calcula o gradiente em relação a CADA argumento de uma vez
const gradFn = tf.grads(forward);
const grads = gradFn([w1, b1, w2, b2]);

print('gradientes calculados automaticamente:');
print('∂L/∂w1 =', grads[0].dataSync()[0].toFixed(4), '  (esperado ≈ -0.198)');
print('∂L/∂b1 =', grads[1].dataSync()[0].toFixed(4), '  (esperado ≈ -0.099)');
print('∂L/∂w2 =', grads[2].dataSync()[0].toFixed(4), '  (esperado ≈ -0.461)');
print('∂L/∂b2 =', grads[3].dataSync()[0].toFixed(4), '  (esperado ≈ -0.630)');` },

  { type: 'p', text: 'Os números batem com a conta feita na mão — porque é literalmente o mesmo processo, só automatizado. A diferença é que `tf.grads` não se importa se a rede tem 4 parâmetros ou 40 milhões: o mecanismo de propagar o erro de trás pra frente, camada por camada, é o mesmo.' },

  { type: 'h2', text: 'Numa rede de verdade, via camadas' },
  { type: 'p', text: 'Quando você usa `tf.sequential()` e `model.fit` (próxima aula), nunca precisa chamar `tf.grad` manualmente — o próprio `.fit()` já embute esse cálculo de gradiente pra cada peso de cada camada, seguido do ajuste via gradient descent, a cada batch de dados.' },

  { type: 'divider' },
  { type: 'note', text: 'Resumo: `tf.grads` (ou `tf.grad` para um único parâmetro) calcula automaticamente os mesmos gradientes que backpropagation calcula na mão. É esse mecanismo — autodiff aplicado repetidamente camada por camada — que torna viável treinar redes com milhões de parâmetros.' },
];
