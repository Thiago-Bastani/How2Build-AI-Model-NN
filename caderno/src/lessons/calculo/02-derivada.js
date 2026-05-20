export const derivada = [
  { type: 'h1', text: 'Derivada' },
  { type: 'p', text: 'Você está num carro. O GPS mostra sua posição. O velocímetro mostra sua velocidade. A velocidade é exatamente a taxa em que sua posição está mudando agora. Se você está a 100 km/h, sua posição muda 100 km por hora neste instante.' },
  { type: 'p', text: 'A derivada é isso. É a velocidade de mudança de uma função num ponto específico. Não a mudança total — a mudança instantânea, agora, neste ponto.' },
  { type: 'p', text: 'Geometricamente: se você traçar uma reta que toca a curva em um único ponto sem cruzá-la — a **reta tangente** — a inclinação dessa reta é a derivada naquele ponto.' },
  { type: 'viz', id: 'derivada' },

  { type: 'h2', text: 'Como calcular — as regras' },
  { type: 'p', text: 'Você não precisa calcular do zero toda vez. Existem regras. A mais importante é a **regra da potência**:' },
  { type: 'p', text: 'O expoente desce e vira coeficiente. O expoente diminui em 1.' },
  { type: 'list', items: [
    'x² → expoente 2 desce → **2x**',
    'x³ → expoente 3 desce → **3x²**',
    'x⁵ → **5x⁴**',
    'x → é x¹, vira **1**',
    '7 → constante, não depende de x → **0**',
  ]},
  { type: 'p', text: 'Se tem número multiplicando, ele passa pra frente intacto. A derivada de `5x³` é `5 · 3x² = 15x²`.' },
  { type: 'p', text: 'Se tem soma, deriva cada pedaço separado. A derivada de `x³ + 4x²` é `3x² + 8x`.' },
  { type: 'viz', id: 'derivada-curvas' },

  { type: 'h3', text: 'Exemplo resolvido' },
  { type: 'p', text: 'Qual é a derivada de `f(x) = 4x³ − 2x² + 7x − 5`?' },
  { type: 'list', items: [
    '`4x³` → `12x²`',
    '`−2x²` → `−4x`',
    '`7x` → `7`',
    '`−5` → `0`',
  ]},
  { type: 'formula', text: "f'(x) = 12x² − 4x + 7" },
  { type: 'p', text: 'Pra saber a inclinação em x=2: substitui. `12·4 − 4·2 + 7 = 47`.' },

  { type: 'h3', text: 'Onde a derivada é zero' },
  { type: 'p', text: 'Derivada zero = tangente horizontal = ponto de máximo ou mínimo da curva.' },
  { type: 'p', text: 'Exemplo: `f(x) = x² − 6x + 5`. Derivada: `2x − 6`. Zero quando `x = 3`. A curva tem mínimo em x=3.' },

  { type: 'note', text: 'Processo: (1) Derive usando as regras. (2) Para saber a inclinação num ponto, substitua o x. (3) Para achar mínimos/máximos, iguale a derivada a zero.' },

  { type: 'h2', text: 'A notação formal' },
  { type: 'formal', eq: "d/dx [xⁿ]     =  n · xⁿ⁻¹\nd/dx [c]      =  0\nd/dx [c·f(x)] =  c · f'(x)\nd/dx [f+g]    =  f'(x) + g'(x)", legend: [
    "`d/dx` — \"derivada em relação a x\"",
    '`n·xⁿ⁻¹` — regra da potência: expoente desce e vira coeficiente',
    '`c` constante: derivada zero',
    "A linha: `f'(x)` — outra forma de escrever derivada de f",
  ]},
  { type: 'formal', eq: "f'(x)  =  lim(h→0)  [f(x+h) − f(x)] / h", legend: [
    'A definição por trás de todas as regras',
    'Quanto f muda quando x anda h, dividido por h — com h tendendo a zero',
  ]},

  { type: 'h2', text: 'Ver na prática' },
  { type: 'code', code:
`const h = 0.00001;
const derivNum = (f, x) => (f(x + h) - f(x)) / h;

// f(x) = 4x³ − 2x² + 7x − 5  →  f'(x) = 12x² − 4x + 7
const f    = x => 4*x**3 - 2*x**2 + 7*x - 5;
const fAna = x => 12*x**2 - 4*x + 7;

print('Numérica vs analítica:');
[-2,-1,0,1,2,3].forEach(x => {
  print(\`  x=\${x}: ≈\${derivNum(f,x).toFixed(2)}  exato=\${fAna(x)}\`);
});

// Mínimo de x² - 6x + 5
print('\\nMínimo de x²-6x+5: derivada = 2x-6 = 0 → x=3');
const g = x => x**2 - 6*x + 5;
[-1,0,1,2,3,4,5].forEach(x => print(\`  x=\${x}: f=\${g(x)}\`));` },
];
