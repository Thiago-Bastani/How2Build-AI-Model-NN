export const blocks = [
  { type: 'h1', text: 'Trigonometria Básica: Seno e Cosseno' },
  { type: 'p', text: 'Pense num cavalo de pau-a-pique de parque de diversões, daqueles presos numa haste que gira em círculo. Enquanto ele gira, em cada instante ele está numa altura diferente do chão, e também numa posição diferente pra frente/atrás em relação ao centro do carrossel. Quando ele está bem no topo, a altura é máxima. Quando está embaixo, a altura é mínima. Quando está na lateral, a altura é a do centro, e ele está o mais afastado possível do centro pra um dos lados.' },
  { type: 'p', text: 'Repare que essa altura, e essa distância lateral ao centro, mudam de um jeito **repetitivo**: depois de dar uma volta completa, o cavalo volta a passar exatamente pelas mesmas alturas e posições, na mesma ordem. O padrão se repete a cada volta, pra sempre.' },
  { type: 'p', text: 'Seno e cosseno são, no fundo, exatamente isso: duas contas que descrevem "a altura" e "a distância lateral" de um ponto girando em círculo, a cada instante da volta.' },

  { type: 'h2', text: 'O círculo unitário' },
  { type: 'p', text: 'Usando as coordenadas da aula anterior, desenhe um círculo bem simples: centro na origem `(0,0)` e raio igual a 1 (por isso "unitário" — o raio vale exatamente 1 unidade). Um ponto gira ao redor da borda desse círculo, começando à direita, no ponto `(1, 0)`.' },
  { type: 'p', text: 'Conforme esse ponto gira (no sentido anti-horário, por convenção), ele muda de posição — e cada posição tem uma coordenada `(x, y)` diferente, exatamente como o cavalo do carrossel muda de altura e de distância lateral ao centro.' },

  { type: 'h2', text: 'Seno = altura, cosseno = base' },
  { type: 'p', text: 'A coordenada vertical (`y`) do ponto que está girando — a "altura" dele em relação ao centro do círculo — é o que chamamos de **seno**. A coordenada horizontal (`x`) — a "base", o quanto ele está deslocado pro lado em relação ao centro — é o **cosseno**.' },
  { type: 'p', text: 'Quando o ponto está bem no topo do círculo, a altura (seno) é máxima, valendo 1, e a base (cosseno) é zero — ele está exatamente em cima do centro, sem deslocamento lateral. Quando o ponto está bem na direita, na posição inicial, a base (cosseno) é máxima, valendo 1, e a altura (seno) é zero.' },
  { type: 'p', text: 'O que muda de um ponto do círculo para o outro é apenas **quanto o ponto já girou** — o ângulo percorrido desde a posição inicial. Seno e cosseno são funções desse ângulo: você entrega "quanto já girou" e elas devolvem "qual a altura" e "qual a base" naquele instante.' },

  { type: 'h2', text: 'Por que seno e cosseno se repetem em ondas' },
  { type: 'p', text: 'Uma volta completa no círculo traz o ponto de volta exatamente à posição de onde ele saiu. Depois disso, se ele continuar girando, ele passa pelas mesmas alturas e bases de novo, na mesma ordem — porque é o mesmo círculo, sendo percorrido de novo.' },
  { type: 'p', text: 'É por isso que seno e cosseno são chamadas de funções **periódicas**: seus valores repetem em um padrão fixo, uma vez a cada volta completa, pra sempre. Se você desenhar a altura (seno) ao longo do tempo enquanto o ponto gira sem parar, o desenho fica em formato de onda, subindo e descendo suavemente entre -1 e 1, repetindo o mesmo formato a cada volta.' },
  { type: 'note', text: 'Resumo leigo: imagine um ponto girando num círculo de raio 1. O seno é a altura desse ponto em relação ao centro; o cosseno é a distância lateral (base) em relação ao centro. Como o ponto volta ao mesmo lugar a cada volta completa, os dois valores sobem e descem em ondas que se repetem para sempre.' },

  { type: 'h2', text: 'A notação formal' },
  { type: 'p', text: 'O ângulo que o ponto já percorreu desde a posição inicial é normalmente representado pela letra grega `θ` (theta). A posição do ponto, em função desse ângulo, é dada por:' },
  { type: 'formal', eq: 'x = cos(θ)     y = sin(θ)', legend: [
    '`θ` — o ângulo já percorrido pelo ponto, medido a partir da posição inicial `(1,0)`',
    '`cos(θ)` — cosseno de θ: a coordenada horizontal (base) do ponto no círculo unitário, depois de girar `θ`',
    '`sin(θ)` — seno de θ: a coordenada vertical (altura) do ponto no círculo unitário, depois de girar `θ`',
    'Juntos, `(cos(θ), sin(θ))` são exatamente a coordenada `(x, y)` do ponto girando, para cada ângulo θ',
  ]},
  { type: 'p', text: 'Ângulos costumam ser medidos em **radianos** em vez de graus, onde uma volta completa vale `2π` radianos (em vez de 360°) — mas a essência não muda: é só uma unidade diferente pra medir "quanto já girou".' },

  { type: 'h3', text: 'Valores fáceis de conferir' },
  { type: 'list', items: [
    'Ângulo 0 (posição inicial, `(1,0)`): `cos(0) = 1`, `sin(0) = 0`',
    'Ângulo de 1/4 de volta (`θ = π/2`, topo do círculo, `(0,1)`): `cos(π/2) = 0`, `sin(π/2) = 1`',
    'Ângulo de 1/2 volta (`θ = π`, extremo esquerdo, `(-1,0)`): `cos(π) = -1`, `sin(π) = 0`',
    'Ângulo de 1 volta completa (`θ = 2π`, de volta ao início): `cos(2π) = 1`, `sin(2π) = 0` — idêntico ao ângulo 0, confirmando a periodicidade',
  ]},

  { type: 'formal', eq: 'sin(θ + 2π) = sin(θ)     cos(θ + 2π) = cos(θ)', legend: [
    '`θ + 2π` — o ângulo depois de completar mais uma volta inteira em relação a `θ`',
    'A igualdade diz que somar uma volta completa ao ângulo não muda nem o seno nem o cosseno — é a definição formal de periodicidade: a função repete seus valores em intervalos regulares e previsíveis, pra sempre',
  ]},

  { type: 'note', text: 'Seno e cosseno vão reaparecer bem mais adiante, aplicados a um problema aparentemente distante: dar a cada palavra de uma frase uma marca de "em qual posição ela está" dentro da sequência, usando exatamente esse formato de onda que se repete — uma técnica chamada positional encoding. A ferramenta é a mesma daqui: uma função que sobe e desce em ondas previsíveis, repetindo o padrão em ciclos regulares.' },
];
