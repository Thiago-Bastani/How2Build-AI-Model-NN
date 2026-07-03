export const blocks = [
  { type: 'h1', text: 'Preparar Dados: Normalização, One-Hot, Split' },
  { type: 'p', text: 'Você já viu, na aula de Média/Variância/Desvio-Padrão, por que colocar dados em escalas muito diferentes trava o aprendizado. Aqui é o "como fazer isso" em código, de verdade, com tf.js.' },

  { type: 'h2', text: 'Normalização Min-Max' },
  { type: 'p', text: 'Espreme todos os valores pra ficar entre 0 e 1: `x_norm = (x − min) / (max − min)`.' },
  { type: 'code', code:
`const quartos = tf.tensor1d([1, 2, 3, 4, 5]);

const min = quartos.min();
const max = quartos.max();
const normalizado = quartos.sub(min).div(max.sub(min));

print('original: '); quartos.print();
print('normalizado (0 a 1):'); normalizado.print();

// ⚠️ IMPORTANTE: guarde o min e max dos dados de TREINO
// Quando chegar um dado novo, normalize com os MESMOS valores
const minVal = min.dataSync()[0];
const maxVal = max.dataSync()[0];
const casa_nova = (3 - minVal) / (maxVal - minVal);
print('\\ncasa com 3 quartos normalizada:', casa_nova); // 0.5` },

  { type: 'h2', text: 'Padronização Z-score' },
  { type: 'p', text: 'Centraliza na média 0 e escala pelo desvio padrão: `x_pad = (x − média) / desvio`. Útil quando há outliers, que o min-max deixaria dominar a escala inteira.' },
  { type: 'code', code:
`// Note o 200 — um outlier que distorceria o min-max
const areas = tf.tensor1d([45, 70, 90, 110, 200]);

const media  = areas.mean();
const desvio = areas.sub(media).square().mean().sqrt();
const padronizado = areas.sub(media).div(desvio);

print('original:    '); areas.print();
print('media:', media.dataSync()[0].toFixed(1));
print('desvio:', desvio.dataSync()[0].toFixed(1));
print('\\npadronizado (media=0, desvio=1):');
padronizado.print();
// O 200 vira ~1.83 em vez de dominar tudo como 1.0 no min-max` },

  { type: 'h2', text: 'One-Hot Encoding' },
  { type: 'p', text: 'Categorias sem ordem (cidades, cores) viram uma coluna binária por categoria, em vez de um número cru que criaria uma hierarquia falsa.' },
  { type: 'code', code:
`const cidades    = ['SP', 'RJ', 'BH', 'SP', 'BH'];
const categorias = ['SP', 'RJ', 'BH'];

function oneHot(valor, cats) {
  return cats.map(c => c === valor ? 1 : 0);
}

const encoded = cidades.map(c => oneHot(c, categorias));

print('original:', JSON.stringify(cidades));
print('encoded:');
encoded.forEach((row, i) => {
  print(\`  \${cidades[i]} → [\${row.join(', ')}]\`);
});
// SP = [1,0,0]  RJ = [0,1,0]  BH = [0,0,1]` },

  { type: 'h2', text: 'Montando a matriz de features (X) e o vetor de labels (Y)' },
  { type: 'code', code:
`const raw = [
  { quartos: 1, area: 45,  piscina: 'nao', preco: 150000 },
  { quartos: 2, area: 70,  piscina: 'nao', preco: 300000 },
  { quartos: 3, area: 90,  piscina: 'sim', preco: 450000 },
  { quartos: 4, area: 110, piscina: 'sim', preco: 600000 },
  { quartos: 5, area: 200, piscina: 'nao', preco: 750000 },
];

function normalizar(vals) {
  const min = Math.min(...vals), max = Math.max(...vals);
  return { vals: vals.map(v => (v - min) / (max - min)), min, max };
}

const { vals: quartos_n }  = normalizar(raw.map(r => r.quartos));
const { vals: area_n }     = normalizar(raw.map(r => r.area));
const { vals: preco_n }    = normalizar(raw.map(r => r.preco));
const piscina_enc = raw.map(r => r.piscina === 'nao' ? [1,0] : [0,1]);

const X = raw.map((_, i) => [quartos_n[i], area_n[i], ...piscina_enc[i]]);
const Y = preco_n;

print('Matriz X (features): [quartos, area, sem_piscina, com_piscina]');
X.forEach((row, i) => print(\`amostra \${i}: [\${row.map(v=>v.toFixed(2)).join(', ')}]\`));
print('\\nY (preços normalizados):');
print(Y.map(v => v.toFixed(2)).join(', '));` },

  { type: 'h2', text: 'Split: Train / Validation / Test' },
  { type: 'p', text: 'O modelo nunca pode ver os dados de teste durante o treino — senão a nota final não significa nada.' },
  { type: 'code', code:
`function split(X, Y, trainRatio = 0.7, valRatio = 0.15) {
  const n        = X.length;
  const trainEnd = Math.floor(n * trainRatio);
  const valEnd   = Math.floor(n * (trainRatio + valRatio));
  return {
    train: { X: X.slice(0, trainEnd),   Y: Y.slice(0, trainEnd)   },
    val:   { X: X.slice(trainEnd, valEnd), Y: Y.slice(trainEnd, valEnd) },
    test:  { X: X.slice(valEnd),         Y: Y.slice(valEnd)        },
  };
}

const X_fake = Array.from({length: 20}, (_, i) => [i]);
const Y_fake = Array.from({length: 20}, (_, i) => i * 2);
const { train, val, test } = split(X_fake, Y_fake);

print('total:', X_fake.length);
print('train:', train.X.length, 'amostras');
print('val:  ', val.X.length,   'amostras');
print('test: ', test.X.length,  'amostras');` },

  { type: 'divider' },
  { type: 'note', text: 'Pipeline completo: explorar → tratar nulos → one-hot em categorias → normalizar/padronizar → montar X e Y → split → salvar os parâmetros (min/max/média/desvio) do treino, pra normalizar dados novos do mesmo jeito depois.' },
];
