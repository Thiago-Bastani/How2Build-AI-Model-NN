export const blocks = [
  { type: 'h1', text: 'Gradient Descent — o Algoritmo Completo' },
  { type: 'p', text: 'Você está de olhos vendados numa montanha, e quer descer até o ponto mais baixo do vale. Você não enxerga o vale inteiro — só consegue sentir, sob os seus pés, pra que lado o chão está inclinado agora. Uma estratégia razoável: sente a inclinação, dê um passo na direção que desce, sinta de novo, dê outro passo, repita. Passo a passo, sem nunca ver o vale inteiro, você vai se aproximando do fundo.' },
  { type: 'p', text: 'Esse processo — sentir a inclinação, dar um passo na direção que desce, repetir — é o algoritmo inteiro que fundamenta como praticamente todo modelo de aprendizado de máquina é treinado. Ele se chama **Gradient Descent** ("descida do gradiente").' },

  { type: 'h2', text: 'Juntando as peças' },
  { type: 'p', text: 'Cada peça já foi construída nas aulas anteriores desta trilha:' },
  { type: 'list', items: [
    'Uma função que mede o erro do modelo (o "quão errado" — o vale que você quer descer)',
    'O gradiente dessa função (aula de Derivadas Parciais e Gradiente, e sua versão em bloco na aula anterior) — a direção que **sobe** mais rápido',
    'A ideia de ponto crítico com concavidade pra cima sendo um mínimo (aula de Máximos e Mínimos) — é isso que garante que faz sentido procurar por um ponto de "inclinação zero" como o candidato ao menor erro',
  ]},
  { type: 'p', text: 'Gradient Descent junta essas três peças num processo repetitivo: chuta um ponto de partida qualquer, mede o gradiente ali, dá um passo na direção **oposta** ao gradiente — porque o gradiente aponta pra onde a função **sobe**, e você quer **descer** — e repete isso várias vezes.' },

  { type: 'h2', text: 'O algoritmo, passo a passo' },
  { type: 'list', items: [
    '1. Escolhe um ponto de partida (geralmente aleatório)',
    '2. Calcula o gradiente da função de erro naquele ponto',
    '3. Move o ponto um pouquinho na direção oposta ao gradiente',
    '4. Repete os passos 2 e 3, a partir do novo ponto',
    '5. Para quando o gradiente fica próximo de zero (o passo praticamente não muda mais nada) ou depois de um número fixo de repetições',
  ]},
  { type: 'p', text: 'Por que parar quando o gradiente fica perto de zero? Porque foi exatamente isso que a aula de Máximos e Mínimos ensinou: gradiente zero é a marca de um ponto crítico, e — se a curva ao redor tem concavidade pra cima — esse ponto crítico é um mínimo. O algoritmo não está "adivinhando" que aquele é um bom lugar pra parar: ele está, literalmente, procurando o ponto que a matemática já provou ser candidato ao menor erro.' },

  { type: 'h2', text: 'O tamanho do passo — a taxa de aprendizado' },
  { type: 'p', text: 'Quão grande deve ser cada passo? Essa quantidade tem nome: a **taxa de aprendizado** (em inglês, learning rate). Ela é um número que multiplica o gradiente antes de subtrair do ponto atual — controla literalmente o tamanho de cada passo dado morro abaixo.' },
  { type: 'p', text: 'Se o passo for **grande demais**: você desce rápido no começo, mas corre o risco de passar direto pelo fundo do vale e subir do outro lado — e no próximo passo, passar de novo pro lado de cá. O ponto fica pulando de um lado pro outro do vale sem nunca se acomodar no fundo — oscilando, às vezes até se afastando cada vez mais em vez de convergir.' },
  { type: 'p', text: 'Se o passo for **pequeno demais**: você nunca passa do fundo, mas cada passo avança tão pouco que leva uma eternidade (e um custo computacional enorme) pra chegar perto do mínimo de fato.' },
  { type: 'p', text: 'Na prática, a taxa de aprendizado é um dos ajustes mais importantes — e mais delicados — de se acertar ao treinar um modelo: grande o bastante pra convergir num tempo razoável, pequena o bastante pra não passar do alvo.' },

  { type: 'h2', text: 'Por que repetir esse processo tende a funcionar' },
  { type: 'p', text: 'A intuição de convergência: perto do fundo do vale, a inclinação (o gradiente) fica cada vez mais suave — mais perto de zero. Isso significa que, conforme o ponto se aproxima do mínimo, os passos naturalmente ficam menores (já que o passo é proporcional ao gradiente), o que ajuda o processo a se acomodar suavemente no fundo em vez de continuar disparando pra frente. É a mesma lógica da aula de Limites: o ponto nunca precisa "chegar" exatamente no mínimo matemático perfeito — ele se aproxima cada vez mais, até um ponto arbitrariamente próximo, que na prática já serve.' },
  { type: 'viz', id: 'gradiente' },

  { type: 'note', text: 'Resumo: Gradient Descent = chuta um ponto, mede o gradiente, anda um passo na direção oposta ao gradiente, repete. O tamanho do passo é a taxa de aprendizado — grande demais oscila e pode nunca convergir, pequena demais demora uma eternidade. O algoritmo para perto de onde o gradiente é próximo de zero, porque esse é exatamente o candidato matemático a menor erro (visto na aula de Máximos e Mínimos).' },

  { type: 'h2', text: 'A notação formal' },
  { type: 'formal', eq: 'θ ← θ − α · ∇f(θ)', legend: [
    '`θ` — "teta", o ponto atual: pode ser um número, um vetor, ou (no caso de uma rede neural) toda a matriz de pesos',
    '`←` — "atualiza para": o novo θ substitui o antigo',
    '`α` — "alfa", a taxa de aprendizado — o tamanho do passo, um número positivo pequeno escolhido antes de treinar',
    '`∇f(θ)` — o gradiente da função de erro `f`, calculado no ponto atual θ — a direção que sobe mais rápido',
    '`− α · ∇f(θ)` — anda um passo de tamanho α na direção oposta ao gradiente, ou seja, descendo',
  ]},

  { type: 'h2', text: 'Nomes que a literatura usa' },
  { type: 'p', text: 'Esse algoritmo, quando aplicado repetidas vezes usando só um pedacinho (um lote) dos dados de treino por vez em vez do dataset inteiro de uma só vez, ganha o nome de **SGD** — Stochastic Gradient Descent, "descida do gradiente estocástica". A ideia central é idêntica à que você acabou de aprender; a única mudança é usar lotes menores de dados a cada passo, o que torna o processo mais rápido e viável para datasets gigantes.' },
  { type: 'p', text: 'Existem também versões mais espertas desse mesmo algoritmo, que ajustam o tamanho do passo sozinhas ao longo do treino em vez de usar uma taxa de aprendizado fixa o tempo todo. A mais usada na prática se chama **Adam** — pensa nela como uma versão de Gradient Descent que "aprende a acelerar ou desacelerar sozinha" conforme percebe se está indo bem ou oscilando demais.' },
  { type: 'note', text: 'A versão em código deste algoritmo — implementado e rodando de verdade sobre números — vem na próxima trilha, Fundamentos de Implementação.' },
];
