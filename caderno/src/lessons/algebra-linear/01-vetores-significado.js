export const blocks = [
  { type: 'h1', text: 'Vetores: Listas com Significado' },
  { type: 'p', text: 'Imagine que você está descrevendo uma casa para um amigo por telefone: "3 quartos, 120 metros quadrados, 2º andar". Você não disse uma coisa só — disse três números, nessa ordem, e a ordem importa. Se você trocar a ordem ("120 quartos, 3 metros quadrados, 2º andar"), a descrição vira outra casa completamente absurda.' },
  { type: 'p', text: 'Essa lista ordenada de números — `[3, 120, 2]` — é um **vetor**. Um vetor é simplesmente uma lista de números onde a posição de cada número tem um significado fixo: a 1ª posição é sempre "quartos", a 2ª é sempre "área", a 3ª é sempre "andar". Trocar a ordem muda o que está sendo descrito.' },
  { type: 'p', text: 'Você já viu, na aula de Coordenadas e Espaços N-Dimensionais, que um ponto pode ser localizado por várias coordenadas — `(x, y)` no plano, `(x, y, z)` no espaço, ou `(x₁, x₂, ..., xₙ)` em um espaço com N dimensões. Um vetor é exatamente isso: uma lista de N números que, juntos, localizam ou descrevem uma coisa só.' },

  { type: 'h2', text: 'Duas formas de enxergar o mesmo vetor' },
  { type: 'p', text: 'Existem duas maneiras de interpretar um vetor, e as duas são úteis — dependendo do que você quer entender.' },

  { type: 'h3', text: 'Vetor como ponto' },
  { type: 'p', text: 'A casa `[3, 120, 2]` pode ser vista como um ponto único num espaço de 3 dimensões, onde o primeiro eixo é "quartos", o segundo é "área" e o terceiro é "andar". Cada casa possível vira um ponto nesse espaço. Uma casa parecida — `[3, 115, 2]` — vira um ponto próximo. Uma casa muito diferente — `[1, 30, 10]` — vira um ponto distante. Nessa visão, o vetor é uma posição.' },

  { type: 'h3', text: 'Vetor como seta' },
  { type: 'p', text: 'A mesma lista `[3, 120, 2]` também pode ser vista como uma **seta** que parte da origem (o ponto `[0, 0, 0]`, "casa" com zero quartos, zero área, térreo) e aponta até aquele ponto. A seta tem um comprimento e uma direção. Nessa visão, o vetor não é só "onde a coisa está" — é "o quanto e em que direção você precisa andar, partindo do zero, para chegar lá".' },
  { type: 'note', text: 'Ponto e seta são a mesma informação, vista de dois jeitos. "Ponto" enfatiza a posição; "seta" enfatiza o deslocamento a partir da origem. Você vai ver os dois usos em aulas futuras — escolha o que fizer mais sentido pra cada situação.' },

  { type: 'h2', text: 'Vetores não precisam ser espaciais' },
  { type: 'p', text: 'É fácil pensar em vetor como algo geométrico — uma seta desenhada numa folha. Mas o vetor da casa não é um lugar físico no mundo: é uma lista de características quaisquer, empacotadas juntas. As posições podem ser quartos, área e andar. Ou podem ser: idade de uma pessoa, salário, anos de estudo. Ou: temperatura, pressão, umidade. Qualquer conjunto de números que descreve algo, na mesma ordem sempre, é um vetor — mesmo que não exista um "espaço" físico correspondente.' },
  { type: 'p', text: 'O espaço N-dimensional que você viu na aula anterior é só a ferramenta matemática que usamos para pensar nessas listas visualmente, com pontos e distâncias — mesmo quando as dimensões representam coisas abstratas como "quartos" e "andar", que não têm nada a ver com largura, altura e profundidade do mundo real.' },

  { type: 'h2', text: 'A notação formal' },
  { type: 'p', text: 'Um vetor é escrito como uma lista entre colchetes, e cada posição recebe um nome com índice.' },
  { type: 'formal', eq: 'v = [v₁, v₂, ..., vₙ]', legend: [
    '`v` — o nome do vetor (letra em negrito ou com seta em cima, em livros: v⃗)',
    '`v₁, v₂, ..., vₙ` — os componentes do vetor, cada um na sua posição fixa',
    '`n` — a dimensão do vetor: quantos números ele tem (não confundir com o valor dos números — um vetor de dimensão 3 pode ter números enormes ou minúsculos)',
  ]},
  { type: 'p', text: 'Para a casa: `v = [3, 120, 2]`, onde `v₁ = 3` (quartos), `v₂ = 120` (área), `v₃ = 2` (andar). O vetor tem dimensão 3 — vive num espaço 3-dimensional.' },

  { type: 'h2', text: 'Por que isso importa para IA' },
  { type: 'p', text: 'Todo modelo de IA precisa receber dados de entrada como números — nunca como "uma casa" ou "uma imagem" no sentido literal, mas como uma lista ordenada de números que descreve essa coisa. Uma casa vira `[quartos, área, andar, ...]`. Uma imagem vira uma lista enorme de valores de brilho de cada pixel. Um texto vira uma lista de números que representam palavras.' },
  { type: 'p', text: 'Essa lista de números que descreve uma entrada é chamada, na literatura, de **vetor de características** — em inglês, "feature vector" ("feature" = característica). Todo dado que entra num modelo de IA, no fim das contas, primeiro vira um vetor de características. Todo o resto que você vai aprender daqui pra frente — operações entre vetores, matrizes, redes neurais inteiras — é sobre o que se faz com esses vetores depois que eles existem.' },
  { type: 'note', text: 'Resumo: vetor = lista ordenada de números onde a posição tem significado fixo. Pode ser visto como ponto (posição) ou como seta (deslocamento da origem). Todo dado de entrada em IA é, no fim, um vetor de características.' },
];
