export const blocks = [
  { type: 'h1', text: 'Transposição e Broadcasting' },
  { type: 'p', text: 'Imagine a planilha de notas de novo: linhas são alunos, colunas são provas. Agora imagine que você precisa entregar essa mesma informação pra outro sistema que espera o formato invertido — linhas são provas, colunas são alunos. Os números não mudam, só a forma como a tabela está "deitada". Virar linhas em colunas (e colunas em linhas) é chamado de **transposição**.' },
  { type: 'p', text: 'E um segundo problema, bem comum: você tem uma tabela de notas e quer somar um "bônus" — por exemplo, `+1` ponto pra prova 1 e `+0.5` pra prova 2 — em **todo aluno** de uma vez, sem escrever a soma linha por linha. Existe um mecanismo pra isso, chamado **broadcasting**, que você vai ver na segunda metade desta aula.' },

  { type: 'h2', text: 'Transposição' },
  { type: 'p', text: 'Pegue a matriz de notas: 2 alunos (linhas), 2 provas (colunas).' },
  { type: 'formula', text: 'A = [[8, 6],\n     [7, 9]]   (aluno 1: 8,6 — aluno 2: 7,9)' },
  { type: 'p', text: 'A transposta de A — escrita `Aᵀ` — é obtida virando cada linha em coluna: a primeira linha de A vira a primeira coluna de Aᵀ, e assim por diante.' },
  { type: 'formula', text: 'Aᵀ = [[8, 7],\n      [6, 9]]   (prova 1: 8,7 — prova 2: 6,9)' },
  { type: 'p', text: 'Repare: o elemento que estava na linha 1, coluna 2 de A (o `6`, nota do aluno 1 na prova 2) passa a estar na linha 2, coluna 1 de Aᵀ. Formalmente, o elemento `aᵢⱼ` de A vira o elemento `aⱼᵢ` de Aᵀ — os índices trocam de lugar.' },
  { type: 'p', text: 'Uma matriz `m × n`, depois de transposta, vira `n × m` — as dimensões trocam de posição. Uma matriz `3×5` transposta vira `5×3`.' },

  { type: 'h2', text: 'Quando os shapes não batem' },
  { type: 'p', text: 'Você já viu, na aula de Produto de Matrizes, que multiplicar `A × B` só funciona se o número de colunas de A for igual ao número de linhas de B: `[m×k] · [k×n]`. Se essa condição não bater, a multiplicação simplesmente não existe — não há como fazer o produto escalar entre uma linha de A e uma coluna de B se elas não tiverem o mesmo tamanho.' },
  { type: 'p', text: 'Isso é extremamente comum na prática: você tem uma matriz `3×4` e outra `3×5`, e tenta multiplicar direto — não bate (4 ≠ 3). A transposição costuma ser exatamente a ferramenta que resolve isso: transpor uma das duas matrizes muda seu shape e pode fazer os números baterem. Uma matriz `3×4`, transposta, vira `4×3` — agora `[3×4]` vezes a transposta de outra `3×4` (que virou `4×3`)? Depende dos números exatos, mas o princípio geral é: quando o shape não bate, transpor uma das matrizes costuma ser o primeiro passo pra resolver.' },
  { type: 'warn', text: 'Erro de shape é o erro mais comum no dia a dia de quem escreve código de IA: tentar multiplicar, somar ou combinar tensores cujas dimensões não são compatíveis. A causa quase sempre é uma dessas duas: esqueceu de transpor algo, ou esqueceu do broadcasting (próxima seção).' },

  { type: 'h2', text: 'Broadcasting' },
  { type: 'p', text: 'Voltando ao problema do bônus: você tem a matriz de notas `A` (2 alunos × 2 provas) e quer somar o vetor de bônus `[1, 0.5]` (2 provas) a **cada linha** de A — ou seja, aplicar o mesmo bônus a todos os alunos, sem repetir o vetor manualmente pra cada um.' },
  { type: 'p', text: 'Somar uma matriz `2×2` com um vetor de tamanho 2 não é, a rigor, uma soma de mesmo shape — a matriz tem duas linhas, o vetor só tem uma "linha" de 2 números. Mas existe uma regra: quando uma dimensão não bate mas é compatível (aqui, o vetor tem exatamente o mesmo número de colunas que a matriz), o vetor é **repetido automaticamente** para cada linha da matriz, como se tivesse sido copiado ali por baixo dos panos.' },
  { type: 'formula', text: '[[8, 6],       [1, 0.5]      [[9,   6.5],\n [7, 9]]   +           →     [8,   9.5]]\n(2×2)          (broadcast pra 2×2)' },
  { type: 'p', text: 'Esse "repetir automaticamente a dimensão menor pra caber na maior" é o **broadcasting**. Ele evita ter que escrever manualmente `[1, 0.5]` duas vezes — o sistema entende, pela compatibilidade de shapes, que deve replicar o vetor menor por cada linha da matriz maior.' },
  { type: 'p', text: 'A regra geral de compatibilidade: comparando os shapes de trás pra frente, cada dimensão precisa ser igual, ou uma das duas precisa ser 1 (ou não existir). Um vetor de 2 números "cabe" numa matriz `2×2` porque a última dimensão de ambos é 2 — a matriz simplesmente empresta esse vetor pra cada uma de suas linhas.' },
  { type: 'warn', text: 'Broadcasting não funciona pra qualquer par de shapes incompatíveis — só quando as dimensões batem ou uma delas é 1. Um vetor de 3 números não faz broadcasting com uma matriz de colunas 2: não há regra de repetição que resolva essa incompatibilidade, e o erro de shape aparece.' },

  { type: 'h2', text: 'A notação formal' },
  { type: 'formal', eq: '(Aᵀ)ᵢⱼ = Aⱼᵢ', legend: [
    '`Aᵀ` — a transposta de A',
    '`(Aᵀ)ᵢⱼ` — elemento na linha i, coluna j de Aᵀ',
    '`Aⱼᵢ` — é igual ao elemento na linha j, coluna i da matriz original A — os índices trocam',
    'shape: se A é `m×n`, então Aᵀ é `n×m`',
  ]},
  { type: 'formal', eq: '(A + v)ᵢⱼ = Aᵢⱼ + vⱼ', legend: [
    '`A` — matriz `m×n`',
    '`v` — vetor de tamanho n (mesmo número de colunas de A)',
    '`(A + v)ᵢⱼ` — elemento resultante na linha i, coluna j',
    '`vⱼ` — o componente j do vetor v, usado (repetido) em toda linha i — é o broadcasting acontecendo',
  ]},

  { type: 'h2', text: 'Por que isso importa para IA' },
  { type: 'p', text: 'Redes neurais e código de IA em geral trabalham o tempo todo com matrizes de shapes diferentes sendo multiplicadas, somadas e transpostas — é assim que dados fluem de uma camada pra outra. Transposição aparece toda vez que um resultado precisa ser reorganizado pra bater com o shape esperado pela próxima operação. Broadcasting aparece toda vez que um vetor de "ajuste" (como um bônus, ou um viés) precisa ser aplicado a todas as linhas de uma matriz de uma vez.' },
  { type: 'p', text: 'Quando você chegar nas aulas de código mais adiante e ver uma mensagem de erro citando shapes incompatíveis, será exatamente isso: uma tentativa de operação onde as dimensões não bateram, e nem transposição nem broadcasting resolveram a diferença. Entender essas duas ferramentas é o que permite depurar esse tipo de erro em vez de só tentar valores ao acaso.' },
  { type: 'note', text: 'Resumo: transposição vira linhas em colunas (shape m×n vira n×m), e costuma ser a solução quando um shape não bate numa multiplicação. Broadcasting repete automaticamente uma dimensão menor pra caber numa maior, quando os shapes são compatíveis. Juntos, explicam a maioria dos erros de shape em código de IA.' },
];
