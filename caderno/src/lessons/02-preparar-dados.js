export const prepararDados = [
  { type: 'h1', text: 'Preparação de Dados' },
  { type: 'p', text: 'Imagina que você recebe uma lista com o desempenho de corredores, mas cada um usou uma unidade diferente: uns mediram em km/h, outros em minutos por milha, um mediu em "passos por segundo". Você tenta comparar e não consegue — os números não falam a mesma língua. Uma rede neural tem exatamente esse problema quando os dados chegam crus.' },
  { type: 'p', text: 'Preparar os dados é o trabalho de colocar tudo na mesma língua antes de jogar na rede. A literatura chama isso de **pré-processamento** — mas o conceito é simples: limpar, padronizar e organizar. Essa etapa costuma fazer mais diferença no resultado final do que a arquitetura da rede.' },

  // ── Por que preparar ──────────────────────────────────────────────────────
  { type: 'h2', text: 'Por que isso importa?' },
  { type: 'p', text: 'Imagine um dataset de casas com estas features:' },
  { type: 'list', items: [
    '`quartos`: valores de 1 a 5',
    '`preco`: valores de 150.000 a 750.000',
    '`tem_piscina`: "sim" ou "não" (texto!)',
  ]},
  { type: 'p', text: 'Se jogar esses dados crus na rede, ela vai achar que `preco` é **150.000x mais importante** que `quartos` só por causa da escala. E `tem_piscina` ela nem consegue processar — é texto.' },
  { type: 'warn', text: '**Regra de ouro:** features em escalas muito diferentes travam o aprendizado. A rede fica travada ajustando pesos pra compensar a diferença de escala em vez de aprender padrões reais.' },

  // ── Normalização ──────────────────────────────────────────────────────────
  { type: 'h2', text: 'Normalização Min-Max' },
  { type: 'p', text: 'Espreme todos os valores pra ficar entre **0 e 1**, mantendo as proporções.' },
  { type: 'formula', text: 'x_norm = (x - min) / (max - min)' },
  { type: 'p', text: 'Quando usar: quando você não conhece a distribuição dos dados, ou quando quer garantir o intervalo [0, 1] — ex: pixels de imagem, probabilidades.' },
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

  // ── Padronização ──────────────────────────────────────────────────────────
  { type: 'h2', text: 'Padronização Z-score' },
  { type: 'p', text: 'Centraliza os dados na **média 0** e escala pelo **desvio padrão**. O resultado pode ir além de [0,1].' },
  { type: 'formula', text: 'x_pad = (x - média) / desvio_padrão' },
  { type: 'p', text: 'Quando usar: quando os dados têm distribuição aproximadamente normal, ou quando há **outliers** — o z-score os "encolhe" sem descartá-los.' },
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

  { type: 'note', text: '**Min-Max vs Z-score:** Use Min-Max quando o intervalo importa (imagens, porcentagens). Use Z-score quando há outliers ou quando a distribuição é aproximadamente normal. Na dúvida, teste os dois.' },

  // ── One-Hot ───────────────────────────────────────────────────────────────
  { type: 'h2', text: 'Encoding de Categorias (One-Hot)' },
  { type: 'p', text: 'Redes neurais só entendem números. Texto precisa virar número — mas do jeito certo.' },
  { type: 'p', text: 'A tentação é fazer `nao=0, sim=1`. Isso funciona pra categorias **ordinais** (pequeno < médio < grande). Mas pra categorias sem ordem (cidades, cores, marcas), isso cria uma hierarquia falsa que confunde a rede.' },
  { type: 'p', text: '**One-Hot Encoding** cria uma coluna binária pra cada categoria possível:' },
  { type: 'formula', text: '"nao" → [1, 0]    "sim" → [0, 1]' },
  { type: 'code', code:
`// Exemplo com 3 cidades
const cidades    = ['SP', 'RJ', 'BH', 'SP', 'BH'];
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

// SP = [1,0,0]  RJ = [0,1,0]  BH = [0,0,1]
// Nenhuma cidade é "maior" que outra matematicamente` },

  // ── Montando o dataset ────────────────────────────────────────────────────
  { type: 'h2', text: 'Montando a Matriz de Features (X)' },
  { type: 'p', text: 'Depois de processar cada feature individualmente, você as combina numa **matriz X** onde:' },
  { type: 'list', items: [
    'Cada **linha** = uma amostra (ex: uma casa)',
    'Cada **coluna** = uma feature (ex: quartos, área, tem_piscina_nao, tem_piscina_sim)',
  ]},
  { type: 'code', code:
`// Dataset de casas
const raw = [
  { quartos: 1, area: 45,  piscina: 'nao', preco: 150000 },
  { quartos: 2, area: 70,  piscina: 'nao', preco: 300000 },
  { quartos: 3, area: 90,  piscina: 'sim', preco: 450000 },
  { quartos: 4, area: 110, piscina: 'sim', preco: 600000 },
  { quartos: 5, area: 200, piscina: 'nao', preco: 750000 },
];

// Normalização min-max de uma coluna
function normalizar(vals) {
  const min = Math.min(...vals), max = Math.max(...vals);
  return { vals: vals.map(v => (v - min) / (max - min)), min, max };
}

// Processa cada feature
const { vals: quartos_n }  = normalizar(raw.map(r => r.quartos));
const { vals: area_n }     = normalizar(raw.map(r => r.area));
const { vals: preco_n }    = normalizar(raw.map(r => r.preco));

const piscina_enc = raw.map(r => r.piscina === 'nao' ? [1,0] : [0,1]);

// Monta X e Y
const X = raw.map((_, i) => [
  quartos_n[i],
  area_n[i],
  ...piscina_enc[i],
]);
const Y = preco_n;

print('Matriz X (features):');
print('[quartos, area, sem_piscina, com_piscina]');
X.forEach((row, i) => {
  print(\`amostra \${i}: [\${row.map(v=>v.toFixed(2)).join(', ')}]\`);
});
print('\\nY (preços normalizados):');
print(Y.map(v => v.toFixed(2)).join(', '));` },

  // ── Split ─────────────────────────────────────────────────────────────────
  { type: 'h2', text: 'Split: Train / Validation / Test' },
  { type: 'p', text: 'O modelo **nunca pode ver** os dados de teste durante o treino. Se ele "estudar" pelo gabarito, a nota final não significa nada.' },
  { type: 'list', items: [
    '**Train (~70%)** — o modelo aprende com esses dados',
    '**Validation (~15%)** — você monitora o erro durante o treino. Se o erro de train cai mas o de validation sobe → **overfitting**',
    '**Test (~15%)** — avaliação final. Olha só uma vez, no fim. Se você usar o test pra tomar decisões, você o contamina.',
  ]},
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

// Simulando com 20 amostras
const X_fake = Array.from({length: 20}, (_, i) => [i]);
const Y_fake = Array.from({length: 20}, (_, i) => i * 2);

const { train, val, test } = split(X_fake, Y_fake);

print('total:', X_fake.length);
print('train:', train.X.length, 'amostras  (' + Math.round(train.X.length/X_fake.length*100) + '%)');
print('val:  ', val.X.length,   'amostras  (' + Math.round(val.X.length/X_fake.length*100)   + '%)');
print('test: ', test.X.length,  'amostras  (' + Math.round(test.X.length/X_fake.length*100)  + '%)');` },

  { type: 'divider' },

  { type: 'h2', text: 'Pipeline Completo' },
  { type: 'p', text: 'Toda vez que você receber um dataset novo, o fluxo é sempre esse:' },
  { type: 'list', items: [
    '**Explorar** — quantas amostras? Tem valores faltando? Quais as distribuições?',
    '**Tratar nulos** — remover a linha, ou preencher com a média/moda',
    '**Encode de categorias** — one-hot pra categorias sem ordem',
    '**Normalizar/padronizar** — features numéricas na mesma escala',
    '**Montar X e Y** — matriz de features e vetor de labels',
    '**Split** — train/val/test',
    '**Salvar os parâmetros** — min, max, média, desvio padrão dos dados de treino',
  ]},
  { type: 'note', text: 'O item 7 é o mais esquecido. Quando seu modelo for pra produção e chegar um dado novo, você precisa normalizá-lo com os **mesmos parâmetros** do treino — não recalcular com o dado novo.' },
];
