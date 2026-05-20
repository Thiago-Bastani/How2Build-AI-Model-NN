export const gradiente = [
  { type: 'h1', text: 'Gradiente' },
  { type: 'p', text: 'Você está no meio de uma montanha, de olhos vendados. Quer saber qual a direção mais íngreme — onde o terreno sobe mais rápido. Você testa uma direção de cada vez: primeiro norte-sul, depois leste-oeste. Combinando as duas informações, você descobre a direção do morro mais alto.' },
  { type: 'p', text: 'O gradiente é exatamente isso. Quando uma função depende de mais de uma variável, o gradiente combina as inclinações em cada direção num único vetor que aponta pra onde a função cresce mais rápido.' },

  { type: 'h2', text: 'Derivada parcial — uma direção de cada vez' },
  { type: 'p', text: 'Com uma variável, derivada é simples. Com duas variáveis — digamos `f(x, y)` — você precisa perguntar: "se eu mexer só em x (mantendo y parado), o quanto f muda?".' },
  { type: 'p', text: 'Isso se chama derivada parcial em x. Depois você faz a mesma pergunta pra y. Você finge que a outra variável é uma constante e deriva normalmente.' },

  { type: 'h3', text: 'Exemplo' },
  { type: 'p', text: 'Seja `f(x, y) = x² + 3y`. Qual a inclinação em x? Qual a inclinação em y?' },
  { type: 'p', text: 'Em x: trata y como constante. `x²` vira `2x`, `3y` vira `0` (não tem x). Resultado: **2x**.' },
  { type: 'p', text: 'Em y: trata x como constante. `x²` vira `0` (não tem y), `3y` vira `3`. Resultado: **3**.' },
  { type: 'p', text: 'No ponto (x=2, y=5): inclinação em x = `2·2 = 4`. Inclinação em y = `3`. O gradiente é o vetor `[4, 3]`.' },
  { type: 'viz', id: 'gradiente' },

  { type: 'h2', text: 'O vetor gradiente' },
  { type: 'p', text: 'Você junta as derivadas parciais de todas as variáveis num vetor. Esse vetor — o gradiente — aponta na direção de maior subida da função naquele ponto.' },
  { type: 'p', text: 'Se o gradiente é `[4, 3]`, significa: mover 1 unidade em x sobe 4, mover 1 unidade em y sobe 3. A direção `[4, 3]` combinada é a mais íngreme.' },
  { type: 'note', text: 'Resumo: gradiente = lista das derivadas parciais, uma por variável. Aponta pra onde a função sobe mais rápido. Com n variáveis, o gradiente tem n números.' },

  { type: 'h2', text: 'A notação formal' },
  { type: 'formal', eq: '∂f/∂x  — derivada parcial de f em relação a x\n∂f/∂y  — derivada parcial de f em relação a y\n\n∇f(x, y)  =  [ ∂f/∂x,  ∂f/∂y ]', legend: [
    '`∂` — "d parcial": avisa que há mais de uma variável',
    '`∂f/∂x` — deriva em x, trata todas as outras como constante',
    '`∇` — nabla, símbolo do gradiente (lê-se "grad f")',
    'Para `f(x,y) = x² + 3y`: `∇f = [2x, 3]`',
  ]},

  { type: 'h2', text: 'Ver na prática' },
  { type: 'code', code:
`// f(x, y) = x² + 3y  →  ∂f/∂x = 2x, ∂f/∂y = 3
const h = 0.00001;
const f = (x, y) => x**2 + 3*y;

// Derivadas parciais numéricas
const dfx = (x, y) => (f(x+h, y) - f(x, y)) / h;
const dfy = (x, y) => (f(x, y+h) - f(x, y)) / h;

print('Gradiente de f(x,y) = x² + 3y:');
print('Analítico: ∂f/∂x = 2x, ∂f/∂y = 3');
print('');
[[1,2],[2,5],[-1,0],[3,-2]].forEach(([x,y]) => {
  print(\`  ponto (\${x},\${y}): ∇f ≈ [\${dfx(x,y).toFixed(2)}, \${dfy(x,y).toFixed(2)}]  |  analítico = [\${2*x}, 3]\`);
});` },
];
