export const blocks = [
  { type: 'h1', text: 'Funções: Entrada, Regra, Saída' },
  { type: 'p', text: 'Pense numa máquina de suco. Você põe uma fruta na entrada, a máquina faz sempre o mesmo processo por dentro — lava, espreme, coa — e sai um copo de suco. A mesma fruta, no mesmo estado, sempre vira o mesmo suco. Você não precisa saber os detalhes das engrenagens lá dentro pra confiar no resultado: você só confia que a máquina segue sempre a mesma regra.' },
  { type: 'p', text: 'Uma **função** matemática é exatamente essa máquina: você entrega um valor de entrada, ela aplica uma regra fixa, e devolve um valor de saída. A mesma entrada, aplicada à mesma função, sempre produz a mesma saída.' },
  { type: 'p', text: 'Isso resolve um problema parecido com o das expressões da aula passada: em vez de descrever "o que fazer com o número" toda vez em texto corrido, a função embala essa receita com um nome, pra você poder reaproveitá-la quantas vezes quiser, com qualquer entrada.' },

  { type: 'h2', text: 'Entrada, regra, saída' },
  { type: 'p', text: 'Toda função tem três partes: um valor que entra, uma regra que transforma esse valor, e um valor que sai. Exemplo do dia a dia: "dobre o número e some 1". Se entra 3, a regra manda dobrar (`6`) e somar 1 (`7`) — sai 7. Se entra 10, sai `10×2+1 = 21`.' },
  { type: 'p', text: 'Repare que a regra não muda — só o número que você escolhe pôr na entrada muda o que sai. É o mesmo espírito da variável: a regra é fixa, o valor de entrada é o que varia.' },

  { type: 'h2', text: 'Funções com várias entradas' },
  { type: 'p', text: 'Uma máquina também pode ter mais de uma abertura de entrada. Pense numa máquina que recebe dois ingredientes — fruta e água — e produz um suco mais ou menos concentrado dependendo da proporção dos dois. A regra usa **as duas** entradas ao mesmo tempo pra decidir a saída.' },
  { type: 'p', text: 'Exemplo numérico: uma regra que recebe dois números, `x` e `y`, e devolve `x × y + 1`. Com `x=2` e `y=3`: sai `2×3+1 = 7`. Com `x=5` e `y=0`: sai `5×0+1 = 1`. Duas entradas, uma regra, uma saída — só que agora a saída depende da combinação das duas.' },

  { type: 'h2', text: 'O gráfico de uma função: um mapa de entrada para saída' },
  { type: 'p', text: 'Se você testar uma função com várias entradas diferentes e marcar cada par (entrada, saída) num desenho, você constrói um **mapa**: pra cada ponto na entrada, existe um ponto correspondente na saída. Esse mapa desenhado é o que chamamos de gráfico da função.' },
  { type: 'p', text: 'Você já viu, na aula de Coordenadas, que dois números descrevem um ponto no plano cartesiano. É exatamente isso que um gráfico de função usa: o eixo x marca a entrada testada, o eixo y marca a saída que ela produziu — cada par (entrada, saída) vira um ponto `(x, y)` no mesmo plano de antes.' },
  { type: 'p', text: 'Esse mapa é útil porque, de uma olhada só, você enxerga o comportamento inteiro da função: onde ela cresce, onde ela cai, onde ela fica parada — sem precisar testar entrada por entrada na mão. Repare como cada tipo de função (reta, curva em U, explosão) tem uma "assinatura visual" diferente:' },
  { type: 'viz', id: 'funcoes-custo' },

  { type: 'note', text: 'Resumo: função = máquina com regra fixa. Você entrega uma (ou mais) entradas, ela aplica sempre a mesma regra, e devolve uma saída. O gráfico é o mapa visual de todas as entradas testadas contra suas saídas correspondentes, usando o plano cartesiano já visto.' },

  { type: 'h2', text: 'A notação formal' },
  { type: 'formal', eq: 'f(x) = 2x + 1', legend: [
    '`f` — o nome dado à função (poderia ser qualquer letra; `f` de "função" é só convenção comum)',
    '`(x)` — indica que a saída depende do valor entregue na caixa `x`',
    '`f(x)` — lê-se "f de x": é o resultado, o valor de saída, depois de aplicar a regra à entrada `x`',
    '`2x + 1` — a regra em si: dobre a entrada e some 1',
  ]},
  { type: 'p', text: 'Substituir a entrada funciona igual à substituição em expressões — porque, por dentro, é exatamente isso que a função faz. Com `x = 3`:' },
  { type: 'formula', text: 'f(3) = 2×3 + 1 = 7' },
  { type: 'p', text: 'Com `x = 10`: `f(10) = 2×10+1 = 21`. Mesma regra, entradas diferentes, saídas diferentes — coerente com o exemplo leigo acima.' },

  { type: 'h3', text: 'Funções de várias variáveis' },
  { type: 'p', text: 'Quando a máquina tem mais de uma entrada, a notação lista todas as entradas dentro dos parênteses, separadas por vírgula:' },
  { type: 'formal', eq: 'f(x, y, z) = x·y + z', legend: [
    '`f(x, y, z)` — a saída depende de três entradas simultâneas: `x`, `y` e `z`',
    '`x·y` — as duas primeiras entradas multiplicadas entre si',
    '`+ z` — a terceira entrada, somada ao resultado da multiplicação',
  ]},
  { type: 'p', text: 'Com `x=2, y=3, z=4`: `f(2,3,4) = 2×3 + 4 = 10`. Nada muda conceitualmente em relação a uma entrada só — você só substitui mais de uma caixa ao mesmo tempo, na mesma conta.' },

  { type: 'h3', text: 'O gráfico como mapa formal' },
  { type: 'p', text: 'Formalmente, o gráfico de uma função de uma entrada só é o conjunto de todos os pares `(x, f(x))` possíveis, desenhados num plano: o eixo horizontal marca a entrada testada, o eixo vertical marca a saída que ela produziu. Cada ponto do desenho é uma entrada e sua saída, lado a lado.' },
  { type: 'p', text: 'Com duas entradas, `f(x, y)`, o gráfico precisaria de três eixos — dois pra entrada, um pra saída — porque agora existem três números envolvidos em cada ponto do mapa: `x`, `y` e o resultado `f(x,y)`.' },

  { type: 'note', text: 'Uma rede neural inteira — a peça central de tudo que vem depois neste caderno — é, no fundo, uma única função gigante: entram números, sai um número (ou vários), e por dentro existe uma regra fixa. A única diferença pra uma função simples como `f(x) = 2x+1` é que essa regra tem milhões de variáveis internas cujo valor o próprio sistema ajusta sozinho — as tais parâmetros da aula anterior — em vez de uma conta com duas ou três operações só.' },
];
