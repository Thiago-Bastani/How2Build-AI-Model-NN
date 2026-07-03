export const blocks = [
  { type: 'h1', text: 'Backpropagation' },

  { type: 'p', text: 'Imagine uma linha de produção com dois trabalhadores em sequência: o primeiro monta uma peça, o segundo pinta e entrega o produto final. Se o produto final sai errado, o segundo trabalhador percebe primeiro — e precisa avisar o primeiro sobre o quanto do erro veio de cada etapa, pra que cada um saiba o quanto ajustar o próprio trabalho. O aviso caminha de trás pra frente na linha de produção: do resultado final até a primeira etapa.' },
  { type: 'p', text: 'Backpropagation é exatamente esse aviso caminhando de trás pra frente, numa rede neural. Depois que a loss (o tamanho do erro, já visto na aula anterior) é calculada na saída, cada peso da rede — mesmo os das primeiras camadas, bem longe da saída — precisa saber o quanto ele contribuiu pra esse erro, pra saber em que direção se ajustar.' },

  { type: 'note', text: 'Resumo da fase leiga: o erro final é calculado na saída, e a informação de "quanto cada peso contribuiu pra esse erro" caminha de trás pra frente, camada por camada, até chegar aos pesos da primeira camada.' },

  { type: 'h2', text: 'A ferramenta: regra da cadeia, repetida' },
  { type: 'p', text: 'Você já viu a regra da cadeia: para derivar uma função dentro de outra função, deriva a de fora e multiplica pela derivada da de dentro. Uma rede neural com várias camadas é exatamente isso — uma função dentro de outra função dentro de outra função, uma por camada. Backpropagation é a regra da cadeia aplicada repetidamente, uma vez por camada, caminhando da saída até a entrada.' },

  { type: 'h2', text: 'Uma rede pequena, do início ao fim' },
  { type: 'p', text: 'Rede mínima: uma entrada `x`, uma camada escondida com 1 neurônio (peso `w₁`, bias `b₁`, ativação sigmoid), e uma camada de saída com 1 neurônio (peso `w₂`, bias `b₂`, sem ativação — regressão). Loss: erro quadrático (MSE de uma amostra só, pra simplificar).' },
  { type: 'formal', eq: 'z₁ = w₁x + b₁\nh  = sigmoid(z₁)\nŷ  = w₂h + b₂\nL  = (ŷ − y)²', legend: [
    '`z₁` — soma pesada da camada escondida, antes da ativação',
    '`h` — saída da camada escondida, depois da ativação',
    '`ŷ` — previsão final da rede',
    '`L` — loss desta amostra',
  ]},
  { type: 'p', text: 'Objetivo: descobrir `∂L/∂w₂`, `∂L/∂b₂`, `∂L/∂w₁`, `∂L/∂b₁` — o gradiente (já visto) em relação a cada peso e bias, pra saber como ajustar cada um.' },

  { type: 'h3', text: 'Passo 1 — a camada de saída (mais perto do erro)' },
  { type: 'p', text: 'Pela regra da cadeia: `∂L/∂w₂ = ∂L/∂ŷ · ∂ŷ/∂w₂`. Cada pedaço se deriva sozinho, usando as regras já vistas: `∂L/∂ŷ = 2(ŷ−y)` (derivada de `(ŷ−y)²` pela regra da potência) e `∂ŷ/∂w₂ = h` (derivada de `w₂h+b₂` em relação a `w₂`, já que `h` é tratado como constante aqui).' },
  { type: 'formal', eq: '∂L/∂w₂ = 2(ŷ − y) · h\n∂L/∂b₂ = 2(ŷ − y) · 1', legend: [
    '`2(ŷ − y)` — quanto o erro muda se a previsão mudar um pouquinho',
    '`h` — multiplicado porque é ele quem multiplica `w₂` na equação de `ŷ`',
    '`∂ŷ/∂b₂ = 1` — b₂ é somado direto, então sua derivada é 1',
  ]},

  { type: 'h3', text: 'Passo 2 — a camada escondida (o erro caminha pra trás)' },
  { type: 'p', text: 'Agora vem a parte que dá nome ao método: pra achar `∂L/∂w₁`, a cadeia precisa passar por **mais um elo** — o erro tem que atravessar a ativação sigmoid antes de chegar em `w₁`.' },
  { type: 'p', text: 'Primeiro, o quanto o erro muda se `h` mudar: `∂L/∂h = ∂L/∂ŷ · ∂ŷ/∂h = 2(ŷ−y) · w₂` (mesma lógica do passo 1, só que agora derivando `ŷ` em relação a `h` em vez de `w₂`).' },
  { type: 'p', text: 'Depois, o quanto `h` muda se `z₁` mudar: é a derivada da sigmoid, que — usando a regra da cadeia sobre `1/(1+e^{-z})` e as derivadas de exponencial já vistas — dá exatamente `h·(1−h)`.' },
  { type: 'p', text: 'Por fim, o quanto `z₁` muda se `w₁` mudar: `∂z₁/∂w₁ = x`.' },
  { type: 'formal', eq: '∂L/∂w₁ = [∂L/∂ŷ · ∂ŷ/∂h] · [∂h/∂z₁] · [∂z₁/∂w₁]\n        = [2(ŷ−y) · w₂] · [h(1−h)] · [x]\n\n∂L/∂b₁ = [2(ŷ−y) · w₂] · [h(1−h)] · 1', legend: [
    'Cada colchete é um elo da cadeia — exatamente como no exemplo da regra da cadeia com 3 camadas aninhadas',
    'O primeiro colchete é o "erro que chegou até aqui, vindo de trás"',
    'Os outros dois colchetes são "o quanto esse ponto local da rede amplifica ou reduz esse erro"',
    'Repare que `∂L/∂w₁` reaproveita o pedaço `2(ŷ−y)·w₂` que já foi calculado no passo da camada de saída — isso é o que torna backpropagation eficiente: cada resultado intermediário é calculado uma vez e reaproveitado pelas camadas anteriores',
  ]},

  { type: 'h3', text: 'Exemplo numérico completo' },
  { type: 'p', text: 'Com `x=2`, `y=1`, `w₁=0.5`, `b₁=0`, `w₂=0.8`, `b₂=0.1`:' },
  { type: 'list', items: [
    '`z₁ = 0.5×2 + 0 = 1.0`',
    '`h = sigmoid(1.0) ≈ 0.731`',
    '`ŷ = 0.8×0.731 + 0.1 ≈ 0.685`',
    '`L = (0.685 − 1)² ≈ 0.099`',
  ]},
  { type: 'list', items: [
    '`∂L/∂w₂ = 2×(0.685−1)×0.731 ≈ −0.461`',
    '`∂L/∂b₂ = 2×(0.685−1) ≈ −0.630`',
    '`h(1−h) = 0.731×0.269 ≈ 0.197`',
    '`∂L/∂w₁ = (−0.630×0.8)×0.197×2 ≈ −0.198`',
    '`∂L/∂b₁ = (−0.630×0.8)×0.197 ≈ −0.099`',
  ]},
  { type: 'p', text: 'Cada peso agora tem seu próprio número — negativo aqui, significando que aumentar cada peso reduziria a loss (então o gradient descent, já visto, empurraria esses pesos pra cima). Numa rede real, com milhares ou milhões de pesos e dezenas de camadas, o processo é o mesmo exato encadeamento — só repetido muitas mais vezes.' },

  { type: 'note', text: 'Resumo: backpropagation calcula, camada por camada de trás pra frente, o gradiente da loss em relação a cada peso, usando a regra da cadeia repetidamente e reaproveitando os resultados intermediários de camadas posteriores. Fazer essa álgebra na mão pra uma rede grande é inviável — é exatamente esse trabalho que um computador automatiza, como a próxima aula mostra.' },
];
