export const blocks = [
  { type: 'h1', text: 'Mixture of Experts' },

  { type: 'p', text: 'Imagine um hospital com um único médico generalista atendendo todo mundo — desde uma fratura no pé até um problema cardíaco raro. Ele até se vira, mas nenhum generalista é tão bom quanto um especialista naquele problema específico. Agora imagine o mesmo hospital com uma equipe de especialistas — cardiologista, ortopedista, dermatologista — e uma recepção competente que, ao ouvir os sintomas do paciente, decide na hora para qual especialista encaminhá-lo. O paciente não passa por todos os médicos, só pelo (ou pelos) mais relevante para o caso dele. O resultado: atendimento mais especializado, sem precisar que cada médico saiba fazer de tudo.' },
  { type: 'p', text: 'É exatamente essa ideia, aplicada à feed-forward network (FFN) que você já viu dentro de cada bloco Transformer, que dá origem ao **Mixture of Experts (MoE)**.' },

  { type: 'h2', text: 'Trocando uma FFN por várias, mais um roteador' },
  { type: 'p', text: 'No bloco Transformer padrão, cada palavra passa pela **mesma** FFN — o mesmo MLP, com os mesmos pesos, processando toda e qualquer palavra igual. O MoE substitui essa única FFN por **várias** FFNs em paralelo — os **experts** — cada uma sendo literalmente um MLP igual ao que você já construiu e treinou na trilha de Redes Neurais, só que cada uma com seus próprios pesos, livre para se especializar durante o treino.' },
  { type: 'p', text: 'Junto dos experts, existe um **roteador** (também chamado de **gating network**): uma rede pequena — muitas vezes uma única camada densa seguida de softmax, ambos já vistos — que olha para a representação de cada palavra (token) e decide, para aquele token especificamente, quais experts devem processá-lo.' },

  { type: 'h2', text: 'Como o roteador decide' },
  { type: 'p', text: 'O roteador recebe a representação do token e produz, via uma camada densa seguida de softmax (exatamente como você já viu gerando uma distribuição de probabilidade sobre categorias), uma distribuição de probabilidade sobre os experts disponíveis — um número entre 0 e 1 para cada expert, somando 1 no total.' },
  { type: 'p', text: 'Em vez de usar todos os experts com esses pesos (o que seria caro e anularia a vantagem), o roteador escolhe só os **top-k** — tipicamente os 1 ou 2 experts com a maior probabilidade — e envia o token só para eles. Essa escolha se chama **top-k routing**. Os pesos do softmax desses experts escolhidos ainda são usados para combinar as saídas deles, ponderando a contribuição de cada um.' },
  { type: 'formal', eq: 'g = softmax(x · W_roteador)\ntop-k(g) → escolhe os k experts de maior peso\nsaída = Σ (gᵢ · expertᵢ(x))  para i nos k experts escolhidos', legend: [
    '`x` — a representação do token que chegou no roteador',
    '`W_roteador` — a matriz de pesos do roteador, aprendida durante o treino, igual a qualquer outra camada densa',
    '`g` — a distribuição de probabilidade sobre todos os experts disponíveis',
    '`top-k(g)` — mantém só os k maiores pesos, descarta o resto (os experts não escolhidos nem são executados para este token)',
    '`expertᵢ(x)` — a saída do expert i (um MLP comum) processando o token',
    '`Σ gᵢ · expertᵢ(x)` — a soma ponderada das saídas dos experts escolhidos, pesada pela probabilidade que o roteador deu a cada um',
  ]},

  { type: 'h2', text: 'Por que isso é mais eficiente' },
  { type: 'p', text: 'Uma FFN comum, processando todo token, gasta o mesmo cálculo em todas as palavras. Um MoE com, digamos, 8 experts mas ativando só 2 por token, tem a **capacidade** de um modelo com 8 FFNs — muito mais parâmetros totais, permitindo mais especialização — mas o **custo computacional** de processar cada token é próximo ao de usar só 2 FFNs, porque os outros 6 experts simplesmente não são executados para aquele token. Essa característica — ter muitos parâmetros disponíveis, mas ativar só uma fração pequena deles a cada passagem — é chamada de **sparse activation** (ativação esparsa), em oposição a uma rede densa comum, onde todo peso participa de todo cálculo.' },
  { type: 'p', text: 'Diferentes tokens de uma mesma frase podem ser roteados para experts diferentes — um token pode acionar o expert 3 e o expert 7, enquanto o token seguinte aciona o expert 1 e o expert 3. Ao longo do treino, cada expert tende a se especializar naturalmente em algum tipo de padrão ou tópico, do mesmo jeito que cabeças diferentes de atenção se especializam em relações diferentes, sem que ninguém precise programar manualmente qual expert cuida de quê.' },

  { type: 'note', text: 'Resumo: Mixture of Experts substitui a única FFN de um bloco Transformer por várias FFNs (experts) em paralelo, mais um roteador (gating network, uma camada densa + softmax) que escolhe, por token, os top-k experts mais relevantes para processá-lo. Isso separa capacidade total do modelo (muitos parâmetros, muitos experts) do custo de processar cada token (só os k experts escolhidos rodam) — a ideia de sparse activation. Arquiteturas reais e amplamente usadas hoje em modelos de linguagem de grande escala aplicam exatamente este princípio.' },

  { type: 'divider' },
  { type: 'note', text: 'Você chegou ao fim do caminho teórico deste caderno: de tensores e um neurônio sozinho até aqui, cada aula construiu diretamente sobre a anterior, sem pular fundamento nenhum. A próxima e última aula implementa este exato mecanismo em código.' },
];
