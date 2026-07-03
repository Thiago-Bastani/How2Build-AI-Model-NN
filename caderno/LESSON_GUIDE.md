# Guia de Como Escrever Lições

Este arquivo documenta as regras de como escrever lições neste caderno.
Leia isso antes de criar ou editar qualquer lição.

---

## A filosofia central

O objetivo é **transformar leigo em mestre** — não assumir que o leitor já sabe nada, mas também não subestimar a capacidade dele de entender as coisas difíceis quando bem explicadas.

O leitor é alguém que nunca estudou o assunto, e chega sabendo só matemática básica (somar, multiplicar, dividir, potência, variável) e programação básica (lógica, operadores, funções). A jornada é:

```
entendimento humano  →  entendimento formal/técnico completo
```

Nunca o contrário. E nunca uma versão diluída do lado formal — o salto tem que ser completo.

---

## Regra 1 — Leigo → Expert (duas fases, não uma sequência intercalada)

Cada lição tem exatamente **duas fases**, nessa ordem, sem alternar entre elas:

**Fase Leigo**
- Começa com uma situação do mundo real que o leitor já reconhece. Sem jargão, sem símbolo, sem definição técnica.
- Explica o **porquê** o conceito existe e **que problema** ele resolve, ligando com o que o leitor já sabe.
- Zero notação formal nesta fase.

**Fase Expert**
- O tratamento formal/técnico **completo** do assunto: notação, regras, derivações e provas onde existirem.
- Não é um resumo do lado leigo com símbolos em cima — é o conteúdo real, no nível de um curso de verdade sobre aquele tema (ver Regra 3).
- É aqui que a notação formal aparece, sempre desmontada linha a linha (ver seção "Notação formal" abaixo).

**Bom (fase leigo):**
> "Você está de olhos vendados numa colina e quer chegar ao vale. Não dá pra ver nada — mas dá pra sentir o chão inclinando sob seus pés."

**Ruim (formal aparecendo cedo demais, sem a fase leigo antes):**
> "A derivada é definida como o limite da razão incremental quando o incremento tende a zero."

O "brilho" de aprender vem do salto limpo de um lado pro outro — a sensação de "agora eu decifro esse símbolo que parecia assustador" — não de ficar alternando leigo/formal/leigo/formal em pedacinhos.

---

## Regra 2 — Código só existe em aula de código

Uma aula é **ou** uma aula de matemática/teoria **ou** uma aula de código — nunca as duas coisas.

- Uma aula de matemática (derivada, gradiente, probabilidade, softmax como conceito, atenção como mecanismo, etc.) tem **zero blocos `code`**. Ela termina na fase Expert formal, sem "ver na prática".
- Uma aula de código existe **separadamente**, como par da aula de matemática, dedicada a implementar o que a aula-irmã já ensinou — sem re-explicar a teoria do zero. Ela pode (e deve) referenciar a aula de matemática irmã ("já vimos por que isso funciona; aqui é só código").
- Essa separação vale para qualquer área do caderno, não só matemática: uma aula de hardware é só hardware, uma aula de física é só física.

Isso também estrutura o currículo em **pares**: sempre que um conceito tem lado matemático e lado de implementação (gradient descent, autodiff, backpropagation, normalização, atenção, Mixture of Experts), existem duas lições — uma teórica, uma de código — lado a lado no currículo (`curriculum.js`), linkadas por `pairId`.

---

## Regra 3 — Profundidade completa por assunto

Se o título da aula promete um assunto, a aula ensina o assunto **inteiro**, no nível de um curso de verdade sobre aquele tema — nunca uma fatia recortada só para o que a IA usa depois.

Exemplo: uma aula chamada "Derivada" ensina a derivar de verdade — definição via limite, regras de derivação (soma, produto, quociente, potência, cadeia), derivadas de funções comuns (exponencial, logaritmo) — não só o mínimo necessário pra entender gradient descent. O mesmo vale para qualquer trilha (álgebra linear, probabilidade, trigonometria etc.).

Consequência prática: é normal e esperado que um tópico vire **várias aulas** em vez de uma só, se o assunto de verdade tiver várias partes (ex.: "Cálculo" não é uma aula, é uma trilha inteira com Limites, Derivada, Regras de Derivação, Regra da Cadeia, etc., cada uma completa em si mesma).

---

## Regra 4 — Fechamento por citação (regra viva, aplicada durante a redação)

Se o texto de uma aula **cita um conceito pelo nome** — um termo técnico real, não uma analogia solta (ex.: "GPU", "seno", "token", "ponto flutuante" contam; "hospital com médicos" como analogia não conta) — esse conceito precisa ter sua **própria aula** em algum lugar do currículo.

Ao escrever uma aula nova:
1. Releia o texto procurando qualquer termo técnico citado que ainda não tem aula própria em `curriculum.js`.
2. Se encontrar, adicione uma aula para ele (na trilha que fizer sentido — matemática, código, ou uma trilha nova em `fundamentos-complementares/` se for hardware/física/linguística/etc.) antes de considerar a aula atual "fechada".
3. Se um termo for citado apenas de passagem sem necessidade real (ex.: o nome próprio de uma arquitetura famosa, só como curiosidade final), evite introduzi-lo como conceito técnico novo — ou aceite o compromisso de lhe dar uma aula.

Essa auditoria é o que garante que ninguém sai do caderno com um "buraco" de vocabulário não explicado.

---

## Notação formal: sempre no final da fase Expert, sempre desmontada

O bloco `formal` é o destino da fase Expert, nunca o ponto de partida dela. Cada símbolo é explicado linha a linha no `legend`.

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

## Regras para os desenhos (visualizações)

### Lei principal: o desenho deve explicar exatamente o que há no texto

Se o gráfico não tem nada a ver com o que o texto cita visualmente, está errado. Ex.: Função quadrática é usada por causa de sua curva (Grafico DEVE TER LEGENDA EXPLICANDO DO QUE SE TRATA AQUELA CURVA, EM QUAL COR ESTÁ, SETA APONTANDO PRA ELA, ETC. não adianta só colocar a função quadrática desenhada. tem que explicitar o que está escrito no texto.)

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

### O conceito principal aparece nomeado e destacado no gráfico

O título do gráfico não basta. O **próprio elemento que representa o conceito** deve estar rotulado dentro do desenho.

Exemplos:
- Na derivada: a linha tangente deve dizer `"linha tangente = a derivada aqui"`
- No gradiente: a seta deve dizer `"↑ gradiente (sobe mais rápido aqui)"`
- Na função de custo: o mínimo deve dizer `"erro zero — previsão perfeita"`

### Mostre a conta visualmente, não só o resultado

Se o texto diz "inclinação = subiu ÷ andou", o desenho mostra o triângulo com:
- seta horizontal: `"andou 1"`
- seta vertical: `"subiu 2.4"`
- resultado explícito: `"derivada = 2.4"`

Não mostre só o número. Mostre de onde ele vem.

### Labels em português, sempre

Eixos, pontos, setas — tudo em português com contexto.
Não `"x"` — coloque `"pesos"`, `"previsão"`, `"erro"` conforme o conceito.

### Texto de estado em palavras abaixo do gráfico

Todo visualizador interativo tem um texto que descreve em português o que está acontecendo agora:

```
"⬤ subindo — o erro aumenta se você for pra direita"
"⬤ no mínimo — derivada zero, treino para aqui"
```

### Interatividade com propósito

Sliders e botões existem pra deixar o leitor explorar o conceito, não pra enfeitar.
Cada controle tem um label claro: `"arraste o ponto"`, `"animar gradient descent"`.

Visualizações só aparecem em aulas de matemática/teoria (fase Expert), nunca substituem o bloco `code` de uma aula de código.

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

Esta tabela cresce conforme novos termos técnicos entram no caderno (ver Regra 4) — todo termo aqui deve, além de ter uma introdução leiga na aula onde aparece pela primeira vez, também ter sua própria aula em algum lugar do currículo.

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
{ type: 'formal', eq: '...', legend: ['...'] }  // notação acadêmica desmontada — só em aula de matemática
{ type: 'list', items: ['...'] }      // lista com marcadores
{ type: 'divider' }                   // linha separadora
{ type: 'viz', id: '...' }            // visualização interativa — só em aula de matemática
{ type: 'code', code: '...' }         // terminal rodável com tf e print() disponíveis — só em aula de código
```

---

## Checklist antes de publicar uma lição

- [ ] A primeira frase da fase Leigo é uma analogia do mundo real, sem símbolo nenhum?
- [ ] O "porquê" do conceito está explicado antes do "o quê"?
- [ ] A fase Expert cobre o assunto **inteiro** prometido pelo título, não uma fatia recortada?
- [ ] O bloco `formal` tem todos os símbolos explicados no `legend`?
- [ ] Se é aula de matemática: **zero** blocos `code`?
- [ ] Se é aula de código: nenhuma teoria nova sendo introduzida, só implementação do que a aula-irmã já ensinou?
- [ ] O desenho (se houver) mostra o conceito visualmente, com labels em português e texto de estado?
- [ ] Todo termo técnico citado no texto já tem (ou ganhou agora) uma aula própria em algum lugar do currículo?
- [ ] Nenhum jargão aparece sem definição prévia?
