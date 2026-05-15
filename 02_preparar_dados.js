const tf = require('@tensorflow/tfjs');

// ─── POR QUE PREPARAR OS DADOS? ───────────────────────────────────────────────
// Redes neurais são sensíveis à escala dos números.
// Se uma feature vai de 0 a 1 e outra vai de 0 a 1.000.000,
// a rede vai "achar" que a segunda é muito mais importante — e vai errar.
//
// Imagine um dataset de casas:
//   quartos:      [1, 2, 3, 4, 5]
//   preco_reais:  [150000, 300000, 450000, 600000, 750000]
//   tem_piscina:  ['nao', 'nao', 'sim', 'sim', 'nao']   ← texto, precisa virar número

const dados = {
  quartos:     [1, 2, 3, 4, 5],
  preco:       [150000, 300000, 450000, 600000, 750000],
  tem_piscina: ['nao', 'nao', 'sim', 'sim', 'nao'],
  area_m2:     [45, 70, 90, 110, 200],  // note o 200 — outlier
};

// ─── 1. NORMALIZAÇÃO (Min-Max) ────────────────────────────────────────────────
// Espreme todos os valores pra ficar entre 0 e 1.
// Fórmula: (x - min) / (max - min)
//
// Quando usar: quando você não sabe a distribuição dos dados, ou quer garantir [0,1]

function normalizar(array) {
  const t = tf.tensor1d(array);
  const min = t.min();
  const max = t.max();
  const normalizado = t.sub(min).div(max.sub(min));
  return { normalizado, min: min.dataSync()[0], max: max.dataSync()[0] };
}

// IMPORTANTE: guarde o min e max dos dados de TREINO.
// Você vai precisar deles pra normalizar dados novos da mesma forma.
const { normalizado: quartos_norm, min: q_min, max: q_max } = normalizar(dados.quartos);

console.log('=== NORMALIZAÇÃO (Min-Max) ===');
console.log('quartos originais: ', dados.quartos);
quartos_norm.print(); // [0, 0.25, 0.5, 0.75, 1]

// Como aplicar em dado novo (ex: casa com 3 quartos):
const novo_dado = (3 - q_min) / (q_max - q_min);
console.log('casa nova com 3 quartos normalizada:', novo_dado); // 0.5

// ─── 2. PADRONIZAÇÃO (Z-score) ────────────────────────────────────────────────
// Centraliza os dados na média e divide pelo desvio padrão.
// Fórmula: (x - média) / desvio_padrão
// Resultado: média = 0, desvio = 1  (pode ir além de [0,1])
//
// Quando usar: quando os dados seguem distribuição normal, ou têm outliers.
// O outlier de 200m² vai puxar menos com z-score do que com min-max.

function padronizar(array) {
  const t = tf.tensor1d(array);
  const media = t.mean();
  const desvio = t.sub(media).square().mean().sqrt(); // desvio padrão
  const padronizado = t.sub(media).div(desvio);
  return { padronizado, media: media.dataSync()[0], desvio: desvio.dataSync()[0] };
}

const { padronizado: area_pad, media: a_media, desvio: a_desvio } = padronizar(dados.area_m2);

console.log('\n=== PADRONIZAÇÃO (Z-score) ===');
console.log('area original:  ', dados.area_m2);
area_pad.print(); // valores centrados em 0, outlier de 200 ainda aparece mas não domina

// ─── 3. ENCODING DE CATEGORIAS ────────────────────────────────────────────────
// Redes neurais só entendem números. Texto precisa virar número.

// ❌ ERRADO: label encoding direto (nao=0, sim=1)
//    Funciona pra variáveis ORDINAIS (pequeno=0, médio=1, grande=2)
//    Mas cria hierarquia falsa onde não existe.

// ✅ CERTO para categorias sem ordem: One-Hot Encoding
//    Cada categoria vira uma coluna binária.
//
//    'nao' → [1, 0]
//    'sim' → [0, 1]
//
//    Pra N categorias você cria N colunas. Ex com 3 cidades:
//    'SP'  → [1, 0, 0]
//    'RJ'  → [0, 1, 0]
//    'BH'  → [0, 0, 1]

function oneHotEncode(array, categorias) {
  return array.map(valor => {
    const vec = new Array(categorias.length).fill(0);
    vec[categorias.indexOf(valor)] = 1;
    return vec;
  });
}

const categorias_piscina = ['nao', 'sim'];
const piscina_encoded = oneHotEncode(dados.tem_piscina, categorias_piscina);

console.log('\n=== ONE-HOT ENCODING ===');
console.log('tem_piscina original:', dados.tem_piscina);
console.log('tem_piscina encoded: ', piscina_encoded);
// [nao, nao, sim, sim, nao]
// → [[1,0],[1,0],[0,1],[0,1],[1,0]]

// ─── 4. MONTAR A MATRIZ DE FEATURES ──────────────────────────────────────────
// Agora juntamos tudo numa matriz onde cada linha = 1 amostra
// e cada coluna = 1 feature.
//
//   [quartos_norm, area_pad, piscina_nao, piscina_sim]

const quartos_array  = quartos_norm.arraySync();
const area_array     = area_pad.arraySync();

const X = quartos_array.map((q, i) => [
  q,
  area_array[i],
  ...piscina_encoded[i],  // spread das colunas de one-hot
]);

// Labels: o que queremos prever (preço normalizado)
const { normalizado: precos_norm } = normalizar(dados.preco);
const Y = precos_norm.arraySync();

console.log('\n=== MATRIZ DE FEATURES (X) ===');
console.log('[quartos_norm, area_pad, sem_piscina, com_piscina]');
X.forEach((linha, i) => {
  console.log(`amostra ${i}:`, linha.map(v => v.toFixed(3)));
});

console.log('\n=== LABELS (Y = preço normalizado) ===');
console.log(Y.map(v => v.toFixed(3)));

// ─── 5. SPLIT: TRAIN / VALIDATION / TEST ─────────────────────────────────────
// Regra de ouro: o modelo NUNCA pode ver os dados de teste durante o treino.
//
//   Train      (~70%): o modelo aprende com esses dados
//   Validation (~15%): você monitora o erro durante o treino (detecta overfitting)
//   Test       (~15%): avaliação final — só olha uma vez, no fim
//
// Por que separar validation de test?
// Se você usar o test pra tomar decisões (ajustar hiperparâmetros),
// você contamina — o modelo indiretamente "viu" o test.

function splitDataset(X, Y, trainRatio = 0.7, valRatio = 0.15) {
  const n = X.length;
  const trainEnd = Math.floor(n * trainRatio);
  const valEnd   = Math.floor(n * (trainRatio + valRatio));

  return {
    train: { X: X.slice(0, trainEnd),   Y: Y.slice(0, trainEnd) },
    val:   { X: X.slice(trainEnd, valEnd), Y: Y.slice(trainEnd, valEnd) },
    test:  { X: X.slice(valEnd),          Y: Y.slice(valEnd) },
  };
}

// Nota: com apenas 5 amostras o split fica estranho — em projetos reais
// você vai ter centenas ou milhares de amostras.
const { train, val, test } = splitDataset(X, Y);

console.log('\n=== SPLIT TRAIN / VAL / TEST ===');
console.log('total de amostras:', X.length);
console.log('train:', train.X.length, 'amostras');
console.log('val:  ', val.X.length,   'amostras');
console.log('test: ', test.X.length,  'amostras');

// ─── RESUMO: PIPELINE COMPLETO ────────────────────────────────────────────────
//
//   1. Carrega dados brutos
//   2. Trata valores ausentes (null/NaN) — substituir pela média, ou remover a linha
//   3. Encode de categorias (one-hot)
//   4. Normaliza / padroniza features numéricas
//   5. Monta matriz X e vetor Y
//   6. Split em train/val/test
//   7. Salva os parâmetros de normalização (min, max, média, desvio)
//      → você vai precisar deles pra processar dados novos na mesma escala
//
// O próximo passo é jogar esse X e Y numa rede neural e treinar.
