export const blocks = [
  { type: 'h1', text: 'Camadas e Redes Densas (MLP)' },

  { type: 'p', text: 'Volta ao segurança da balada. Um segurança sozinho, por mais experiente, tem um ponto de vista só. Agora imagina uma equipe inteira de seguranças na porta, cada um reparando em critérios diferentes — um foca na idade, outro na lista de convidados, outro no comportamento. No final, um gerente ouve o veredito de todos e toma a decisão final, combinando as opiniões da equipe inteira.' },

  { type: 'p', text: 'Isso é uma **camada** de neurônios: em vez de um julgador sozinho, um grupo inteiro, cada um olhando pras mesmas entradas mas com seus próprios pesos e seu próprio bias, produzindo cada um a sua opinião. E se você colocar uma equipe depois da outra — a opinião da primeira equipe vira a entrada da segunda — você tem uma rede com profundidade.' },

  { type: 'note', text: 'Resumo da fase leiga: uma camada é um grupo de neurônios olhando pra mesma entrada, cada um com seu próprio ponto de vista. Empilhar grupos assim, um alimentando o próximo, é o que dá "profundidade" à rede.' },

  { type: 'h2', text: 'Uma camada = uma matriz de pesos' },

  { type: 'p', text: 'Você já viu, no Perceptron, que um neurônio calcula `x · w + b` — um vetor de pesos `w` por neurônio. Uma camada inteira de neurônios nada mais é do que vários desses vetores `w` colocados lado a lado, formando uma **matriz** de pesos: cada coluna da matriz é o vetor de pesos de um neurônio diferente.' },

  { type: 'p', text: 'E aqui a Álgebra Linear se conecta direto: calcular a saída de todos os neurônios de uma camada, para todas as entradas, de uma vez só, é exatamente o **produto de matrizes** que você já estudou. A entrada (um vetor, ou uma matriz de várias amostras) multiplica a matriz de pesos da camada, e o resultado é o vetor (ou matriz) com a saída de cada neurônio.' },

  { type: 'formal', eq: 'H = f(X · W + b)', legend: [
    '`X` — a matriz de entradas: uma linha por amostra, uma coluna por feature',
    '`W` — a matriz de pesos da camada: uma coluna por neurônio, uma linha por feature de entrada',
    '`X · W` — o produto de matrizes: calcula a soma pesada de cada neurônio, para cada amostra, de uma vez',
    '`b` — o vetor de bias da camada: um valor por neurônio, somado em cada linha do resultado',
    '`f( )` — a função de ativação (da aula anterior), aplicada em cada valor do resultado',
    '`H` — a matriz de saída da camada: uma linha por amostra, uma coluna por neurônio',
  ]},

  { type: 'p', text: 'Repare que o número de colunas de `W` é uma escolha de projeto — quantos neurônios você quer nessa camada. Mais neurônios numa camada significa mais "pontos de vista" diferentes sendo calculados em paralelo sobre a mesma entrada.' },

  { type: 'h2', text: 'Empilhando camadas: profundidade' },

  { type: 'p', text: 'A saída `H` de uma camada — já passada pela ativação — vira a entrada da próxima camada, que tem sua própria matriz de pesos e seu próprio bias. Nada impede de repetir isso quantas vezes fizer sentido: entrada → camada 1 → camada 2 → ... → camada final → saída.' },

  { type: 'p', text: 'Esse tipo de rede — várias camadas onde cada neurônio de uma camada se conecta a **todos** os neurônios da camada seguinte — tem um nome consagrado: **MLP**, de Multi-Layer Perceptron (Perceptron de Múltiplas Camadas). Cada uma dessas camadas, onde tudo se conecta com tudo, é chamada de **camada densa** (ou fully-connected, "totalmente conectada").' },

  { type: 'note', text: '**MLP** = várias camadas densas empilhadas, cada uma seguida de uma ativação não-linear (exceto, tipicamente, a última). **Camada densa** = uma camada onde cada neurônio recebe todas as saídas da camada anterior como entrada.' },

  { type: 'h2', text: 'Desmistificando "deep learning"' },

  { type: 'p', text: 'O termo **deep learning** ("aprendizado profundo") soa imponente, mas significa exatamente o que você acabou de construir: uma rede com várias camadas empilhadas — "profunda" no sentido de ter profundidade (várias camadas em sequência), não no sentido de ser complicada ou misteriosa. Uma rede com 2 camadas já é, tecnicamente, "profunda"; redes com dezenas ou centenas de camadas são apenas versões maiores do mesmo princípio.' },

  { type: 'p', text: 'A razão pela qual empilhar camadas ajuda é acumulativa: a primeira camada aprende a combinar as entradas originais de um jeito; a segunda camada aprende a combinar as saídas da primeira de outro jeito, construindo padrões mais complexos em cima dos padrões que a primeira já detectou; e assim por diante. Cada camada extra é uma chance a mais de recombinar e refinar o que veio antes — desde que, entre elas, exista a não-linearidade da ativação, sem a qual (como você viu na aula anterior) todo esse empilhamento colapsaria de volta pra uma única transformação linear.' },

  { type: 'divider' },
  { type: 'note', text: 'Resumo: uma camada densa é uma matriz de pesos aplicada via produto de matrizes, seguida de ativação. Um MLP é uma sequência dessas camadas. "Deep learning" só significa "rede com várias camadas empilhadas" — o termo em si não esconde nenhum mistério adicional.' },
];
