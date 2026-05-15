export const gradienteViz = ['gradiente'];

export const gradiente = [
  { type: 'h1', text: 'Gradiente' },
  { type: 'p', text: 'A derivada funciona quando você tem um único botão pra girar. Uma rede neural tem milhares de botões — os pesos. O gradiente é a resposta pra: como girar todos os botões ao mesmo tempo, cada um na direção certa?' },

  { type: 'h2', text: 'Derivada parcial — um botão de cada vez' },
  { type: 'p', text: 'Imagina uma tigela. Sua posição dentro dela é descrita por dois números: x e y.' },
  { type: 'p', text: 'Você quer saber: se eu me mover só na direção x, o quanto a tigela sobe ou desce? Isso é a derivada parcial em x. Depois você pergunta o mesmo pra y.' },
  { type: 'p', text: 'Você trata x e y separadamente — um de cada vez — como se o outro não existisse.' },

  { type: 'h2', text: 'O gradiente junta tudo' },
  { type: 'p', text: 'Depois de calcular a derivada parcial pra cada peso, você junta tudo numa lista: `[inclinação do peso 1, inclinação do peso 2, ..., inclinação do peso N]`.' },
  { type: 'p', text: 'Essa lista é o gradiente. Ela é uma seta que aponta na direção de maior subida do erro.' },
  { type: 'p', text: 'O treino usa essa seta ao contrário — anda na direção oposta. É o gradient descent, agora em todas as dimensões ao mesmo tempo.' },
  { type: 'p', text: 'Em vez de `novo peso = peso - taxa × inclinação` pra um peso, você faz isso pra cada peso da lista, cada um com sua própria inclinação.' },

  { type: 'h2', text: 'Por que um vetor e não só um número?' },
  { type: 'p', text: 'Com um peso só, o "erro" é uma curva 2D — você vai pra esquerda ou pra direita.' },
  { type: 'p', text: 'Com dois pesos, é uma superfície 3D — tipo uma tigela ou montanha. Você pode ir em qualquer direção do plano.' },
  { type: 'p', text: 'Com um milhão de pesos, é uma superfície em um milhão de dimensões. Impossível de imaginar — mas a matemática funciona igual. O gradiente ainda aponta morro acima, e o treino ainda anda no sentido contrário.' },

  { type: 'h2', text: 'O TensorFlow faz tudo isso por você' },
  { type: 'p', text: 'Calcular a derivada parcial de cada peso à mão seria impossível. O TensorFlow grava cada operação que você faz. Quando você pede o gradiente, ele percorre essas operações de trás pra frente e calcula a inclinação de cada peso automaticamente.' },
  { type: 'p', text: 'Isso se chama **autodiff** — diferenciação automática. É uma das razões principais pra existência de frameworks como TensorFlow e PyTorch.' },

  { type: 'note', text: '**Resumo:** gradiente = lista com a inclinação de cada peso. Aponta morro acima. O treino usa ao contrário. Com 1M de pesos → gradiente tem 1M de números, um por peso.' },

  { type: 'h2', text: 'A notação formal' },
  { type: 'formal', eq: '∂f/∂x  =  lim(h→0)  [f(x+h, y) − f(x, y)] / h', legend: [
    '`∂` — "d parcial", diferente do d normal — avisa que há mais variáveis',
    '`∂f/∂x` — derivada de f em relação a x, mantendo y fixo',
    'Você vai ver `∂` muito em papers de ML — é sempre derivada parcial',
  ]},
  { type: 'formal', eq: '∇L(w)  =  [ ∂L/∂w₁,  ∂L/∂w₂,  ...  ∂L/∂wₙ ]', legend: [
    '`∇` — nabla, o símbolo do gradiente (lê-se "grad L de w")',
    '`L` — a função de custo (loss)',
    '`∂L/∂wᵢ` — derivada parcial do custo em relação ao i-ésimo peso',
    'O resultado é um vetor: um número por peso, todos juntos numa lista',
  ]},
  { type: 'formal', eq: 'w  ←  w  −  α · ∇L(w)', legend: [
    'Gradient descent escrito formalmente',
    '`w` — vetor de todos os pesos (não só um)',
    '`∇L(w)` — gradiente completo: a lista de inclinações',
    'Subtrai o gradiente = anda morro abaixo em todas as dimensões de uma vez',
  ]},

  { type: 'h2', text: 'Ver na prática' },
  { type: 'code', code:
`// erro(w1, w2) = (w1 - 3)² + (w2 - 7)²
// mínimo quando w1=3 e w2=7

let w1 = 0, w2 = 0;
const lr = 0.2;

for (let i = 1; i <= 8; i++) {
  const erro = (w1-3)**2 + (w2-7)**2;
  const g1   = 2*(w1-3);   // inclinação de w1
  const g2   = 2*(w2-7);   // inclinação de w2
  w1 -= lr * g1;            // atualiza w1
  w2 -= lr * g2;            // atualiza w2
  print(\`step \${i}: w1=\${w1.toFixed(3).padStart(6)} w2=\${w2.toFixed(3).padStart(6)} | erro=\${erro.toFixed(3)}\`);
}
print(\`\\nalvo: w1=3, w2=7\`);` },
];
