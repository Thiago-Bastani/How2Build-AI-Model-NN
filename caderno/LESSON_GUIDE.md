# Guia de Como Escrever Lições

Este arquivo documenta as regras de como escrever lições neste caderno.  
Leia isso antes de criar ou editar qualquer lição.

---

## A filosofia central

O objetivo é **transformar leigo em mestre** — não assumir que o leitor já sabe nada, mas também não subestimar a capacidade dele de entender as coisas difíceis quando bem explicadas.

O leitor é alguém que nunca estudou o assunto. A jornada é:

```
entendimento humano  →  entendimento formal
```

Nunca o contrário.

---

## Estrutura obrigatória de cada lição

### 1. Comece com algo do mundo real

A primeira coisa que o leitor vê deve ser uma situação que ele já conhece.  
Sem jargão. Sem símbolo. Sem definição técnica.

**Bom:**
> "Você está de olhos vendados numa colina e quer chegar ao vale. Não dá pra ver nada — mas dá pra sentir o chão inclinando sob seus pés."

**Ruim:**
> "A derivada é definida como o limite da razão incremental quando o incremento tende a zero."

---

### 2. Explique o conceito em palavras simples

Após a analogia, explique o que o conceito **é** e **por que existe**.  
Foque no **porquê** antes do **o quê**.

Perguntas que a explicação deve responder:
- Por que esse conceito existe? Qual problema ele resolve?
- O que aconteceria se ele não existisse?
- Como ele se conecta com o que o leitor já sabe?

---

### 3. Nunca remova a explicação simples ao adicionar a formal

Quando a notação formal for adicionada, a explicação leiga **permanece**.  
As duas sempre juntas, nessa ordem. Uma não substitui a outra.

**Estrutura típica de um parágrafo com notação formal:**

```
[texto leigo explicando com palavras]
[texto leigo com a conta em português: "(chutou - certo)²"]
{ type: 'formal', eq: 'L(ŷ, y) = (ŷ − y)²', legend: [...] }
```

---

### 4. Notação formal: sempre no final, sempre desmontada

O bloco `formal` é o destino, não o ponto de partida.  
Ele aparece **depois** que o leitor já entende o conceito.  
Cada símbolo da notação é explicado linha a linha no `legend`.

```js
{ type: 'formal', eq: 'L(ŷ, y) = (ŷ − y)²', legend: [
  '`L` — loss, o nome que a literatura dá pra função de custo',
  '`ŷ` — "y hat", o chapéuzinho significa estimativa — é o que o modelo chutou',
  '`y` — o valor real, do dataset',
  '`(ŷ − y)²` — chutou menos certo, ao quadrado',
]}
```

Mostre a notação monstruosa. Não a esconda. Mas desmonte-a completamente.

---

### 5. Código aparece por último

O bloco de código é rotulado mentalmente como "ver na prática".  
Ele nunca é o principal — é a cereja do bolo.  
Um por lição, no máximo dois.

---

### 6. Sequência de blocos em cada seção

```
leigo → leigo → leigo → [formal] → leigo → leigo → [formal] → código
```

Nunca:
- `[formal]` sem leigo antes
- leigo substituído por formal
- código antes da explicação

---

## Regras para os desenhos (visualizações)

### Lei principal: o desenho deve explicar exatamente o que há no texto

Se o gráfico não tem nada a ver com o que o texto cita visualmente, está errado. Ex.: Função quadrática é usada por causa de sua curva (Grafico DEVE TER LEGENDA EXPLICANDO DO QUE SE TRATA AQUELA CURVA, EM QUAL COR ESTÁ, SETA APONTANDO PRA ELA, ETC. não adianta só colocar a função quadrática desenhada. tem que explicitar o que está escrito no texto.)


---

### Cada elemento visual precisa de um nome no próprio desenho

Toda curva, ponto, linha, seta ou área deve ter um label dentro do SVG explicando o que é.

**Ruim:**
- Uma curva roxa sem nome
- Um ponto vermelho sem label
- Uma linha tracejada sem explicar o que representa

**Bom:**
- `"esta curva é f(x) = (x−4)² — o erro"` colado na curva
- `"você está aqui"` com seta apontando pro ponto
- `"DERIVADA = quanto sobe ÷ quanto anda"` em destaque

---

### O conceito principal aparece nomeado e destacado no gráfico

O título do gráfico não basta. O **próprio elemento que representa o conceito** deve estar rotulado dentro do desenho.

Exemplos:
- Na derivada: a linha tangente deve dizer `"linha tangente = a derivada aqui"`
- No gradiente: a seta deve dizer `"↑ gradiente (sobe mais rápido aqui)"`
- Na função de custo: o mínimo deve dizer `"erro zero — previsão perfeita"`

---

### Mostre a conta visualmente, não só o resultado

Se o texto diz "inclinação = subiu ÷ andou", o desenho mostra o triângulo com:
- seta horizontal: `"andou 1"`
- seta vertical: `"subiu 2.4"`
- resultado explícito: `"derivada = 2.4"`

Não mostre só o número. Mostre de onde ele vem.

---

### Labels em português, sempre

Eixos, pontos, setas — tudo em português com contexto.  
Não `"x"` — coloque `"pesos"`, `"previsão"`, `"erro"` conforme o conceito.

---

### Texto de estado em palavras abaixo do gráfico

Todo visualizador interativo tem um texto que descreve em português o que está acontecendo agora:

```
"⬤ subindo — o erro aumenta se você for pra direita"
"⬤ no mínimo — derivada zero, treino para aqui"
```

---

### Interatividade com propósito

Sliders e botões existem pra deixar o leitor explorar o conceito, não pra enfeitar.  
Cada controle tem um label claro: `"arraste o ponto"`, `"animar gradient descent"`.

---

## Vocabulário proibido (sem explicação prévia)

Nunca use esses termos sem antes explicá-los em português simples:

| Termo proibido | Como introduzir |
|---|---|
| derivada | "quanto a saída muda se a entrada mudar um pouquinho" |
| gradiente | "lista com a inclinação de cada peso" |
| loss / custo | "o número que mede o tamanho do erro" |
| backpropagation | "o erro caminhando de trás pra frente pela rede" |
| tensor | "um array N-dimensional" |
| epoch | "uma passagem completa pelo dataset" |
| overfitting | "decorou os exemplos, não aprendeu o padrão" |

---

## Tipos de bloco disponíveis

```js
{ type: 'h1', text: '...' }           // título da lição
{ type: 'h2', text: '...' }           // seção
{ type: 'h3', text: '...' }           // subseção
{ type: 'p', text: '...' }            // parágrafo (suporta **negrito** e `código`)
{ type: 'note', text: '...' }         // caixa azul — resumo ou dica
{ type: 'warn', text: '...' }         // caixa amarela — atenção / erro comum
{ type: 'formula', text: '...' }      // fórmula centralizada em destaque
{ type: 'formal', eq: '...', legend: ['...'] }  // notação acadêmica desmontada
{ type: 'list', items: ['...'] }      // lista com marcadores
{ type: 'divider' }                   // linha separadora
{ type: 'code', code: '...' }         // terminal rodável com tf e print() disponíveis
```

---

## Checklist antes de publicar uma lição

- [ ] A primeira frase é uma analogia do mundo real?
- [ ] O "porquê" do conceito está explicado antes do "o quê"?
- [ ] Cada conta aparece primeiro em português simples antes da notação formal?
- [ ] O bloco `formal` tem todos os símbolos explicados no `legend`?
- [ ] O desenho mostra o conceito visualmente (não só o resultado)?
- [ ] O desenho tem labels em português e texto de estado em palavras?
- [ ] O código é o último bloco da lição (ou da seção)?
- [ ] Nenhum jargão aparece sem definição prévia?
