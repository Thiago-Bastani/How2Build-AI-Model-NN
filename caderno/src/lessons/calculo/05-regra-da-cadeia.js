export const regraDaCadeia = [
  { type: 'h1', text: 'Regra da Cadeia' },
  { type: 'p', text: '1 dólar compra 5 reais. 1 real compra 3 pesos argentinos. Quanto 1 dólar compra em pesos? `5 × 3 = 15`. Você multiplicou as taxas.' },
  { type: 'p', text: 'A regra da cadeia é a mesma lógica, mas com taxas de mudança (derivadas) em vez de taxas de câmbio. Se a saída de uma função muda 3x quando a entrada muda, e a entrada é ela própria uma função que muda 5x, a saída total muda `3 × 5 = 15x`.' },
  { type: 'p', text: 'Em outras palavras: como derivar uma função dentro de outra função?' },

  { type: 'h2', text: 'O problema que a regra resolve' },
  { type: 'p', text: 'Você quer derivar `(x² + 1)⁵`. Se o expoente estivesse em volta de um x simples — tipo `x⁵` — você usaria a regra da potência e ia embora: `5x⁴`.' },
  { type: 'p', text: 'Mas dentro está `x² + 1`, não um x simples. Esse interior também muda com x. Ignorar isso dá o resultado errado.' },
  { type: 'p', text: 'A regra da cadeia diz: **deriva o exterior (como se o interior fosse x) e multiplica pela derivada do interior**.' },

  { type: 'h2', text: 'O processo — passo a passo' },
  { type: 'p', text: '**Passo 1:** Identifique o exterior e o interior.' },
  { type: 'p', text: '**Passo 2:** Derive o exterior. Trate o interior como se fosse uma variável única (chame de u se ajudar).' },
  { type: 'p', text: '**Passo 3:** Multiplique pela derivada do interior.' },

  { type: 'h3', text: 'Exemplo 1: (x² + 1)⁵' },
  { type: 'p', text: 'Interior: `x² + 1`.   Exterior: `(...)⁵`.' },
  { type: 'p', text: 'Derivada do exterior: `5(...)⁴` — expoente desceu, agora coloca o interior de volta.' },
  { type: 'p', text: 'Derivada do interior `x² + 1`: é `2x`.' },
  { type: 'p', text: 'Multiplica: `5(x²+1)⁴ × 2x = 10x(x²+1)⁴`. Pronto.' },
  { type: 'formula', text: "d/dx [(x²+1)⁵]  =  10x(x²+1)⁴" },

  { type: 'h3', text: 'Exemplo 2: sin(3x)' },
  { type: 'p', text: 'Interior: `3x`.   Exterior: `sin(...)`.' },
  { type: 'p', text: 'Derivada do exterior: `cos(...)`. Derivada do interior `3x`: é `3`.' },
  { type: 'p', text: 'Multiplica: `cos(3x) × 3`.' },
  { type: 'formula', text: "d/dx [sin(3x)]  =  3·cos(3x)" },

  { type: 'h3', text: 'Exemplo 3: e^(x²)' },
  { type: 'p', text: 'Interior: `x²`.   Exterior: `e^(...)`.' },
  { type: 'p', text: 'Derivada do exterior: `e^(...)` (exponencial natural é ela mesma). Derivada do interior: `2x`.' },
  { type: 'p', text: 'Multiplica: `e^(x²) × 2x`.' },
  { type: 'formula', text: "d/dx [e^(x²)]  =  2x·e^(x²)" },

  { type: 'note', text: 'Resumo: regra da cadeia = derive o exterior, multiplique pela derivada do interior. Com três camadas aninhadas, você multiplica três derivadas.' },
  { type: 'viz', id: 'cadeia' },

  { type: 'h2', text: 'A notação formal' },
  { type: 'formal', eq: "d/dx [ f(g(x)) ]  =  f'(g(x)) · g'(x)", legend: [
    '`g(x)` — a função interior',
    '`f(...)` — a função exterior',
    "`f'(g(x))` — deriva f, mas avalia no ponto g(x), não em x direto",
    "`g'(x)` — deriva o interior normalmente",
    'Multiplica as duas — é a mesma lógica do câmbio encadeado',
  ]},

  { type: 'h2', text: 'Ver na prática' },
  { type: 'code', code:
`const h = 0.00001;
const derivNum = (f, x) => (f(x + h) - f(x)) / h;

// (x² + 1)⁵ → analítica: 10x(x²+1)⁴
const f1    = x => (x**2 + 1)**5;
const f1Ana = x => 10 * x * (x**2 + 1)**4;

print('d/dx [(x²+1)⁵]:');
[-2,-1,0,1,2].forEach(x => {
  print(\`  x=\${x}: numérica=\${derivNum(f1,x).toFixed(1)}  analítica=\${f1Ana(x)}\`);
});

// e^(x²) → analítica: 2x·e^(x²)
const f2    = x => Math.exp(x**2);
const f2Ana = x => 2 * x * Math.exp(x**2);

print('\\nd/dx [e^(x²)]:');
[-1, 0, 0.5, 1].forEach(x => {
  print(\`  x=\${x}: numérica=\${derivNum(f2,x).toFixed(4)}  analítica=\${f2Ana(x).toFixed(4)}\`);
});` },
];
