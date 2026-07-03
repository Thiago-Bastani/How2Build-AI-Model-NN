export const blocks = [
  { type: 'h1', text: 'Gradiente em Forma Matricial' },
  { type: 'p', text: 'Imagina uma fábrica com só duas máquinas: fácil de ajustar uma de cada vez, olhando o efeito de cada uma isoladamente. Agora imagina uma fábrica com dez mil máquinas, todas interligadas, todas afetando o produto final ao mesmo tempo. Ajustar "uma de cada vez, olhando isoladamente" ainda funciona na teoria — mas na prática é inviável: você ia gastar uma vida inteira só organizando dez mil contas separadas.' },
  { type: 'p', text: 'É exatamente essa situação que aparece numa rede neural: em vez de duas ou três variáveis, existem milhares (às vezes bilhões) de pesos. Calcular o gradiente — a aula anterior te mostrou que é a lista das derivadas parciais, uma por variável — variável por variável seria impraticável. A saída é expressar e calcular tudo de uma vez usando matrizes, o mesmo objeto que você já viu na aula de Produto de Matrizes.' },

  { type: 'h2', text: 'De "uma conta por variável" para "uma conta só"' },
  { type: 'p', text: 'Lembra da aula de Derivadas Parciais e Gradiente: pra `f(x, y) = x² + 3y`, calculamos a derivada parcial em x (tratando y como constante) e a derivada parcial em y (tratando x como constante), separadamente, e juntamos num vetor `[2x, 3]`.' },
  { type: 'p', text: 'Isso funciona bem com 2 variáveis. Mas pensa numa expressão que envolve produto de matrizes — por exemplo, uma camada de rede neural calcula algo como `saída = pesos · entrada`, onde `pesos` pode ser uma matriz com milhares de números. Cada número da matriz `pesos` é, tecnicamente, uma variável independente. Escrever "derivada parcial em relação ao peso número 4.582" pra cada um deles, um por um, é tecnicamente possível mas praticamente inviável.' },

  { type: 'h2', text: 'A saída: derivar em bloco, usando a estrutura da matriz' },
  { type: 'p', text: 'A matemática por trás continua sendo a mesma — cada entrada do gradiente ainda é "quanto a saída muda se eu mexer só naquele peso, mantendo os outros parados", exatamente a definição de derivada parcial. A diferença é que, em vez de calcular e escrever cada uma dessas milhares de contas isoladamente, existe uma regra que produz a matriz **inteira** de derivadas parciais de uma vez, usando a mesma estrutura de linhas e colunas do produto de matrizes.' },
  { type: 'p', text: 'Pensa assim: se `saída = W · x` (W é a matriz de pesos, x é o vetor de entrada), o gradiente de `saída` em relação a W tem exatamente o mesmo formato de W — uma matriz do mesmo tamanho, onde cada posição guarda a derivada parcial correspondente àquele peso específico. Em vez de calcular posição por posição, essa matriz de gradientes inteira sai como resultado de uma única operação envolvendo x e o gradiente que chegou da camada seguinte — a mesma mecânica de "linha vezes coluna, soma tudo" que você já viu no produto de matrizes.' },
  { type: 'viz', id: 'gradiente' },

  { type: 'note', text: 'Resumo: com muitas variáveis (como os pesos de uma rede neural), calcular o gradiente número por número é impraticável. A solução é organizar as variáveis em matrizes e calcular o gradiente inteiro de uma vez, usando a mesma estrutura do produto de matrizes — cada entrada do resultado ainda é uma derivada parcial de verdade, só que todas produzidas juntas, em bloco.' },

  { type: 'h2', text: 'A notação formal' },
  { type: 'formal', eq: 'saída = W · x\n\n∇W(saída)  tem o mesmo formato de W\n\ncada entrada de ∇W  é  ∂(saída)/∂Wᵢⱼ', legend: [
    '`W` — matriz de pesos, pode ter milhares de entradas',
    '`x` — vetor de entrada',
    '`∇W(saída)` — gradiente da saída em relação a cada entrada de W — "nabla", já visto na aula de Derivadas Parciais e Gradiente',
    '`Wᵢⱼ` — o peso individual na linha i, coluna j de W',
    '`∂(saída)/∂Wᵢⱼ` — a derivada parcial de verdade, a mesma definição de sempre — só que calculada em bloco pra todos os `i,j` simultaneamente, em vez de um de cada vez',
  ]},
  { type: 'p', text: 'Essa forma matricial do gradiente é exatamente o que torna viável, na prática, treinar redes neurais com milhões de pesos — e é a peça que falta pra montar o algoritmo completo de Gradient Descent, tema da próxima aula.' },
];
