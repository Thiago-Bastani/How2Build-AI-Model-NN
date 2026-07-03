export const blocks = [
  { type: 'h1', text: 'Derivadas de Exponencial e Logaritmo' },
  { type: 'p', text: 'Lembra de juros compostos, visto na aula de Potências, Expoentes e Logaritmos: quanto mais dinheiro você já tem, mais rápido ele cresce, porque o juro é calculado sobre o total atual — inclusive sobre os juros anteriores. Não é "cresce um tanto fixo por período", é "cresce proporcional ao que já existe agora".' },
  { type: 'p', text: 'Agora imagina uma função cujo crescimento é sempre, em qualquer ponto, exatamente igual ao seu próprio valor naquele ponto — nem mais rápido, nem mais devagar, mas idêntico. Existe uma função assim, e ela é tão especial que ganhou seu próprio nome: a exponencial natural, `eˣ`. O número `e` (aproximadamente 2.718) é definido justamente para que isso aconteça de forma exata.' },
  { type: 'p', text: 'Isso é surpreendente: normalmente, quando você deriva uma função, o resultado é uma função diferente. Com `eˣ`, você deriva e recebe a própria função de volta.' },

  { type: 'h2', text: 'Por que eˣ é sua própria derivada' },
  { type: 'p', text: 'A intuição: em qualquer ponto x, `eˣ` está crescendo a uma taxa proporcional ao seu próprio valor ali — exatamente a ideia de juros compostos, só que de forma contínua, instante a instante, em vez de uma vez por mês ou por ano. Se o valor dobra, a taxa de crescimento naquele ponto também dobra. `e` é, por construção, a única base para a qual essa taxa de crescimento é proporcional ao valor com constante de proporcionalidade igual a 1 — ou seja, o valor e a taxa de crescimento coincidem exatamente.' },
  { type: 'formula', text: "d/dx [eˣ] = eˣ" },
  { type: 'p', text: 'Nenhuma outra função "comum" (potência, seno, etc.) tem essa propriedade — derivar sempre muda alguma coisa (o expoente desce, um sinal aparece). `eˣ` é o único caso em que a operação de derivar não faz nada: a saída é idêntica à entrada.' },

  { type: 'h2', text: 'A derivada do logaritmo natural' },
  { type: 'p', text: 'O logaritmo natural, `ln(x)`, é a operação inversa de `eˣ` — desfaz o que a exponencial faz (visto na aula de Potências, Expoentes e Logaritmos). Por ser a função inversa da exponencial, sua derivada acaba sendo bem mais simples do que se poderia esperar: não tem `e` nem `ln` na resposta, só uma fração.' },
  { type: 'formula', text: "d/dx [ln(x)] = 1/x" },
  { type: 'p', text: 'Repare no comportamento: quando x é pequeno (perto de zero), `1/x` é enorme — o `ln` sobe muito rápido ali. Quando x é grande, `1/x` fica pequeno — o `ln` quase para de subir, cresce devagar. Isso bate com o formato da curva do logaritmo: dispara perto de zero, depois achata conforme x cresce.' },

  { type: 'h2', text: 'Combinando com a regra da cadeia' },
  { type: 'p', text: 'Essas duas derivadas raramente aparecem sozinhas — quase sempre há algo dentro do expoente ou dentro do logaritmo. É aí que a regra da cadeia (já vista) entra: deriva o exterior (a exponencial ou o log) e multiplica pela derivada do interior.' },

  { type: 'h3', text: 'Exemplo 1: e^(2x)' },
  { type: 'p', text: 'Exterior: `e^(...)`.   Interior: `2x`.' },
  { type: 'p', text: 'Derivada do exterior (regra acima, ela mesma): `e^(...)`. Derivada do interior: `2`.' },
  { type: 'p', text: 'Multiplica: `e^(2x) × 2`.' },
  { type: 'formula', text: "d/dx [e^(2x)]  =  2·e^(2x)" },

  { type: 'h3', text: 'Exemplo 2: ln(x² + 1)' },
  { type: 'p', text: 'Exterior: `ln(...)`.   Interior: `x² + 1`.' },
  { type: 'p', text: 'Derivada do exterior: `1/(...)`. Derivada do interior: `2x`.' },
  { type: 'p', text: 'Multiplica: `[1/(x²+1)] × 2x`.' },
  { type: 'formula', text: "d/dx [ln(x²+1)]  =  2x / (x²+1)" },

  { type: 'note', text: 'Resumo: `eˣ` é a única função que é a própria derivada — crescimento proporcional ao valor atual, versão contínua dos juros compostos. `ln(x)` deriva pra `1/x`. Combinadas com a regra da cadeia, essas duas derivadas resolvem qualquer exponencial ou logaritmo composto que você vai encontrar daqui pra frente — inclusive, mais adiante no caderno, as derivadas da função sigmoid, da softmax e da entropia cruzada, que são construídas exatamente em cima de `eˣ` e `ln(x)`.' },

  { type: 'h2', text: 'A notação formal' },
  { type: 'formal', eq: "d/dx [eˣ] = eˣ\nd/dx [ln(x)] = 1/x\nd/dx [e^(g(x))] = g'(x)·e^(g(x))\nd/dx [ln(g(x))] = g'(x)/g(x)", legend: [
    '`e` — a constante de Euler, ≈ 2.718, base da exponencial natural',
    '`eˣ` — a exponencial natural; sua derivada é ela mesma',
    '`ln(x)` — logaritmo natural, inverso de `eˣ`; sua derivada é `1/x`',
    "`g(x)`, `g'(x)` — quando o expoente ou o argumento do log é uma função composta, aplica a regra da cadeia: multiplica pela derivada do interior",
  ]},
];
