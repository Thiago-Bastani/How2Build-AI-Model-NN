export const blocks = [
  { type: 'h1', text: 'Variável Aleatória e Distribuições' },
  { type: 'p', text: 'Pensa numa rifa: cada bilhete tem um número, e o número sorteado é incerto até o sorteio acontecer. Antes do sorteio, você não sabe qual número vai sair — mas sabe exatamente quais números **podem** sair, e consegue falar sobre a chance de cada um.' },
  { type: 'p', text: 'Isso é diferente de uma variável comum, tipo "idade" ou "preço", onde você simplesmente lê o valor e pronto. Aqui, o valor em si é o resultado de algo incerto — um sorteio, uma jogada de dado, o resultado de um exame médico. Você usa um número pra representar esse resultado, mas o número "carrega" a incerteza junto com ele.' },
  { type: 'p', text: 'Agora pensa em duas rifas diferentes. Na rifa A, os 100 bilhetes têm chances praticamente iguais de sair — nenhum se destaca. Na rifa B, um bilhete específico (o número 42) tem 90% de chance de sair, porque foi assim que o sorteio foi armado. Antes do sorteio da rifa B, você já está bem mais confiante sobre o que vai acontecer do que na rifa A. A rifa A é mais "incerta"; a rifa B é mais "previsível".' },
  { type: 'note', text: 'Resumo da fase leiga: uma variável aleatória é um número que representa o resultado de algo incerto. A lista de chances de cada resultado possível — toda concentrada num só, ou espalhada por muitos — é o que diferencia uma situação previsível de uma bem incerta.' },

  { type: 'h2', text: 'Variável aleatória: definição formal' },
  { type: 'p', text: 'Uma **variável aleatória** é uma função que atribui um número a cada resultado possível de um experimento incerto. Ela recebe letras maiúsculas por convenção — `X`, `Y` — pra diferenciar de uma variável comum.' },
  { type: 'formal', eq: 'X: resultado do experimento → número real', legend: [
    '`X` — o nome da variável aleatória (maiúscula, por convenção)',
    'o experimento — a fonte da incerteza: jogar um dado, jogar uma moeda, sortear uma rifa',
    'o número real — o que `X` retorna para aquele resultado específico',
  ]},
  { type: 'p', text: 'Exemplo: jogar um dado de 6 lados. A variável aleatória `X` = "o número que sai na face de cima" pode assumir qualquer valor de {1, 2, 3, 4, 5, 6}. Antes de jogar, você não sabe qual valor `X` vai ter — mas sabe todos os valores possíveis, e (se o dado for honesto) sabe a chance de cada um: `1/6` cada.' },
  { type: 'p', text: 'Chama-se **variável aleatória discreta** quando os valores possíveis formam uma lista contável — como as faces de um dado, ou o resultado de "cara"/"coroa". O oposto (variável aleatória contínua, onde os valores formam um intervalo infinito de números, como "altura exata de uma pessoa") existe mas não é o foco desta aula — o que importa aqui é o caso discreto, que é o que aparece na saída de um classificador.' },

  { type: 'h2', text: 'Distribuição de probabilidade' },
  { type: 'p', text: 'A **distribuição de probabilidade** de uma variável aleatória é a lista completa de "qual resultado, qual chance" — um número de probabilidade para cada valor que a variável pode assumir.' },
  { type: 'formal', eq: 'P(X = x₁), P(X = x₂), ..., P(X = xₙ)', legend: [
    '`X = x₁` — o evento "a variável aleatória X assumiu o valor específico x₁"',
    '`P(X = x₁)` — a probabilidade desse evento',
    'A lista completa, para todos os `n` valores possíveis, é a distribuição inteira',
  ]},
  { type: 'p', text: 'Pra um dado honesto, a distribuição é: `P(X=1)=1/6, P(X=2)=1/6, ..., P(X=6)=1/6` — seis valores, todos iguais. Isso é uma distribuição **uniforme**: nenhum resultado é favorecido.' },
  { type: 'p', text: 'Toda distribuição de probabilidade, não importa o formato, obedece a uma regra inegociável, que você já viu na aula anterior generalizada aqui com a notação de somatório:' },
  { type: 'formal', eq: 'Σᵢ₌₁ⁿ P(X = xᵢ) = 1', legend: [
    '`Σᵢ₌₁ⁿ` — soma sobre todos os `n` valores possíveis que `X` pode assumir',
    '`P(X = xᵢ)` — a probabilidade de cada valor individual',
    'A soma inteira dá **exatamente 1** — sempre. Algum dos resultados possíveis vai acontecer, com certeza',
  ]},

  { type: 'h3', text: 'Distribuição achatada vs. distribuição concentrada' },
  { type: 'p', text: 'Compare duas distribuições sobre os mesmos 4 resultados possíveis {A, B, C, D}:' },
  { type: 'list', items: [
    'Distribuição achatada: `P(A)=0.25, P(B)=0.25, P(C)=0.25, P(D)=0.25` — todos igualmente prováveis. Alta incerteza: se alguém perguntar "qual vai sair?", você não tem nenhum palpite melhor que outro.',
    'Distribuição concentrada: `P(A)=0.94, P(B)=0.03, P(C)=0.02, P(D)=0.01` — um resultado domina. Baixa incerteza: você apostaria com bastante confiança em `A`.',
  ]},
  { type: 'p', text: 'Repare que em ambos os casos a soma das 4 probabilidades dá exatamente 1 — isso não muda nunca. O que muda é **como** essa massa de probabilidade total de "1" está distribuída entre os resultados: espalhada igualmente (achatada) ou empilhada num só (concentrada).' },
  { type: 'note', text: 'Resumo da fase Expert: variável aleatória = número que representa um resultado incerto. Distribuição de probabilidade = a lista completa de chances para cada resultado possível, somando sempre 1. Achatada = alta incerteza. Concentrada = baixa incerteza.' },

  { type: 'divider' },
  { type: 'h2', text: 'Por que isso importa para IA' },
  { type: 'p', text: 'Essa lista de números que soma exatamente 1 — uma para cada resultado possível — é literalmente o formato de saída de uma camada de rede neural chamada **softmax**, que você vai construir do zero no final desta trilha. Quando uma rede de classificação diz "gato: 0.82, cachorro: 0.12, pássaro: 0.06", ela está te entregando uma distribuição de probabilidade completa sobre os resultados possíveis — e agora você já sabe reconhecer se essa distribuição está "achatada" (a rede está incerta) ou "concentrada" (a rede está confiante).' },
];
