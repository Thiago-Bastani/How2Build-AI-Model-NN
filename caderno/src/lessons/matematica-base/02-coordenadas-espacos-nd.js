export const blocks = [
  { type: 'h1', text: 'Coordenadas e Espaços N-Dimensionais' },
  { type: 'p', text: 'Você combina de encontrar um amigo num shopping. Pra explicar onde está, você diz: "estou no 2º andar, próximo à loja de sapatos, do lado esquerdo do corredor". Duas informações já bastam pra localizar você num plano: qual andar (uma direção) e qual posição dentro daquele andar (outra direção).' },
  { type: 'p', text: 'Um jeito mais preciso de fazer isso é usando dois números. Imagine o chão do shopping como uma grade: quantos passos você andou da entrada pra frente, e quantos passos andou da entrada pro lado. Dois números — "5 passos pra frente, 3 passos pro lado" — descrevem exatamente um ponto, sem ambiguidade nenhuma.' },

  { type: 'h2', text: 'O plano cartesiano' },
  { type: 'p', text: 'Formalize essa ideia de "passos pra frente e passos pro lado" com duas retas perpendiculares que se cruzam num ponto de origem. A reta horizontal costuma ser chamada de **eixo x**, a reta vertical de **eixo y**. Qualquer ponto do plano pode ser descrito por exatamente dois números: quanto ele está deslocado no eixo x, e quanto está deslocado no eixo y.' },
  { type: 'p', text: 'Esse par de números, escrito como `(x, y)`, é a **coordenada** do ponto. O ponto `(5, 3)` está 5 unidades à direita da origem e 3 unidades acima dela. O ponto `(0, 0)` é a própria origem — onde os dois eixos se cruzam.' },
  { type: 'p', text: 'Esse desenho com dois eixos perpendiculares é chamado de **plano cartesiano**, e cada posição nele é descrita, sem ambiguidade, por um par de números.' },
  { type: 'viz', id: 'coordenadas' },

  { type: 'h2', text: 'Adicionando um terceiro eixo' },
  { type: 'p', text: 'Agora imagine descrever a posição de um drone voando dentro de um galpão, não só andando no chão. Você precisa de mais uma informação: além de "quanto pra frente" e "quanto pro lado", precisa de "quanto pra cima". Três números, três direções independentes, um ponto no espaço tridimensional: `(x, y, z)`.' },
  { type: 'p', text: 'Nada de especial acontece conceitualmente ao passar de 2 para 3 números — você só precisou de mais um eixo porque a situação real (voar, não só andar no chão) tinha mais uma direção independente pra descrever.' },

  { type: 'h2', text: 'E se precisar de mais de três números?' },
  { type: 'p', text: 'Aqui está o salto importante: nada impede a mesma ideia de continuar valendo com 4, 10, ou mil números — mesmo que não dê mais pra desenhar isso fisicamente numa folha de papel. Um "ponto" não precisa representar uma posição física no espaço; ele pode representar qualquer conjunto de números que, juntos, descrevem alguma coisa.' },
  { type: 'p', text: 'Exemplo: imagine uma tabela com dados de casas à venda, com colunas "tamanho em m²", "número de quartos", "idade da casa em anos" e "distância até o centro em km". Uma única linha dessa tabela — uma casa específica — é descrita por exatamente 4 números: `(120, 3, 15, 8)`, por exemplo. Essa linha é um ponto, só que num espaço com 4 eixos (um por coluna) em vez de 2 ou 3.' },
  { type: 'p', text: 'Se a tabela tivesse 50 colunas, cada linha seria um ponto num espaço de 50 eixos. Você não consegue mais desenhar isso — o cérebro humano enxerga bem até 3 dimensões — mas a lógica matemática continua sendo exatamente a mesma: um ponto é só uma lista ordenada de números, um por eixo, não importa quantos eixos existam.' },

  { type: 'note', text: 'Resumo: coordenada = uma lista ordenada de números que localiza um ponto, um número por eixo. Plano cartesiano usa 2 eixos. O espaço físico usa 3. Uma tabela de dados com N colunas define um espaço de N eixos, e cada linha da tabela é um ponto dentro desse espaço — mesmo que N seja grande demais pra desenhar.' },

  { type: 'h2', text: 'A notação formal' },
  { type: 'formal', eq: 'P = (x₁, x₂, ..., xₙ)  ∈  ℝⁿ', legend: [
    '`P` — o nome dado ao ponto',
    '`(x₁, x₂, ..., xₙ)` — a lista ordenada de coordenadas do ponto: uma por eixo, da primeira (`x₁`) até a última (`xₙ`)',
    '`n` — o número de eixos do espaço (também chamado de número de **dimensões**)',
    '`∈` — símbolo que significa "pertence a" ou "é um elemento de"',
    '`ℝⁿ` — lê-se "erre ene": o conjunto de todos os pontos possíveis descritos por `n` números reais — o "espaço" com `n` eixos inteiro, contendo todo ponto que poderia existir nele',
  ]},
  { type: 'p', text: 'Com `n=2`, `ℝ²` é o plano cartesiano comum, e `P = (x₁, x₂)` é só o par `(x, y)` de sempre, escrito com índices em vez de letras diferentes — útil justamente porque, com `n` grande, você não teria letras suficientes do alfabeto pra nomear cada eixo.' },
  { type: 'p', text: 'Com `n=4`, o exemplo da tabela de casas vira `P = (120, 3, 15, 8) ∈ ℝ⁴` — um ponto exato dentro de um espaço de 4 eixos, um por coluna da tabela.' },

  { type: 'note', text: 'Essa ideia — cada linha de uma tabela de dados vira um ponto num espaço com um eixo por coluna — é um dos alicerces mais usados em IA. Mais adiante no caderno, esse mesmo espaço de muitos eixos reaparece com nomes técnicos como espaço latente e embedding, quando o número de eixos já não representa colunas de uma tabela original, mas sim características aprendidas pelo próprio sistema. A ideia de fundo, porém, é exatamente esta: um ponto é uma lista ordenada de números, e um espaço N-dimensional é o conjunto de todos os pontos possíveis com essa quantidade de números.' },
];
