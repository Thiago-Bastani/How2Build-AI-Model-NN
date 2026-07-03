export const blocks = [
  { type: 'h1', text: 'Produto de Matrizes' },
  { type: 'p', text: 'Você tem 3 turmas de alunos e 2 provas. Cada turma tem uma nota em cada prova. Isso é uma tabela 3×2 — 3 linhas (turmas), 2 colunas (provas).' },
  { type: 'p', text: 'Agora você quer calcular a nota final de cada turma, onde a prova 1 vale 60% e a prova 2 vale 40%. Você multiplica cada nota pelo peso correspondente e soma. Isso é o **produto escalar**, que você já viu na aula de Operações com Vetores — e é exatamente o que o produto de matrizes faz, só que pra todas as combinações de uma vez.' },

  { type: 'h2', text: 'Como calcular o produto de matrizes' },
  { type: 'p', text: 'Cada célula do resultado vem de: **pega a linha da esquerda, pega a coluna da direita, faz o produto escalar**.' },
  { type: 'p', text: 'Célula [linha 0, coluna 0] do resultado = produto escalar da linha 0 de A com a coluna 0 de B. Célula [linha 0, coluna 1] = linha 0 de A com coluna 1 de B. E assim por diante.' },
  { type: 'p', text: 'Pra funcionar, o número de colunas de A tem que ser igual ao número de linhas de B — é o número que "se cancela" no meio.' },
  { type: 'viz', id: 'produto-matriz' },

  { type: 'h3', text: 'Exemplo manual' },
  { type: 'p', text: 'A = [[1, 2], [3, 4]]  e  B = [[5, 6], [7, 8]].' },
  { type: 'p', text: 'C[0][0] = linha 0 de A · coluna 0 de B = `[1,2]·[5,7] = 5+14 = 19`' },
  { type: 'p', text: 'C[0][1] = linha 0 de A · coluna 1 de B = `[1,2]·[6,8] = 6+16 = 22`' },
  { type: 'p', text: 'C[1][0] = `[3,4]·[5,7] = 15+28 = 43`    C[1][1] = `[3,4]·[6,8] = 18+32 = 50`' },
  { type: 'formula', text: 'Resultado: [[19, 22], [43, 50]]' },

  { type: 'warn', text: 'A × B não é igual a B × A na maioria dos casos. Produto de matrizes não é comutativo — a ordem importa.' },
  { type: 'note', text: 'Resumo: produto escalar = multiplica posição a posição e soma. Produto de matrizes = faz isso pra cada par de (linha de A, coluna de B). O número do meio tem que bater: [m×k]·[k×n] = [m×n].' },

  { type: 'h2', text: 'A notação formal' },
  { type: 'formal', eq: 'C = A · B\nCᵢⱼ = Σₖ Aᵢₖ · Bₖⱼ\n\n[m × k] · [k × n] = [m × n]', legend: [
    '`Cᵢⱼ` — célula na linha i, coluna j do resultado',
    '`Aᵢₖ` — percorre a linha i de A',
    '`Bₖⱼ` — percorre a coluna j de B',
    '`Σₖ` — soma sobre k (notação de somatório, vista na Matemática de Base) — é o produto escalar completo',
    'O k (o meio) tem que ser igual nos dois shapes',
  ]},
];
