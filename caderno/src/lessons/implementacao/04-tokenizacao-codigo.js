export const blocks = [
  { type: 'h1', text: 'Tokenização' },
  { type: 'p', text: 'Tudo que você viu até aqui trabalha com números — tensores, gradientes, pesos. Mas texto não é número: frases têm tamanhos diferentes, palavras diferentes, e o computador só sabe processar números. Antes de qualquer rede neural conseguir ler uma frase, ela precisa ser quebrada em pedaços discretos e cada pedaço precisa virar um número.' },

  { type: 'h2', text: 'Quebrando a frase em pedaços (tokens)' },
  { type: 'p', text: 'A forma mais simples de fazer isso é separar por espaços e isolar a pontuação como um pedaço à parte.' },
  { type: 'code', code:
`function tokenizar(frase) {
  return frase
    .toLowerCase()
    .replace(/([.,!?])/g, ' $1 ') // separa pontuação com espaços ao redor
    .trim()
    .split(/\\s+/); // quebra por espaço(s)
}

const frase = 'Redes neurais aprendem padrões, não decoram respostas!';
const tokens = tokenizar(frase);

print('frase original:', frase);
print('tokens:', JSON.stringify(tokens));` },

  { type: 'h2', text: 'Vocabulário: cada token único vira um número' },
  { type: 'p', text: 'Um vocabulário é só um dicionário que mapeia cada token único que já apareceu pra um número inteiro fixo — a "tabela de tradução" entre palavra e número que a rede neural vai enxergar.' },
  { type: 'code', code:
`function construirVocabulario(listaDeTokens) {
  const vocabulario = {};
  let proximoIndice = 0;
  for (const token of listaDeTokens) {
    if (!(token in vocabulario)) {
      vocabulario[token] = proximoIndice;
      proximoIndice++;
    }
  }
  return vocabulario;
}

const vocab = construirVocabulario(tokens);
print('vocabulário (token → índice):');
print(JSON.stringify(vocab, null, 2));` },

  { type: 'h2', text: 'Codificando e decodificando uma frase inteira' },
  { type: 'p', text: 'Com o vocabulário pronto, qualquer frase feita desses tokens vira uma lista de números — e dá pra voltar do número pra palavra fazendo o caminho inverso.' },
  { type: 'code', code:
`function codificar(listaDeTokens, vocabulario) {
  return listaDeTokens.map(t => vocabulario[t]);
}

function decodificar(listaDeIndices, vocabulario) {
  // inverte o dicionário: índice → token
  const indiceParaToken = Object.fromEntries(
    Object.entries(vocabulario).map(([token, indice]) => [indice, token])
  );
  return listaDeIndices.map(i => indiceParaToken[i]);
}

const codificada = codificar(tokens, vocab);
print('frase codificada (números):', JSON.stringify(codificada));

const decodificada = decodificar(codificada, vocab);
print('frase decodificada de volta:', decodificada.join(' '));` },

  { type: 'h2', text: 'O que acontece com uma palavra nova' },
  { type: 'p', text: 'Um vocabulário só conhece os tokens que viu ao ser construído — uma palavra fora dele não tem índice, exatamente o tipo de situação que um vocabulário de verdade precisa prever (geralmente com um índice reservado pra "desconhecido").' },
  { type: 'code', code:
`const fraseNova = tokenizar('redes neurais generalizam bem');
print('tokens da frase nova:', JSON.stringify(fraseNova));

fraseNova.forEach(token => {
  const indice = vocab[token];
  print(\`"\${token}" → \${indice !== undefined ? indice : 'DESCONHECIDO (fora do vocabulário)'}\`);
});` },

  { type: 'divider' },
  { type: 'note', text: 'Tokenização real (usada em modelos de linguagem grandes) é mais sofisticada — quebra em pedaços de sub-palavra em vez de palavras inteiras — mas o problema e a solução de fundo são exatamente esses: quebrar texto em pedaços discretos e mapear cada pedaço pra um número via um vocabulário. Isso é a base sobre a qual Embeddings vai construir.' },
];
