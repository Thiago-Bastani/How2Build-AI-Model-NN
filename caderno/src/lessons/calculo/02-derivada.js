export const derivadaViz = ['derivada'];

export const derivada = [
  { type: 'h1', text: 'Derivada' },
  { type: 'p', text: 'Você está de olhos vendados numa colina e quer chegar ao vale. Não dá pra ver nada — mas dá pra sentir o chão inclinando sob seus pés.' },
  { type: 'p', text: 'Se inclina pra frente, você dá um passo pra trás. Se inclina pra esquerda, você dá um passo pra direita. Você vai na direção oposta à inclinação, e eventualmente chega ao vale.' },
  { type: 'p', text: 'A derivada é essa inclinação. Nada mais.' },

  { type: 'h2', text: 'O que a inclinação diz' },
  { type: 'p', text: 'Imagina um peso do modelo numa curva de erro. Você quer saber: se eu aumentar esse peso um tiquinho, o erro sobe ou desce?' },
  { type: 'p', text: '**Inclinação positiva** — o erro está subindo nesse ponto. Aumente o peso e o erro piora. Então diminua o peso.' },
  { type: 'p', text: '**Inclinação negativa** — o erro está descendo. Aumente o peso e o erro melhora. Então aumente o peso.' },
  { type: 'p', text: '**Inclinação zero** — você chegou num ponto plano: um vale. O treino para aqui — não tem mais direção clara pra melhorar.' },
  { type: 'p', text: 'A atualização é simples: `novo peso = peso - taxa × inclinação`. O sinal de menos garante que você vai sempre morro abaixo.' },

  { type: 'h2', text: 'A taxa de aprendizado' },
  { type: 'p', text: 'É o tamanho do passo que você dá na colina.' },
  { type: 'p', text: '**Passo grande demais:** você pula por cima do vale e fica saltando de um lado pro outro pra sempre, sem descer.' },
  { type: 'p', text: '**Passo pequeno demais:** você vai, mas demora horas — e pode travar num valezinho raso antes de chegar no vale de verdade.' },
  { type: 'p', text: 'Valores entre `0.001` e `0.01` são um ponto de partida comum. Ajustar isso é parte da arte de treinar modelos.' },

  { type: 'h2', text: 'Por que ReLU dominou sobre Sigmoid' },
  { type: 'p', text: 'A inclinação do Sigmoid perto dos extremos é quase zero — tipo tentar sentir se o chão está inclinado quando a inclinação é de 0.001 grau. Você não sente nada.' },
  { type: 'p', text: 'Numa rede com muitas camadas, essa inclinação quase-zero é multiplicada camada por camada. Após 10 camadas, é praticamente zero. As primeiras camadas param de aprender. Isso se chama **vanishing gradient** — o gradiente some.' },
  { type: 'p', text: 'O ReLU tem inclinação 1 pra qualquer valor positivo. O sinal chega inteiro em todas as camadas. Simples assim — por isso virou o padrão.' },

  { type: 'note', text: '**Resumo:** derivada = inclinação da curva naquele ponto. Inclinação positiva → diminui o peso. Negativa → aumenta. Zero → chegou no mínimo. Taxa de aprendizado = tamanho do passo.' },

  { type: 'h2', text: 'A notação formal' },
  { type: 'p', text: 'Nos livros e papers, a derivada aparece de formas diferentes — mas todas dizem a mesma coisa:' },
  { type: 'formal', eq: "f'(x)  =  df/dx  =  lim(h→0) [f(x+h) − f(x)] / h", legend: [
    "`f'(x)` — notação de Lagrange: \"f linha de x\", a derivada de f",
    '`df/dx` — notação de Leibniz: "quanto f muda por quanto x muda"',
    '`lim(h→0)` — limite: imagina h ficando cada vez menor, tendendo a zero',
    '`f(x+h) − f(x)` — quanto a saída mudou quando a entrada andou h',
    '`/ h` — dividido por quanto a entrada andou — dá a taxa de mudança',
  ]},
  { type: 'formal', eq: 'w  ←  w  −  α · dL/dw', legend: [
    '`←` — atribuição: "w recebe o valor de..."',
    '`α` — alpha, a taxa de aprendizado (learning rate)',
    '`dL/dw` — derivada da loss em relação ao peso w — a inclinação',
    'Essa equação é o passo do gradient descent, escrita formalmente',
  ]},
  { type: 'formal', eq: "ReLU'(x) = 0  se x ≤ 0\n           = 1  se x > 0\n\nσ'(x) = σ(x) · (1 − σ(x))", legend: [
    'Derivada do ReLU: binária, nunca quase-zero — gradiente flui limpo',
    '`σ` — sigma, símbolo da função sigmoid',
    "Derivada do sigmoid: o produto `σ(x) · (1 − σ(x))` vai a zero nos extremos",
    'É exatamente isso que causa o vanishing gradient em redes profundas',
  ]},

  { type: 'h2', text: 'Ver na prática' },
  { type: 'code', code:
`// f(x) = (x - 4)²  →  mínimo em x=4
// inclinação em qualquer ponto = 2*(x-4)
const f     = x => (x - 4) ** 2;
const gradf = x => 2 * (x - 4);

let x  = 0;
const lr = 0.3;

for (let i = 1; i <= 12; i++) {
  const erro = f(x);
  const inclinacao = gradf(x);
  x = x - lr * inclinacao;  // passo morro abaixo
  print(\`step \${String(i).padStart(2)}: x=\${x.toFixed(3).padStart(7)} | erro=\${erro.toFixed(4).padStart(8)} | inclinação=\${inclinacao.toFixed(3)}\`);
}` },
];
