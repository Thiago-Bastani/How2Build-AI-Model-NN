export const blocks = [
  { type: 'h1', text: 'Funções de Ativação' },

  { type: 'p', text: 'Pensa numa torneira. A pressão da água (a entrada) empurra pra passar, mas é o registro da torneira que decide quanto realmente sai — pode deixar passar tudo, cortar totalmente, ou deixar passar só uma fração, de um jeito que não é simplesmente proporcional à pressão. O registro introduz uma decisão que não é só "multiplicar por um número fixo".' },

  { type: 'p', text: 'A caixa-preta que a aula anterior deixou em aberto — aquela função aplicada depois da soma pesada — é justamente esse registro. Ela decide o quanto do sinal "passa" pro resto da rede, e a maneira como ela decide não é uma simples proporção. É isso que separa um neurônio de uma calculadora de somas.' },

  { type: 'note', text: 'Resumo da fase leiga: a função de ativação é o registro da torneira — decide quanto do sinal recebido realmente passa adiante, de um jeito que não é só "multiplicar por uma constante".' },

  { type: 'h2', text: 'Por que "não ser proporcional" importa tanto' },

  { type: 'p', text: 'Aqui está o motivo técnico, e ele é sério: se você empilhar camadas de neurônios sem nenhuma função de ativação entre elas — só somas pesadas, uma atrás da outra — o resultado final continua sendo, matematicamise, uma única soma pesada. Empilhar 100 camadas lineares tem exatamente o mesmo poder de representação que usar 1 camada só.' },

  { type: 'h3', text: 'Provando com um exemplo pequeno' },

  { type: 'p', text: 'Suponha uma "camada 1" que transforma a entrada `x` assim: `h = 2x + 3`. E uma "camada 2" que pega `h` e transforma de novo: `y = 4h + 1`. Substituindo uma dentro da outra:' },

  { type: 'list', items: [
    '`y = 4h + 1`',
    '`y = 4(2x + 3) + 1`',
    '`y = 8x + 12 + 1`',
    '`y = 8x + 13`',
  ]},

  { type: 'p', text: 'O resultado, `y = 8x + 13`, é de novo uma expressão linear em `x` — exatamente do mesmo formato de cada camada individual (`número × x + número`). Não importa quantas camadas lineares você empilhar: a composição de transformações lineares é sempre, ela mesma, uma transformação linear. Duas camadas, ou duzentas, produzem uma família de funções idêntica à de uma camada só.' },

  { type: 'p', text: 'Isso é ruim porque uma transformação linear só sabe desenhar retas (ou planos) — é literalmente a mesma limitação geométrica que a aula anterior mostrou pro neurônio isolado, e ela não desaparece só por empilhar mais somas pesadas. Pra rede ganhar a capacidade de representar curvas, dobras, regiões separadas por fronteiras não-retas, é preciso quebrar essa linearidade em algum ponto — entre uma camada e a próxima. É esse o papel da função de ativação: introduzir uma não-linearidade.' },

  { type: 'note', text: 'Sem função de ativação não-linear entre as camadas, uma rede de qualquer profundidade equivale matematicamente a uma única camada linear. A ativação é o que dá à rede o poder de representar padrões curvos, não só retas.' },

  { type: 'h2', text: 'As três ativações clássicas' },

  { type: 'h3', text: 'ReLU (Rectified Linear Unit)' },

  { type: 'formal', eq: 'ReLU(z) = max(0, z)', legend: [
    '`z` — o valor recebido (a soma pesada que sai do neurônio)',
    '`max(0, z)` — se `z` for negativo, o resultado é 0; se for positivo, o resultado é o próprio `z`',
  ]},

  { type: 'p', text: 'Graficamente: uma linha achatada em zero para toda entrada negativa, e depois uma reta subindo com inclinação 1 a partir de zero — parece uma dobradiça. É a ativação mais usada em redes modernas, porque é simples de calcular e não "esmaga" o sinal positivo — ele passa direto.' },

  { type: 'h3', text: 'Sigmoid' },

  { type: 'formal', eq: 'sigmoid(z) = 1 / (1 + e⁻ᶻ)', legend: [
    '`z` — o valor recebido',
    '`e` — a base do logaritmo natural, já vista em Potências e Logaritmos',
    '`e⁻ᶻ` — cresce muito quando `z` é bem negativo, e encolhe rumo a 0 quando `z` é bem positivo',
    'o resultado inteiro fica sempre entre 0 e 1',
  ]},

  { type: 'p', text: 'Graficamente: uma curva em forma de S, achatada perto de 0 pra entradas bem negativas, achatada perto de 1 pra entradas bem positivas, e subindo suavemente no meio, perto de `z = 0`. Por espremer qualquer número real pro intervalo `(0, 1)`, a sigmoid é útil quando você quer interpretar a saída como algo entre "nunca" e "sempre" — uma espécie de intensidade.' },

  { type: 'p', text: 'Você já viu, na Trilha de Cálculo, como derivar exponenciais. Aplicando a regra da cadeia sobre `1/(1+e⁻ᶻ)`, chega-se a uma fórmula fechada pra derivada da sigmoid, escrita em termos dela mesma: `sigmoid(z) × (1 − sigmoid(z))`. O ponto importante aqui não é decorar essa derivação — é notar que a sigmoid é perfeitamente derivável usando ferramentas que você já domina, o que é exatamente o que o treino por gradiente vai precisar mais adiante.' },

  { type: 'h3', text: 'Tanh (tangente hiperbólica)' },

  { type: 'formal', eq: 'tanh(z) = (e^z − e⁻ᶻ) / (e^z + e⁻ᶻ)', legend: [
    '`z` — o valor recebido',
    '`e^z` e `e⁻ᶻ` — as mesmas exponenciais da sigmoid, combinadas de outro jeito',
    'o resultado fica sempre entre −1 e 1',
  ]},

  { type: 'p', text: 'Graficamente: também um S, mas centrado em zero e esticado entre −1 e 1 em vez de entre 0 e 1. É basicamente uma sigmoid reescalada. Por ser centrada em zero, tanh costuma ajudar o treino a convergir mais rápido que a sigmoid em camadas internas, já que a saída não fica sempre "puxada" pro lado positivo.' },

  { type: 'h2', text: 'Quando usar cada uma' },

  { type: 'list', items: [
    '**ReLU** — a escolha padrão para as camadas internas (escondidas) da maioria das redes modernas: rápida, simples, funciona bem na prática.',
    '**Sigmoid** — útil na camada de saída quando o problema pede um valor entre 0 e 1, como "qual a probabilidade disso ser verdadeiro" em uma classificação de duas categorias.',
    '**Tanh** — alternativa à sigmoid em camadas internas, quando centrar a saída em zero ajuda o treino.',
  ]},

  { type: 'p', text: 'Existe uma família inteira de outras ativações além dessas três clássicas — a que os Transformers modernos usam, por exemplo, se chama **GELU**. Ela não muda o princípio que você acabou de ver (quebrar a linearidade entre camadas), só refina a forma da curva. Fica como nome pra reconhecer mais adiante, quando a trilha de Arquiteturas Modernas chegar lá.' },
];
