export const blocks = [
  { type: 'h1', text: 'Um Neurônio Sozinho (Perceptron)' },

  { type: 'p', text: 'Imagine um segurança na porta de uma balada. Ele olha pra várias coisas antes de deixar alguém entrar: idade parece ok? Está na lista? Chegou antes da meia-noite? Cada critério pesa diferente na decisão dele — talvez "está na lista" pese muito mais que "chegou cedo". Ele soma mentalmente a importância de cada sinal, e se o total passar de um certo limite, ele libera a entrada.' },

  { type: 'p', text: 'Um neurônio artificial faz exatamente esse tipo de julgamento, só que com números. Ele recebe várias entradas, dá um peso de importância pra cada uma, soma tudo, e decide uma saída com base nessa soma.' },

  { type: 'p', text: 'Esse "decidir" no final não é um sim/não seco — é passar o resultado por uma função que ajusta o quanto vai deixar passar. Por agora, pense nela como uma caixa-preta: alguma coisa que pega o número da soma e devolve outro número, moldado de algum jeito. A próxima aula abre essa caixa. Por enquanto, o que importa é a soma pesada que vem antes dela.' },

  { type: 'note', text: 'Resumo da fase leiga: um neurônio é um julgador. Cada entrada tem um peso de importância, ele soma tudo pesado, e o resultado passa por uma "caixa de decisão" que produz a saída.' },

  { type: 'h2', text: 'A soma pesada: produto escalar + bias' },

  { type: 'p', text: 'Você já viu, na Álgebra Linear, o que é o produto entre um vetor de entradas e um vetor de pesos — cada entrada multiplicada pelo peso correspondente, tudo somado. Um neurônio é literalmente isso.' },

  { type: 'p', text: 'Se as entradas são `x₁, x₂, ..., xₙ` e os pesos são `w₁, w₂, ..., wₙ`, a soma pesada é `x₁w₁ + x₂w₂ + ... + xₙwₙ` — exatamente o produto escalar entre o vetor `x` e o vetor `w` que você já sabe calcular.' },

  { type: 'p', text: 'Falta uma peça: o **bias** (viés). É um número extra, somado no final, que não depende de nenhuma entrada. Ele desloca o resultado pra cima ou pra baixo — sem ele, o neurônio seria forçado a produzir zero sempre que todas as entradas fossem zero, o que é uma limitação desnecessária. O bias dá ao neurônio a liberdade de ter um "ponto de partida" próprio.' },

  { type: 'p', text: 'Pense no bias como o quão fácil ou difícil é o segurança liberar a entrada por padrão, antes mesmo de olhar pra qualquer critério — um segurança mais rígido tem um bias mais negativo, um mais liberal tem um bias mais positivo.' },

  { type: 'h2', text: 'A caixa de decisão: uma função aplicada no final' },

  { type: 'p', text: 'Depois de somar tudo (entradas pesadas + bias), esse número bruto passa por uma função que transforma o resultado — encolhendo, cortando negativos, ou moldando de outra forma. Essa função tem um nome técnico que a próxima aula apresenta com calma; por ora, o essencial é saber que ela existe e que fica **depois** da soma pesada, nunca antes.' },

  { type: 'h2', text: 'Notação formal do neurônio' },

  { type: 'formal', eq: 'y = f(x · w + b)', legend: [
    '`x` — o vetor de entradas: `x₁, x₂, ..., xₙ`',
    '`w` — o vetor de pesos: um peso de importância para cada entrada',
    '`x · w` — o produto escalar entre entrada e pesos: `x₁w₁ + x₂w₂ + ... + xₙwₙ`',
    '`b` — o bias, um número somado no final, independente das entradas',
    '`f( )` — a função de decisão aplicada por último (detalhada na próxima aula)',
    '`y` — a saída do neurônio',
  ]},

  { type: 'p', text: 'Um neurônio inteiro se resume a dois ingredientes ajustáveis: o vetor de pesos `w` e o escalar `b`. Treinar uma rede neural é, no fundo, encontrar os valores de `w` e `b` que fazem o neurônio acertar o máximo possível — é exatamente isso que o gradient descent, que você já estudou, faz.' },

  { type: 'divider' },

  { type: 'h2', text: 'A limitação de um neurônio sozinho: só separa com uma linha reta' },

  { type: 'p', text: 'Um neurônio sozinho, por mais que você ajuste `w` e `b`, só consegue tomar decisões que correspondem a **separar o espaço de entradas com uma linha reta** (ou, em mais dimensões, um plano, ou hiperplano). Tudo de um lado da linha vira uma decisão, tudo do outro lado vira outra.' },

  { type: 'p', text: 'Isso funciona bem quando os dados realmente são separáveis assim. Mas existem problemas onde nenhuma linha reta resolve — o exemplo clássico é o **XOR** (ou-exclusivo): imagine quatro pontos, dois marcados "verdadeiro" e dois marcados "falso", posicionados de forma que os "verdadeiros" ficam em cantos opostos e os "falsos" nos outros dois cantos opostos. Não existe uma única linha reta que separe os "verdadeiros" dos "falsos" nesse arranjo — qualquer reta que você desenhar vai deixar pelo menos um ponto do lado errado.' },

  { type: 'note', text: 'Um neurônio sozinho é um separador linear: ele divide o espaço com uma linha reta (ou plano). Problemas como o XOR, onde a separação correta tem "curvas" ou exige mais de uma fronteira, são impossíveis para um único neurônio, não importa quanto você treine.' },

  { type: 'p', text: 'Essa não é uma falha de treino — é uma limitação geométrica inerente à forma da equação `f(x · w + b)`. Nenhum ajuste de pesos muda o fato de que `x · w + b` é, por trás de tudo, uma expressão linear, e uma fronteira de decisão baseada nela só pode ser reta.' },

  { type: 'p', text: 'A saída óbvia: e se, em vez de um neurônio, você usasse vários, cada um desenhando sua própria linha, e depois combinasse as decisões deles? É exatamente essa ideia — empilhar vários neurônios, e depois empilhar camadas inteiras deles — que abre a porta para redes capazes de separar praticamente qualquer formato de dado. É o assunto das próximas aulas.' },
];
