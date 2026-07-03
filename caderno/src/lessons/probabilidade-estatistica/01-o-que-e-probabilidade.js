export const blocks = [
  { type: 'h1', text: 'O que é Probabilidade' },
  { type: 'p', text: 'Imagine que você vai jogar uma moeda pro alto. Antes dela cair, ninguém sabe o resultado — mas todo mundo sente que "cara" e "coroa" têm mais ou menos a mesma chance. Agora imagine um dado de 6 lados: sair o número 6 parece bem menos garantido do que sair "um número par", porque existem mais jeitos de dar certo no segundo caso.' },
  { type: 'p', text: 'Esse "sentimento de chance" é exatamente o que a probabilidade tenta medir — só que em vez de deixar como um sentimento vago, ela vira um número preciso. Um número que você pode calcular, comparar e usar em contas.' },
  { type: 'p', text: 'A ideia central: se você repetir uma situação incerta muitas e muitas vezes — jogar a mesma moeda mil vezes, por exemplo — e contar quantas dessas vezes um resultado específico aconteceu, dividido pelo total de vezes que você tentou, esse número conta a história de quão "comum" aquele resultado é.' },
  { type: 'p', text: 'Se você jogou uma moeda 1000 vezes e deu "cara" 503 vezes, a fração `503/1000 = 0.503` é uma boa estimativa de quão provável é dar cara nessa moeda. Quanto mais vezes você repete o experimento, mais essa fração se estabiliza perto do valor "verdadeiro" da chance daquele evento.' },

  { type: 'h2', text: 'A escala: de impossível a certo' },
  { type: 'p', text: 'Pensa numa régua que vai de 0 até 1. Na ponta 0 mora tudo que nunca acontece — tirar um número 7 num dado comum de 6 lados, por exemplo: impossível, chance zero. Na ponta 1 mora tudo que sempre acontece — o sol nascer amanhã, o dado cair em algum número entre 1 e 6: certeza total.' },
  { type: 'p', text: 'No meio dessa régua mora tudo que é incerto, e quanto mais perto de 1, mais provável; quanto mais perto de 0, mais raro. Uma moeda honesta cai bem no meio: 0.5 de chance pra cada lado, porque não há motivo pra um lado ser mais comum que o outro.' },
  { type: 'note', text: 'Resumo da fase leiga: probabilidade é um número entre "nunca acontece" (0) e "sempre acontece" (1) que mede quão comum um resultado é — e uma boa forma de estimar esse número é repetir a situação muitas vezes e contar quantas vezes o resultado desejado apareceu.' },

  { type: 'h2', text: 'A notação formal' },
  { type: 'p', text: 'Em qualquer situação incerta — jogar uma moeda, tirar uma carta, medir se chove amanhã — existe um conjunto de resultados possíveis. Esse conjunto se chama **espaço amostral**. Para uma moeda, o espaço amostral é {cara, coroa}. Para um dado, é {1, 2, 3, 4, 5, 6}.' },
  { type: 'p', text: 'Um **evento** é qualquer subconjunto de resultados que te interessa dentro do espaço amostral — pode ser um único resultado ("tirar exatamente o número 6") ou vários juntos ("tirar um número par", que agrupa {2, 4, 6}).' },
  { type: 'formal', eq: 'P(A) = número de resultados favoráveis a A / número total de resultados possíveis', legend: [
    '`P(A)` — a probabilidade do evento `A` acontecer, lida "probabilidade de A"',
    'numerador — quantos resultados dentro do espaço amostral fazem `A` acontecer',
    'denominador — quantos resultados existem no total, contando todos, favoráveis ou não',
    'Essa fórmula só vale quando todos os resultados têm a mesma chance de acontecer (moeda honesta, dado honesto) — chama-se **espaço equiprovável**',
  ]},
  { type: 'p', text: 'Exemplo com o dado: o evento "tirar um número par" tem 3 resultados favoráveis ({2, 4, 6}) sobre 6 resultados totais. Logo `P(par) = 3/6 = 0.5`. Já o evento "tirar o número 6" tem só 1 resultado favorável: `P(6) = 1/6 ≈ 0.167`.' },
  { type: 'p', text: 'Toda probabilidade obedece duas regras que valem sempre, sem exceção:' },
  { type: 'list', items: [
    '`0 ≤ P(A) ≤ 1` — nenhuma probabilidade é negativa, e nenhuma passa de 1',
    'a soma das probabilidades de **todos** os resultados possíveis do espaço amostral é sempre exatamente 1 — algum resultado tem que acontecer',
  ]},

  { type: 'h2', text: 'Frequência relativa: estimando P(A) por experimento' },
  { type: 'p', text: 'Quando você não conhece de antemão a chance "verdadeira" de um evento — por exemplo, se uma moeda é honesta ou viciada — você estima essa chance repetindo o experimento e contando resultados. Isso se chama **frequência relativa**, e você já tem a ferramenta pra escrever isso formalmente: a notação de somatório, vista na aula de Somatórios e Notação Sigma.' },
  { type: 'formal', eq: 'P(A) ≈ (Σᵢ₌₁ᴺ 𝟙[resultadoᵢ = A]) / N', legend: [
    '`N` — o número total de tentativas do experimento (jogar a moeda N vezes)',
    '`Σᵢ₌₁ᴺ` — soma percorrendo cada uma das N tentativas, uma por uma',
    '`𝟙[resultadoᵢ = A]` — vale 1 se a tentativa `i` deu o resultado `A`, e 0 caso contrário — é só um contador disfarçado',
    'O somatório inteiro conta quantas das N tentativas deram `A`',
    'Dividir por `N` transforma essa contagem numa fração — a frequência relativa',
    'O sinal `≈` (aproximadamente) existe porque essa é uma **estimativa**: quanto maior o `N`, mais essa fração se aproxima da probabilidade real do evento',
  ]},
  { type: 'p', text: 'Se você jogou uma moeda 10 vezes e deu cara 7, sua estimativa é `7/10 = 0.7` — mas isso pode ser só sorte de amostra pequena. Se você jogar 10.000 vezes e continuar dando cara em ~70% delas, isso é evidência forte de que a moeda não é honesta, e que a chance real de cara é próxima de 0.7, não de 0.5.' },

  { type: 'divider' },
  { type: 'h2', text: 'Por que isso importa para IA' },
  { type: 'p', text: 'Guarde bem essa ideia: um número entre 0 e 1 que representa "quão provável" algo é. Quando uma rede neural que classifica imagens termina seu trabalho, ela não devolve simplesmente "é um gato" — ela devolve algo como "a chance de ser gato é 0.82, a chance de ser cachorro é 0.12, a chance de ser outra coisa é 0.06". Cada um desses números é lido exatamente como a probabilidade que você acabou de aprender aqui.' },
  { type: 'note', text: 'Esse jeito de transformar a saída de uma rede num conjunto de probabilidades tem um nome formal — **softmax** — que é o destino final desta trilha inteira. Por enquanto, o que importa é: você já sabe ler o número. Falta só entender como ele é fabricado.' },
];
