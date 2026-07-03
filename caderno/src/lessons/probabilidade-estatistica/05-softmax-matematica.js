export const blocks = [
  { type: 'h1', text: 'Softmax' },
  { type: 'p', text: 'Imagine um juiz de um concurso de talentos que dá notas livres pra cada participante — pode dar 8, pode dar 15, pode até dar -3 se achar o número muito ruim. Essas notas soltas dizem "quem o juiz achou melhor", mas não dizem, em porcentagem, "qual a chance de cada participante ganhar". Pra transformar notas soltas numa porcentagem de chance de vitória — onde tudo soma 100%, e ninguém tem chance negativa — você precisa de um processo de conversão.' },
  { type: 'p', text: 'Esse é exatamente o problema que o **softmax** resolve. Uma rede neural, no fim de suas contas, produz uma lista de números crus — chamados de "logits" — que podem ser positivos, negativos, grandes ou pequenos, sem estrutura nenhuma imposta. O softmax pega essa lista bagunçada e a transforma numa distribuição de probabilidade de verdade: todos os números viram positivos, e a soma de todos dá exatamente 1 — a mesma regra de ouro que você já viu na aula de Variável Aleatória e Distribuições.' },
  { type: 'note', text: 'Resumo da fase leiga: softmax converte uma lista qualquer de números (positivos, negativos, sem ordem de grandeza combinada) numa distribuição de probabilidade válida — todos positivos, somando exatamente 1 — preservando a ordem de quem era maior e quem era menor.' },

  { type: 'h2', text: 'O problema, passo a passo' },
  { type: 'p', text: 'Digamos que uma rede terminou suas contas e produziu estes 3 números crus, um para cada categoria possível — "gato", "cachorro", "pássaro":' },
  { type: 'formula', text: 'logits = [2.0, 1.0, -1.0]' },
  { type: 'p', text: 'Dois problemas impedem essa lista de ser lida como probabilidade direto: primeiro, `-1.0` é negativo, e probabilidade nunca pode ser negativa. Segundo, mesmo ignorando o sinal, `2.0 + 1.0 + (-1.0) = 2.0` — a soma não dá 1, então nenhum desses números representa "uma fatia do total".' },

  { type: 'h3', text: 'Passo 1 — resolver os negativos com exponencial' },
  { type: 'p', text: 'Você já viu, na aula de Potências, Expoentes e Logaritmos, que a função exponencial `eˣ` tem uma propriedade valiosíssima aqui: não importa se `x` é positivo, negativo, grande ou pequeno, `eˣ` **sempre** devolve um resultado positivo. `e⁻¹` não é negativo — é um número pequeno, porém positivo (≈0.368).' },
  { type: 'p', text: 'Aplicando a exponencial em cada logit:' },
  { type: 'list', items: [
    '`e^2.0 ≈ 7.389`',
    '`e^1.0 ≈ 2.718`',
    '`e^(-1.0) ≈ 0.368`',
  ]},
  { type: 'p', text: 'Todos os três números agora são positivos. Além disso, a exponencial preserva a ordem: quem era o maior logit (`2.0`) continua sendo o maior valor depois de exponenciado, e além disso amplia a diferença relativa entre eles — o maior fica proporcionalmente ainda mais destacado dos outros.' },

  { type: 'h3', text: 'Passo 2 — normalizar dividindo pela soma' },
  { type: 'p', text: 'Falta só o segundo problema: fazer a soma total dar exatamente 1. A solução é a mesma usada em Frequência Relativa: some todos os valores, e divida cada um pela soma total. Isso transforma cada número numa "fatia" exata do total.' },
  { type: 'p', text: 'Soma dos três valores exponenciados: `7.389 + 2.718 + 0.368 = 10.475`.' },
  { type: 'list', items: [
    'gato: `7.389 / 10.475 ≈ 0.705`',
    'cachorro: `2.718 / 10.475 ≈ 0.260`',
    'pássaro: `0.368 / 10.475 ≈ 0.035`',
  ]},
  { type: 'p', text: 'Conferindo a soma final: `0.705 + 0.260 + 0.035 = 1.000`. Todos os valores são positivos, e a soma dá exatamente 1 — uma distribuição de probabilidade válida, de ponta a ponta. A rede "acha" que a chance de ser gato é 70.5%, cachorro 26%, pássaro 3.5% — e a ordem original dos logits (gato > cachorro > pássaro) foi preservada o tempo todo.' },

  { type: 'h2', text: 'A notação formal' },
  { type: 'formal', eq: 'softmax(zᵢ) = e^zᵢ / Σⱼ₌₁ⁿ e^zⱼ', legend: [
    '`z` — o vetor de logits, os números crus que a rede produziu (no exemplo, `z = [2.0, 1.0, -1.0]`)',
    '`zᵢ` — um logit individual, o que está sendo convertido nesta fatia específica da fórmula',
    '`e^zᵢ` — a exponencial daquele logit — sempre positiva, resolve o problema dos negativos (Passo 1)',
    '`Σⱼ₌₁ⁿ e^zⱼ` — soma da exponencial de **todos** os `n` logits, incluindo o próprio `zᵢ` — o denominador, calculado uma vez e reaproveitado para cada fatia',
    'a divisão inteira — transforma cada exponencial numa fatia do total, garantindo soma final igual a 1 (Passo 2)',
    'aplicando a fórmula pra cada `i` de 1 até `n`, você obtém a distribuição de probabilidade inteira, uma saída para cada categoria possível',
  ]},
  { type: 'p', text: 'Aplicando ao exemplo: `softmax(2.0) = e^2.0 / (e^2.0 + e^1.0 + e^-1.0) = 7.389/10.475 ≈ 0.705` — exatamente o valor calculado à mão acima. A fórmula formal é só o Passo 1 e o Passo 2 escritos numa única expressão compacta, usando a notação de somatório já conhecida.' },
  { type: 'note', text: 'Resumo da fase Expert: softmax exponencia cada número (resolve negativos, preserva ordem, amplia diferenças) e depois divide cada exponencial pela soma de todas elas (garante soma total igual a 1). O resultado é sempre uma distribuição de probabilidade válida sobre as categorias possíveis.' },

  { type: 'divider' },
  { type: 'h2', text: 'Por que isso importa para IA — o payoff da trilha inteira' },
  { type: 'p', text: 'Softmax é a camada final de praticamente todo classificador em inteligência artificial — é o que transforma os números crus que uma rede calculou internamente na resposta final legível como "82% de chance de ser gato" que você viu logo na primeira aula desta trilha. Agora você sabe exatamente como esse número nasce, do primeiro logit até a fatia final de probabilidade.' },
  { type: 'p', text: 'Mas o alcance do softmax vai muito além de classificação simples. Ele é o coração matemático de um mecanismo chamado **atenção**, usado dentro dos Transformers — a arquitetura por trás dos modelos de linguagem modernos — pra decidir "o quanto cada palavra de uma frase deve prestar atenção em cada outra palavra". Por trás dessa decisão está exatamente esta fórmula: pega uma lista de números crus (relevância entre palavras), exponencia, divide pela soma. A mesma exata fórmula que você acabou de calcular à mão com gato, cachorro e pássaro. Guarde ela — vai reaparecer.' },
];
