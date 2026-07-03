export const blocks = [
  { type: 'h1', text: 'Matrizes: Tabelas que Transformam' },
  { type: 'p', text: 'Imagine uma planilha de notas: cada linha é um aluno, cada coluna é uma prova. Aluno 1 tirou 8 na prova 1 e 6 na prova 2. Aluno 2 tirou 7 e 9. Essa tabela de números organizados em linhas e colunas é uma **matriz**.' },
  { type: 'p', text: 'Uma matriz nada mais é do que vários vetores empilhados — cada linha da tabela é, ela própria, um vetor. A matriz de notas acima tem 2 linhas (2 alunos) e 2 colunas (2 provas); dizemos que ela é "2 por 2", ou tem **shape** (formato) `2×2`.' },

  { type: 'h2', text: 'A ideia central: matriz como transformação' },
  { type: 'p', text: 'Guardar dados numa tabela já é útil por si só. Mas a ideia mais poderosa por trás de uma matriz é outra: uma matriz pode representar uma **transformação** — uma regra que pega um vetor de entrada e devolve um vetor de saída diferente, na mesma lógica de uma função (entrada → regra → saída) que você já viu na Matemática de Base.' },
  { type: 'p', text: 'Pense num exemplo bem concreto: você tem o ponto `[2, 3]` num mapa, e quer aplicar a regra "espelhe a coordenada x" — inverte o sinal do primeiro número, mantém o segundo igual. O resultado é `[-2, 3]`. Essa regra de espelhamento pode ser guardada como uma matriz, e "aplicar a matriz num vetor" é a forma sistemática de executar a regra.' },
  { type: 'p', text: 'Outro exemplo: a regra "dobre a coordenada x, mantenha y igual" transforma `[2, 3]` em `[4, 3]`. Ou "dobre as duas coordenadas": `[2,3]` vira `[4,6]` — a seta fica duas vezes mais comprida, sem mudar de direção (a mesma ideia de multiplicar por escalar, vista na aula de Operações com Vetores, só que agora cada coordenada podendo ter sua própria regra).' },
  { type: 'note', text: 'A conta exata de "como aplicar uma matriz a um vetor" — célula por célula — é o assunto da próxima aula, Produto de Matrizes. Aqui, o que importa é a ideia: matriz = regra de transformação guardada numa tabela de números.' },

  { type: 'h2', text: 'Linhas e colunas' },
  { type: 'p', text: 'Numa matriz `m × n`, `m` é o número de linhas e `n` é o número de colunas. A matriz de notas era `2×2`. Uma matriz com 3 alunos e 5 provas seria `3×5` — 3 linhas, 5 colunas.' },
  { type: 'p', text: 'É comum pensar numa matriz de duas formas, dependendo do contexto: como uma tabela de dados (cada linha é um "registro", tipo um aluno ou uma casa), ou como uma transformação (a tabela inteira representa uma única regra a ser aplicada a vetores). As duas visões coexistem — o mesmo objeto matemático serve pros dois papéis.' },

  { type: 'h2', text: 'A notação formal' },
  { type: 'formal', eq: 'A = [[a₁₁, a₁₂, ..., a₁ₙ],\n     [a₂₁, a₂₂, ..., a₂ₙ],\n     ...\n     [aₘ₁, aₘ₂, ..., aₘₙ]]', legend: [
    '`A` — o nome da matriz, tradicionalmente letra maiúscula',
    '`aᵢⱼ` — o elemento na linha i, coluna j',
    '`m` — número de linhas',
    '`n` — número de colunas',
    'shape de A = `m × n` (sempre linhas primeiro, colunas depois)',
  ]},
  { type: 'p', text: 'Uma transformação simples, como "espelhar a coordenada x", também tem sua matriz correspondente — mas montar essa matriz e efetivamente aplicá-la a um vetor exige a operação de produto de matrizes, que é o assunto formal da próxima aula.' },

  { type: 'h2', text: 'Por que isso importa para IA' },
  { type: 'p', text: 'Essa é talvez a ideia mais importante de toda a trilha de Álgebra Linear para redes neurais: os "pesos" de uma camada de rede neural — os números que ela aprende durante o treino — são organizados, literalmente, numa matriz. Aplicar essa matriz a um vetor de entrada é exatamente como transformar `[2,3]` em `[-2,3]` no exemplo do espelhamento, só que numa escala muito maior, com centenas ou milhares de dimensões.' },
  { type: 'p', text: 'Essa estrutura — uma matriz de pesos transformando um vetor de entrada em um vetor de saída — é o que forma uma **camada densa** de rede neural, conceito que você vai ver formalmente bem mais adiante no currículo.' },
  { type: 'note', text: 'Resumo: matriz = tabela de números organizada em linhas e colunas (shape m×n). Além de guardar dados, uma matriz pode representar uma regra de transformação que pega um vetor de entrada e devolve outro vetor de saída — essa é a ideia por trás dos pesos de uma rede neural.' },
];
