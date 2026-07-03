export const blocks = [
  { type: 'h1', text: 'Operações com Vetores' },
  { type: 'p', text: 'Você está dando instruções de caminhada pra alguém: "ande 3 quarteirões pro leste, depois 2 pro norte". Depois: "agora ande mais 1 quarteirão pro leste e 4 pro norte". No total, a pessoa andou `3+1 = 4` quarteirões pro leste e `2+4 = 6` pro norte. Você somou os deslocamentos, posição por posição.' },
  { type: 'p', text: 'Isso é a ideia central por trás de toda operação com vetores: você mexe posição por posição, sempre respeitando qual número está em qual lugar da lista.' },

  { type: 'h2', text: 'Soma de vetores' },
  { type: 'p', text: 'Somar dois vetores é somar cada posição com a posição correspondente do outro vetor. `[3, 2] + [1, 4] = [4, 6]`. Só funciona se os dois vetores tiverem o mesmo tamanho — não faz sentido somar "3 quarteirões leste" com "um vetor de 5 posições descrevendo outra coisa".' },
  { type: 'p', text: 'Geometricamente, se você pensar em cada vetor como uma seta (visto na aula anterior), somar duas setas é **encadeá-las**: desenha a primeira seta partindo da origem, e a segunda seta parte de onde a primeira terminou. A seta resultante vai da origem até a ponta final — é a soma.' },
  { type: 'note', text: 'Encadear setas: seta 1 vai de (0,0) até (3,2). Seta 2, partindo dali, anda mais (1,4) e termina em (4,6). A seta soma vai direto de (0,0) até (4,6) — o mesmo destino, em linha reta.' },

  { type: 'h2', text: 'Multiplicação por escalar' },
  { type: 'p', text: 'Um **escalar** é só um número comum, sozinho — em contraste com um vetor, que é uma lista de números. Multiplicar um vetor por um escalar multiplica cada posição por esse número: `2 × [3, 2] = [6, 4]`.' },
  { type: 'p', text: 'Geometricamente, isso estica ou encolhe a seta, mantendo a mesma direção. Multiplicar por 2 dobra o comprimento. Multiplicar por 0.5 reduz à metade. Multiplicar por um número negativo, como -1, inverte a seta — ela passa a apontar no sentido contrário.' },

  { type: 'h2', text: 'Produto escalar (dot product)' },
  { type: 'p', text: 'Essa é a operação mais importante das três. O **produto escalar** entre dois vetores de mesmo tamanho é: multiplique cada posição de um pela posição correspondente do outro, e depois some tudo. O resultado não é um vetor — é um número só (por isso "escalar").' },
  { type: 'p', text: 'Exemplo: `[1, 2, 3] · [4, 5, 6] = (1×4) + (2×5) + (3×6) = 4 + 10 + 18 = 32`.' },
  { type: 'formula', text: '[1,2,3] · [4,5,6] = 4 + 10 + 18 = 32' },

  { type: 'h3', text: 'O que o produto escalar significa' },
  { type: 'p', text: 'O produto escalar mede **o quanto dois vetores concordam em direção**. Se os dois apontam praticamente pro mesmo lugar, o produto escalar dá um número grande e positivo. Se apontam em direções opostas, dá um número grande e negativo. Se são "perpendiculares" — não concordam nem discordam, cada um puxando pra um lado independente — o produto escalar dá exatamente zero.' },
  { type: 'p', text: 'Pense em duas pessoas empurrando uma caixa. Se as duas empurram na mesma direção, a força combinada é grande — concordam. Se uma empurra pra um lado e a outra pro lado oposto, a força combinada tende a se cancelar — discordam. O produto escalar captura essa ideia de concordância, mas entre vetores de qualquer tamanho, não só forças físicas.' },
  { type: 'warn', text: 'Produto escalar exige que os dois vetores tenham o mesmo tamanho (mesmo número de posições) — do contrário não há como parear posição com posição.' },

  { type: 'h2', text: 'A notação formal' },
  { type: 'formal', eq: 'a · b = Σᵢ aᵢbᵢ = a₁b₁ + a₂b₂ + ... + aₙbₙ', legend: [
    '`a`, `b` — dois vetores de mesma dimensão n',
    '`aᵢ`, `bᵢ` — o componente na posição i de cada vetor',
    '`Σᵢ` — notação de somatório (vista na Matemática de Base): soma todos os termos `aᵢbᵢ`, para i indo de 1 até n',
    '`a · b` — o resultado é um número único, não um vetor',
  ]},
  { type: 'p', text: 'Soma e multiplicação por escalar têm suas próprias notações formais, mais diretas:' },
  { type: 'formal', eq: '(a + b)ᵢ = aᵢ + bᵢ\n(k·a)ᵢ = k·aᵢ', legend: [
    '`(a + b)ᵢ` — a posição i do vetor soma',
    '`(k·a)ᵢ` — a posição i do vetor escalado por k',
    '`k` — um escalar (número comum)',
  ]},

  { type: 'h2', text: 'Por que isso importa para IA' },
  { type: 'p', text: 'O produto escalar é, literalmente, a conta que a unidade mais básica de uma rede neural artificial faz: ela recebe um vetor de entrada, tem um vetor de "importância" próprio (chamado de pesos), e calcula o produto escalar entre os dois — entrada · pesos. Esse cálculo é o coração de um conceito chamado **perceptron**, que você vai ver em detalhe mais adiante.' },
  { type: 'p', text: 'Essa mesma conta — medir o quanto dois vetores concordam — reaparece muito mais à frente no currículo numa técnica chamada **atenção**, que é a base dos modelos de linguagem modernos. Por enquanto, guarde só isso: produto escalar = multiplica posição a posição, soma tudo, mede concordância de direção.' },
  { type: 'note', text: 'Resumo: soma de vetores encadeia setas; escalar estica/encolhe/inverte uma seta; produto escalar multiplica posição a posição e soma, medindo o quanto dois vetores apontam pro mesmo lugar. Essa última é a operação que todo neurônio artificial usa.' },
];
