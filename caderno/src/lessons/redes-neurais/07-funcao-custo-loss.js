export const blocks = [
  { type: 'h1', text: 'Função de Custo (Loss)' },

  { type: 'p', text: 'Imagina um professor corrigindo uma prova de matemática. Ele não escreve só "errado" — ele calcula o quão longe a resposta do aluno ficou da resposta certa, e é esse número, o tamanho do erro, que orienta o aluno sobre quanto e em que direção precisa ajustar o raciocínio da próxima vez.' },
  { type: 'p', text: 'Uma rede neural precisa exatamente desse número. Depois que o MLP calcula uma previsão, alguém precisa medir "o quão errada" essa previsão está, comparada com a resposta certa do dataset. Essa medida — um único número que resume o tamanho do erro — é a **função de custo**, também chamada de **loss**.' },

  { type: 'note', text: 'Resumo da fase leiga: loss é o número que diz o tamanho do erro entre o que o modelo previu e o que era certo. Quanto menor, melhor — zero significaria acerto perfeito.' },

  { type: 'h2', text: 'MSE — erro quadrático médio, para regressão' },
  { type: 'p', text: 'Quando a saída é um número contínuo (prever um preço, uma temperatura), a escolha padrão é o **Erro Quadrático Médio (MSE)**: para cada amostra, subtrai o valor previsto do valor real, eleva ao quadrado, e tira a média sobre todas as amostras (usando a notação de somatório já vista).' },
  { type: 'p', text: 'Elevar ao quadrado tem dois efeitos importantes: elimina o sinal (um erro de −5 e um erro de +5 pesam igual, os dois viram 25) e pune erros grandes desproporcionalmente mais que erros pequenos — um erro de 10 pesa 100, um erro de 2 pesa só 4.' },
  { type: 'formal', eq: 'MSE = (1/n) · Σᵢ (ŷᵢ − yᵢ)²', legend: [
    '`n` — número de amostras',
    '`ŷᵢ` — "y hat", o que o modelo previu para a amostra i',
    '`yᵢ` — o valor real da amostra i, tirado do dataset',
    '`(ŷᵢ − yᵢ)²` — erro daquela amostra, ao quadrado: sempre positivo, pune erros grandes',
    '`Σᵢ` — soma sobre todas as amostras (notação já vista em Somatórios)',
    '`(1/n)·` — divide pelo total, transformando a soma numa média',
  ]},

  { type: 'h2', text: 'Entropia cruzada, para classificação' },
  { type: 'p', text: 'Quando a saída é uma categoria (gato ou cachorro, qual dígito é este), o MSE não é a escolha certa — a rede não está prevendo um número contínuo, está prevendo uma **distribuição de probabilidade** sobre as categorias, usando softmax na última camada, como você já viu na trilha de Probabilidade & Estatística.' },
  { type: 'p', text: 'Ali você já construiu a entropia cruzada, que mede exatamente "o quanto a distribuição prevista pelo modelo está longe da distribuição real". Aplicada à saída de uma rede de classificação, essa mesma fórmula ganha o nome de **cross-entropy loss** — é literalmente a mesma conta, só reaplicada aqui como a função de custo de uma rede neural.' },
  { type: 'formal', eq: 'CE = − Σᵢ yᵢ · log(ŷᵢ)', legend: [
    '`yᵢ` — 1 se a categoria i é a correta, 0 caso contrário (a distribuição real, "one-hot")',
    '`ŷᵢ` — a probabilidade que o modelo atribuiu à categoria i (saída do softmax)',
    '`log(ŷᵢ)` — já visto: log de uma probabilidade pequena é bem negativo',
    '`− Σᵢ yᵢ · log(ŷᵢ)` — como só o `yᵢ` da categoria certa é 1 (o resto é 0), essa soma inteira colapsa em "menos o log da probabilidade que o modelo deu pra categoria certa"',
  ]},

  { type: 'h2', text: 'Qual usar?' },
  { type: 'list', items: [
    '**Regressão** (saída é um número contínuo, sem categorias) → **MSE**',
    '**Classificação** (saída é uma entre N categorias, via softmax) → **entropia cruzada / cross-entropy**',
  ]},
  { type: 'p', text: 'A escolha da loss não é só um detalhe técnico — ela muda o comportamento do treino inteiro, porque é exatamente essa função que o gradiente (já visto em Cálculo) vai medir e tentar minimizar. Uma loss errada para o tipo de problema faz o modelo aprender a otimizar a coisa errada.' },

  { type: 'divider' },
  { type: 'note', text: 'Resumo: loss = número que mede o erro. MSE para prever números (regressão), entropia cruzada para prever categorias (classificação). É essa função que o backpropagation, na próxima aula, vai diferenciar para saber como ajustar cada peso.' },
];
