export const funcoes = [
  { type: 'h1', text: 'Funções' },
  { type: 'p', text: 'Uma função é uma máquina. Você coloca algo, ela faz uma conta, devolve algo. Sempre a mesma conta, sempre o mesmo resultado pra mesma entrada.' },
  { type: 'p', text: 'Botou 3, saiu 9. Botou 5, saiu 25. A máquina eleva ao quadrado — essa é a regra dela.' },
  { type: 'p', text: 'É tudo que uma função é. O nome `f(x)` é só uma forma de dizer "chame essa máquina de f, e a entrada é x".' },

  { type: 'h2', text: 'Por que isso importa em ML?' },
  { type: 'p', text: 'Uma rede neural inteira é uma dessas máquinas. Você bota uma foto, ela devolve "gato" ou "cachorro". Você bota os dados de uma casa, ela devolve um preço.' },
  { type: 'p', text: 'O treino é o processo de **ajustar a máquina** até ela devolver respostas certas. Mas pra ajustar, você precisa saber o quanto ela está errando. Entra a função de custo.' },

  { type: 'h2', text: 'A Função de Custo' },
  { type: 'p', text: 'Imagina aprender a jogar dardos com os olhos fechados. Você arremessa. Alguém diz "errou por 40 centímetros". Você tenta de novo. "Errou por 20". De novo. "Errou por 5".' },
  { type: 'p', text: 'Esse número — o tamanho do erro — é a função de custo. Ela compara o que o modelo chutou com o que era a resposta certa, e devolve um número. **Quanto maior, mais errado.** O treino tem um único objetivo: fazer esse número cair.' },
  { type: 'p', text: 'A conta mais simples: `(o que chutou - o que era certo)²`. Subtrai, eleva ao quadrado.' },

  { type: 'h2', text: 'Por que elevar ao quadrado e não só subtrair?' },
  { type: 'p', text: 'Sem o quadrado, errar pra cima e errar pra baixo se cancelam. Se você chutou +10 numa resposta e -10 em outra, a soma dá zero — parece perfeito, mas estava erradíssimo.' },
  { type: 'p', text: 'O quadrado torna tudo positivo. E penaliza erros grandes: errar 10x mais vira 100x pior, não 10x. Isso faz o modelo priorizar os maiores erros primeiro.' },
  { type: 'p', text: 'Tem outro motivo técnico: o quadrado cria uma curva lisa sem "quinas". Pra calcular o gradiente (veremos depois), a curva precisa ser lisa. Com quadrado, é uma parábola — perfeita pra otimizar.' },

  { type: 'h2', text: 'Com várias amostras' },
  { type: 'p', text: 'Você não treina com um exemplo só. Treina com centenas ou milhares. Então calcula o `(chutou - certo)²` de cada um e tira a média. Isso se chama MSE — Erro Quadrático Médio.' },

  { type: 'note', text: '**Resumo:** função = máquina que transforma entrada em saída. Função de custo = mede o tamanho do erro. Usamos o quadrado porque elimina cancelamentos, penaliza erros grandes, e cria uma curva lisa pra otimizar.' },

  { type: 'h2', text: 'A notação formal' },
  { type: 'p', text: 'Agora que você entende o conceito, veja como isso aparece em livros e papers:' },
  { type: 'formal', eq: 'L(ŷ, y) = (ŷ − y)²', legend: [
    '`L` — loss, o nome que a literatura dá pra função de custo',
    '`ŷ` — "y hat", o chapéuzinho significa "estimativa" — é o que o modelo chutou',
    '`y` — o valor real, do dataset',
    '`(ŷ − y)²` — chutou menos certo, ao quadrado — exatamente o que explicamos',
  ]},
  { type: 'formal', eq: 'MSE = (1/n) · Σᵢ₌₁ⁿ (ŷᵢ − yᵢ)²', legend: [
    '`MSE` — Mean Squared Error, erro quadrático médio',
    '`1/n` — dividido pelo número de amostras (pra tirar a média)',
    '`Σᵢ₌₁ⁿ` — somatório do índice i=1 até n: "some isso pra cada amostra"',
    '`ŷᵢ − yᵢ` — chutado menos real da i-ésima amostra',
  ]},

  { type: 'h2', text: 'Ver na prática' },
  { type: 'code', code:
`const real = 10;

[-5, -1, 0, 1, 5, 10, 20].forEach(delta => {
  const previsao     = real + delta;
  const erroSimples  = Math.abs(previsao - real);
  const erroQuadrado = (previsao - real) ** 2;
  print(\`previsão=\${previsao.toString().padStart(3)} | erro simples=\${String(erroSimples).padStart(2)} | erro²=\${erroQuadrado}\`);
});` },
];
