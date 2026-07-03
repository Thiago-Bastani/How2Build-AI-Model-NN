export const blocks = [
  { type: 'h1', text: 'Norma e Distância' },
  { type: 'p', text: 'Você provavelmente já viu isso na escola: num triângulo retângulo, o quadrado da hipotenusa é igual à soma dos quadrados dos outros dois lados — `a² + b² = c²`. Se um lado mede 3 e o outro mede 4, a hipotenusa mede `√(9+16) = √25 = 5`. Esse é o teorema de Pitágoras.' },
  { type: 'p', text: 'Agora imagine que aquela caminhada de "3 quarteirões leste, 4 quarteirões norte" da aula anterior. Se você pudesse voar em linha reta da origem até o destino final, em vez de andar pelos quarteirões, quantos metros você voaria? Exatamente a hipotenusa: 5 quarteirões em linha reta. O teorema de Pitágoras não é só sobre triângulos desenhados no papel — ele mede o comprimento real de qualquer deslocamento.' },

  { type: 'h2', text: 'A norma: o "tamanho" de um vetor' },
  { type: 'p', text: 'Lembra que um vetor pode ser visto como uma seta partindo da origem (aula 1)? O comprimento dessa seta tem um nome: **norma**. E ela se calcula exatamente como a hipotenusa: eleve cada componente ao quadrado, some tudo, tire a raiz quadrada.' },
  { type: 'p', text: 'Para o vetor `[3, 4]`: norma = `√(3² + 4²) = √(9+16) = √25 = 5`. Para um vetor com mais dimensões, a ideia continua a mesma — só soma mais quadrados antes de tirar a raiz: `[1, 2, 2]` tem norma `√(1+4+4) = √9 = 3`.' },
  { type: 'formula', text: 'norma de [3, 4] = √(3² + 4²) = √25 = 5' },
  { type: 'note', text: 'A norma generaliza o teorema de Pitágoras para qualquer número de dimensões — 2, 3, ou 300. A conta é sempre a mesma: soma dos quadrados, depois raiz.' },

  { type: 'h2', text: 'Distância entre dois vetores' },
  { type: 'p', text: 'Se a norma mede "o quão longe da origem" um vetor está, como medir o quão diferentes são duas coisas quaisquer — nenhuma delas necessariamente na origem? A resposta: calcule o vetor diferença (subtraia um do outro, posição a posição) e tire a norma dele.' },
  { type: 'p', text: 'Duas casas: `[3, 120, 2]` e `[3, 115, 2]` — praticamente idênticas, só a área muda 5 metros. O vetor diferença é `[0, 5, 0]`, e a norma dele é `√(0+25+0) = 5`. Duas casas bem diferentes, `[3, 120, 2]` e `[1, 30, 10]`, dão um vetor diferença `[2, 90, -8]`, com norma `√(4+8100+64) ≈ 90.4` — um número bem maior, indicando que essas casas são muito menos parecidas.' },
  { type: 'p', text: 'Ou seja: **distância entre dois vetores = norma da diferença entre eles**. Quanto menor a distância, mais parecidos os dois pontos (ou as duas coisas que eles descrevem) são.' },

  { type: 'h2', text: 'A notação formal' },
  { type: 'formal', eq: '‖v‖ = √(v₁² + v₂² + ... + vₙ²) = √(Σᵢ vᵢ²)', legend: [
    '`‖v‖` — a norma do vetor v (também chamada de norma euclidiana, ou norma L2)',
    '`vᵢ` — cada componente de v',
    '`Σᵢ vᵢ²` — soma dos quadrados de todos os componentes',
    '`√(...)` — raiz quadrada do total',
  ]},
  { type: 'formal', eq: 'd(a, b) = ‖a − b‖', legend: [
    '`d(a, b)` — distância entre os vetores a e b',
    '`a − b` — o vetor diferença: subtrai posição a posição',
    '`‖a − b‖` — a norma desse vetor diferença — um número único',
  ]},

  { type: 'h2', text: 'Por que isso importa para IA' },
  { type: 'p', text: 'Modelos de IA costumam receber vetores de características onde cada posição está numa escala completamente diferente — por exemplo, "área" variando na casa das centenas e "andar" variando de 1 a 20. Como a norma soma quadrados, uma posição com números grandes domina o cálculo inteiro, e a "distância" deixa de refletir de verdade o quanto duas coisas são parecidas.' },
  { type: 'p', text: 'É por isso que, antes de treinar um modelo, costuma-se aplicar uma etapa chamada **normalização**: recolocar todas as posições numa escala comparável, para que nenhuma domine as outras injustamente. Você vai ver essa técnica formalmente numa aula futura chamada Média, Variância e Desvio-Padrão.' },
  { type: 'p', text: 'Essa ideia de distância entre vetores também é o alicerce de uma técnica futura chamada **embeddings**, onde palavras e conceitos viram vetores, e "coisas parecidas em significado" viram vetores próximos nesse espaço — proximidade medida exatamente pela distância que você acabou de aprender.' },
  { type: 'note', text: 'Resumo: norma = comprimento de um vetor, calculado com Pitágoras generalizado (soma dos quadrados, raiz quadrada). Distância entre dois vetores = norma da diferença entre eles. Quanto menor, mais parecidos.' },
];
