export const blocks = [
  { type: 'h1', text: 'Regras de Derivação' },
  { type: 'p', text: 'Imagina que toda vez que você precisasse saber o troco de uma compra, tivesse que refazer a conta de subtração inteira do zero, na mão. Depois de fazer isso mil vezes, alguém percebe um padrão e cria uma tabela pronta: "se o preço termina em ,99, o troco é...". A tabela não muda a matemática — só evita repetir o mesmo raciocínio do zero toda vez.' },
  { type: 'p', text: 'É exatamente isso que as regras de derivação são. Na aula de Derivada você viu que, pra achar a inclinação instantânea, em princípio você tem que calcular um limite — encolher a distância entre dois pontos até quase zero e ver aonde a conta chega. Fazer isso na mão pra cada função seria uma tortura. As regras desta aula são atalhos, provados uma vez a partir daquele limite, que funcionam sempre.' },

  { type: 'h2', text: 'Regra da constante' },
  { type: 'p', text: 'Uma função constante, tipo `f(x) = 7`, nunca muda — não importa o que você faça com x, a saída é sempre 7. Se a saída nunca muda, a taxa de variação dela é zero. Simples assim.' },
  { type: 'formula', text: "d/dx [c] = 0" },

  { type: 'h2', text: 'Regra da potência (retomando)' },
  { type: 'p', text: 'Você já viu isso na aula de Derivada, calculado na mão pra `x²` em x=2: o resultado bateu com `2x`. A regra geral, que vale pra qualquer expoente n, é: desce o expoente multiplicando na frente, e diminui o expoente em 1.' },
  { type: 'formula', text: "d/dx [xⁿ] = n·xⁿ⁻¹" },
  { type: 'p', text: 'Exemplo: `d/dx[x³] = 3x²`. Exemplo: `d/dx[x] = d/dx[x¹] = 1·x⁰ = 1` (faz sentido: a reta `f(x)=x` sobe 1 unidade a cada unidade andada, sempre).' },

  { type: 'h2', text: 'Regra da soma' },
  { type: 'p', text: 'Se uma função é a soma de dois pedaços, tipo `f(x) = x² + x³`, você deriva cada pedaço separadamente e soma os resultados. Não precisa de nenhum truque especial — a taxa de variação de uma soma é a soma das taxas de variação de cada parte.' },
  { type: 'formula', text: "d/dx [f(x) + g(x)] = f'(x) + g'(x)" },
  { type: 'p', text: 'Exemplo: `d/dx[x² + x³] = 2x + 3x²`.' },

  { type: 'h2', text: 'Regra do produto — por que NÃO é só multiplicar as derivadas' },
  { type: 'p', text: 'Aqui a intuição muda. Você pode pensar que ia dar pra derivar `f(x)·g(x)` simplesmente multiplicando `f\'(x)` por `g\'(x)` — mas isso está errado, e dá pra ver com um exemplo simples por quê.' },
  { type: 'p', text: 'Pega `f(x) = x` e `g(x) = x`. O produto é `f(x)·g(x) = x·x = x²`. Já sabemos, pela regra da potência, que `d/dx[x²] = 2x`.' },
  { type: 'p', text: 'Agora testa a ideia errada: `f\'(x) = 1` e `g\'(x) = 1`, então `f\'(x)·g\'(x) = 1·1 = 1`. Isso NÃO é `2x`. A ideia de "multiplicar as derivadas" está errada.' },
  { type: 'p', text: 'O motivo intuitivo: quando você muda x um pouquinho, **os dois fatores mudam ao mesmo tempo**, e cada mudança contribui pra o produto total — não só uma de cada vez. A regra certa soma as duas contribuições: quanto o produto muda porque `f` mudou (mantendo g como estava), mais quanto muda porque `g` mudou (mantendo f como estava).' },
  { type: 'formula', text: "(f · g)'  =  f'·g  +  f·g'" },

  { type: 'h3', text: 'Exemplo resolvido — produto' },
  { type: 'p', text: 'Deriva `h(x) = x² · (x + 1)`.' },
  { type: 'p', text: 'Identifica: `f(x) = x²` então `f\'(x) = 2x`. `g(x) = x+1` então `g\'(x) = 1` (regra da soma: derivada de x é 1, derivada de constante 1 é 0).' },
  { type: 'p', text: 'Aplica a regra: `h\'(x) = f\'·g + f·g\' = 2x·(x+1) + x²·1`.' },
  { type: 'p', text: 'Expande: `2x² + 2x + x² = 3x² + 2x`.' },
  { type: 'formula', text: "d/dx [x²(x+1)]  =  3x² + 2x" },
  { type: 'p', text: 'Confere de outro jeito: `x²(x+1) = x³ + x²`. Derivando termo a termo (soma + potência): `3x² + 2x`. Bate.' },

  { type: 'h2', text: 'Regra do quociente' },
  { type: 'p', text: 'Quando uma função é uma divisão, `f(x)/g(x)`, existe uma regra parecida com a do produto, mas com um ajuste: o de cima menos o de baixo, tudo dividido pelo de baixo ao quadrado.' },
  { type: 'formula', text: "(f / g)'  =  (f'·g − f·g') / g²" },
  { type: 'p', text: 'Repare que a ordem importa aqui (diferente da soma do produto) — é `f\'g − fg\'`, não `fg\' − f\'g`. E o denominador vira `g²`, sempre.' },

  { type: 'h3', text: 'Exemplo resolvido — quociente' },
  { type: 'p', text: 'Deriva `h(x) = x² / (x + 1)`.' },
  { type: 'p', text: '`f(x) = x²`, `f\'(x) = 2x`. `g(x) = x+1`, `g\'(x) = 1`.' },
  { type: 'p', text: 'Aplica: `h\'(x) = [2x·(x+1) − x²·1] / (x+1)²`.' },
  { type: 'p', text: 'Expande o numerador: `2x² + 2x − x² = x² + 2x`.' },
  { type: 'formula', text: "d/dx [x²/(x+1)]  =  (x² + 2x) / (x+1)²" },

  { type: 'note', text: 'Resumo: constante deriva pra 0. Potência desce o expoente e diminui 1. Soma deriva termo a termo. Produto NÃO é derivada vezes derivada — é `f\'g + fg\'`, porque os dois fatores mudam ao mesmo tempo. Quociente é `(f\'g − fg\')/g²`. Com essas regras, e a regra da cadeia (próxima aula) para funções compostas, você consegue derivar praticamente qualquer combinação que vai aparecer no resto do caderno.' },

  { type: 'h2', text: 'A notação formal — resumo das quatro regras' },
  { type: 'formal', eq: "d/dx[c] = 0\nd/dx[xⁿ] = n·xⁿ⁻¹\n(f + g)' = f' + g'\n(f · g)' = f'g + fg'\n(f / g)' = (f'g − fg') / g²", legend: [
    '`c` — qualquer constante, número que não depende de x',
    '`n` — o expoente, qualquer número real',
    "`f'`, `g'` — as derivadas de f e g, calculadas separadamente",
    '`(f·g)\'` — derivada do produto: cada fator deriva enquanto o outro fica como está, e soma os dois resultados',
    '`(f/g)\'` — derivada do quociente: numerador `f\'g − fg\'`, sobre `g²`',
  ]},
];
