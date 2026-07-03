export const blocks = [
  { type: 'h1', text: 'Por que Redes Densas Não Bastam para Tudo' },

  { type: 'p', text: 'Você acabou de construir, treinar e validar um MLP inteiro — dos tensores até a loss caindo numa curva de validação saudável. É uma conquista real: esse é o mesmo esqueleto matemático por trás de praticamente toda IA que existia antes de meados dos anos 2010. Mas existe uma classe de problema em que esse esqueleto, sozinho, esbarra numa parede.' },

  { type: 'h2', text: 'O problema: dados que têm ordem' },
  { type: 'p', text: 'Pensa numa frase: "o cachorro correu atrás do gato". Se você embaralhar as palavras — "gato o atrás correu cachorro do" — o **conjunto** de palavras é exatamente o mesmo, mas o significado sumiu. A ordem carrega informação essencial.' },
  { type: 'p', text: 'Um MLP, do jeito que você construiu, recebe um vetor de tamanho fixo e trata cada posição de entrada como independente das outras, sem nenhuma noção nativa de "isso veio antes daquilo". Ele processaria uma frase com as palavras embaralhadas exatamente como processaria a frase original — porque, pra ele, é só um vetor de números diferente, sem estrutura de sequência.' },

  { type: 'h2', text: 'O problema: peso não compartilhado' },
  { type: 'p', text: 'Numa camada densa, cada posição de entrada tem seu próprio peso dedicado — a primeira palavra de uma frase tem um conjunto de pesos, a segunda palavra tem outro conjunto totalmente diferente, mesmo que a rede devesse, em teoria, reconhecer o mesmo padrão não importa em que posição ele apareça (por exemplo, reconhecer a palavra "não" antes de um verbo, seja ela a 2ª ou a 15ª palavra da frase).' },
  { type: 'p', text: 'Isso também explode em número de parâmetros: uma imagem de tamanho razoável já tem milhares de pixels; tratada como um vetor liso de entrada pra um MLP, cada pixel ganharia seu próprio peso dedicado em cada neurônio da primeira camada — um desperdício gigantesco de parâmetros pra um padrão (tipo "borda", "textura") que deveria poder ser reconhecido em qualquer posição da imagem.' },

  { type: 'note', text: 'Resumo: MLP não captura ordem entre elementos de uma sequência, e não compartilha pesos entre posições diferentes — o que faz o número de parâmetros explodir para entradas grandes e estruturadas (texto, imagem, áudio).' },

  { type: 'h2', text: 'Respostas diferentes para o mesmo problema' },
  { type: 'p', text: 'A comunidade de IA desenvolveu arquiteturas especializadas justamente para atacar essas limitações — cada uma com uma ideia central diferente de como reintroduzir estrutura (ordem, compartilhamento de peso) na rede:' },
  { type: 'list', items: [
    '**CNN** (Rede Neural Convolucional) — compartilha os mesmos pesos "deslizando" sobre diferentes posições de uma imagem, reconhecendo o mesmo padrão em qualquer lugar dela.',
    '**RNN** (Rede Neural Recorrente) — processa uma sequência item por item, carregando uma "memória" do que já viu antes para o próximo passo.',
    '**Transformer** — em vez de processar item por item como a RNN, deixa cada elemento da sequência "olhar" diretamente para todos os outros de uma vez, de um jeito que preserva ordem sem perder velocidade de processamento em paralelo.',
  ]},
  { type: 'p', text: 'Você não precisa entender essas três palavras a fundo ainda — isso é só o mapa do que vem a seguir. A próxima trilha do caderno mergulha na terceira opção, o Transformer, construindo passo a passo desde a representação de palavras como números até uma arquitetura real usada nos maiores modelos de linguagem existentes hoje — terminando numa técnica chamada **Mixture of Experts**, que leva a ideia de "camada densa" que você acabou de dominar e a torna ainda mais poderosa.' },

  { type: 'divider' },
  { type: 'note', text: 'Você chegou ao fim dos fundamentos clássicos de redes neurais: tensores, neurônio, ativação, MLP, loss, backpropagation, treino completo. Tudo que vem a seguir é construído em cima exatamente disso — nenhum conceito novo substitui o que você já aprendeu, só se soma a ele.' },
];
