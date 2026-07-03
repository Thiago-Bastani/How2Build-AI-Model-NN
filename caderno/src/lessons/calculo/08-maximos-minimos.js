export const blocks = [
  { type: 'h1', text: 'Máximos, Mínimos e Pontos Críticos' },
  { type: 'p', text: 'Pensa numa montanha-russa. No topo de uma subida, bem no instante antes de começar a descer, o trilho fica momentaneamente na horizontal — nem subindo, nem descendo. O mesmo acontece no fundo de um vale, no instante antes de começar a subir de novo. Esses pontos planos, horizontais, são exatamente onde os picos e os vales acontecem.' },
  { type: 'p', text: 'Isso importa porque, em quase todo problema de aprendizado de máquina, o objetivo é achar o ponto de **menor erro possível** — o fundo de um vale numa função que mede o quanto o modelo está errando. Saber reconhecer matematicamente "isto aqui é o fundo de um vale" é o que torna possível procurar esse ponto de forma automática, sem precisar olhar o gráfico.' },

  { type: 'h2', text: 'Derivada zero marca um candidato' },
  { type: 'p', text: 'Você já sabe (aula de Derivada) que a derivada é a inclinação da reta tangente num ponto. Onde o trilho fica horizontal, a inclinação é zero. Ou seja: nos picos e nos vales de uma curva suave, a derivada vale exatamente 0.' },
  { type: 'p', text: 'Esses pontos — onde `f\'(x) = 0` — são chamados **pontos críticos**. São candidatos a máximo (pico) ou mínimo (vale). "Candidatos" porque derivada zero por si só não diz qual dos dois é — só diz que ali o trilho está momentaneamente plano.' },

  { type: 'h2', text: 'Concavidade — a curva "sorrindo" ou "de cabeça baixa"' },
  { type: 'p', text: 'Pra decidir se um ponto plano é pico ou vale, olha pro formato da curva ao redor dele. Se a curva parece um sorriso — um U, curvando pra cima nas duas pontas — o ponto plano no meio é um vale, o fundo do U. Se a curva parece uma boca de cabeça baixa — um ∩, curvando pra baixo — o ponto plano é um pico, o topo do ∩.' },
  { type: 'p', text: 'Esse "formato de sorriso ou de cabeça baixa" tem nome técnico: concavidade. Concavidade **pra cima** (sorriso, formato de vale) ou concavidade **pra baixo** (cabeça baixa, formato de pico).' },

  { type: 'h2', text: 'A segunda derivada decide' },
  { type: 'p', text: 'A concavidade é medida pela **segunda derivada** — a derivada da derivada. Faz sentido: a primeira derivada te diz a inclinação; se você derivar a inclinação de novo, descobre se a inclinação está aumentando (a curva está virando pra cima, tipo sorriso) ou diminuindo (virando pra baixo, tipo cabeça baixa).' },
  { type: 'list', items: [
    'Segunda derivada **positiva** no ponto crítico → concavidade pra cima → o ponto é um **mínimo**',
    'Segunda derivada **negativa** no ponto crítico → concavidade pra baixo → o ponto é um **máximo**',
  ]},
  { type: 'p', text: 'Esse procedimento tem nome: o teste da segunda derivada. Existe também o teste da primeira derivada, que não precisa calcular a segunda derivada: você olha o sinal de `f\'(x)` um pouquinho antes e um pouquinho depois do ponto crítico. Se a inclinação passa de negativa (descendo) para positiva (subindo), é um vale — mínimo. Se passa de positiva pra negativa, é um pico — máximo. Se o sinal não muda dos dois lados, aquele ponto plano não é nem pico nem vale (é um ponto de inflexão, uma pausa momentânea antes de continuar no mesmo sentido).' },

  { type: 'h2', text: 'Exemplo completo' },
  { type: 'p', text: 'Seja `f(x) = x² − 4x + 5`. Achar os pontos críticos e classificá-los.' },
  { type: 'p', text: '**Passo 1 — derivar.** Usando a regra da soma e da potência (já vistas): `f\'(x) = 2x − 4`.' },
  { type: 'p', text: '**Passo 2 — igualar a zero e resolver.** `2x − 4 = 0` → `x = 2`. Esse é o único ponto crítico.' },
  { type: 'p', text: '**Passo 3 — segunda derivada.** Deriva `f\'(x) = 2x − 4` de novo: `f\'\'(x) = 2`.' },
  { type: 'p', text: '**Passo 4 — testar o sinal.** `f\'\'(2) = 2`, que é positivo. Concavidade pra cima → `x=2` é um **mínimo**.' },
  { type: 'p', text: '**Passo 5 — achar o valor mínimo.** `f(2) = 2² − 4·2 + 5 = 4 − 8 + 5 = 1`. O ponto mais baixo da curva é `(2, 1)`.' },
  { type: 'formula', text: "f(x) = x² − 4x + 5   →   mínimo em x=2, valor 1" },
  { type: 'viz', id: 'derivada-curvas' },

  { type: 'note', text: 'Resumo: pontos críticos são onde a derivada vale zero — candidatos a pico ou vale. A segunda derivada decide qual dos dois: positiva = concavidade pra cima = mínimo; negativa = concavidade pra baixo = máximo. Esse é o fundamento matemático real por trás do Gradient Descent (próximas aulas): o algoritmo procura, literalmente, um ponto de derivada zero com concavidade pra cima — o fundo de um vale — porque é ali que o erro é o menor possível.' },

  { type: 'h2', text: 'A notação formal' },
  { type: 'formal', eq: "f'(x) = 0   →   x é ponto crítico\n\nf''(x) > 0  →  mínimo local\nf''(x) < 0  →  máximo local", legend: [
    '`f\'(x) = 0` — condição necessária: a reta tangente é horizontal nesse ponto',
    "`f''(x)` — a segunda derivada: a derivada aplicada sobre a própria derivada; mede como a inclinação está mudando",
    '`f\'\'(x) > 0` — inclinação crescendo — concavidade pra cima — vale — mínimo',
    "`f''(x) < 0` — inclinação diminuindo — concavidade pra baixo — pico — máximo",
  ]},
];
