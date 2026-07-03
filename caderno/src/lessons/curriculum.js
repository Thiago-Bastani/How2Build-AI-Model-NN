// Fonte única de verdade do currículo: trilhas, aulas, dependências e onde achar o conteúdo.
// Sidebar.jsx e App.jsx derivam tudo daqui — não duplicar essa lista em outro lugar.
//
// kind: 'math' (zero código) | 'code' (só implementação, sem teoria nova) | 'conceitual' (leigo, payoff, sem código)
// pairId: aponta pra aula irmã (math <-> code) do mesmo conceito, quando existir.

export const SECTIONS = [
  { id: 'matematica-base',           label: 'Matemática de Base' },
  { id: 'algebra-linear',            label: 'Álgebra Linear' },
  { id: 'calculo',                   label: 'Cálculo & Otimização' },
  { id: 'probabilidade-estatistica', label: 'Probabilidade & Estatística' },
  { id: 'implementacao',             label: 'Fundamentos de Implementação' },
  { id: 'redes-neurais',             label: 'Redes Neurais — Fundamentos' },
  { id: 'arquiteturas-modernas',     label: 'Arquiteturas Modernas' },
  { id: 'fundamentos-complementares', label: 'Fundamentos Complementares' },
];

export const LESSONS = [
  // ── Trilha 1 — Matemática de Base ────────────────────────────────────────
  { id: 'variaveis-expressoes',        sectionId: 'matematica-base', title: 'Variáveis e Expressões',              kind: 'math', prereqs: [] },
  { id: 'coordenadas-espacos-nd',      sectionId: 'matematica-base', title: 'Coordenadas e Espaços N-Dimensionais', kind: 'math', prereqs: ['variaveis-expressoes'] },
  { id: 'funcoes-maquina',             sectionId: 'matematica-base', title: 'Funções: Entrada, Regra, Saída',      kind: 'math', prereqs: ['variaveis-expressoes', 'coordenadas-espacos-nd'] },
  { id: 'potencias-expoentes-logaritmos', sectionId: 'matematica-base', title: 'Potências, Expoentes e Logaritmos', kind: 'math', prereqs: ['funcoes-maquina'] },
  { id: 'somatorios-notacao-sigma',    sectionId: 'matematica-base', title: 'Somatórios e Notação Sigma',          kind: 'math', prereqs: ['funcoes-maquina'] },
  { id: 'trigonometria-basica',        sectionId: 'matematica-base', title: 'Trigonometria Básica: Seno e Cosseno', kind: 'math', prereqs: ['coordenadas-espacos-nd'] },

  // ── Trilha 2 — Álgebra Linear ─────────────────────────────────────────────
  { id: 'vetores-significado',   sectionId: 'algebra-linear', title: 'Vetores: Listas com Significado',      kind: 'math', prereqs: ['coordenadas-espacos-nd'] },
  { id: 'operacoes-vetores',     sectionId: 'algebra-linear', title: 'Operações com Vetores',                kind: 'math', prereqs: ['vetores-significado'] },
  { id: 'norma-distancia',       sectionId: 'algebra-linear', title: 'Norma e Distância',                    kind: 'math', prereqs: ['operacoes-vetores'] },
  { id: 'matrizes-transformam',  sectionId: 'algebra-linear', title: 'Matrizes: Tabelas que Transformam',    kind: 'math', prereqs: ['vetores-significado'] },
  { id: 'produto-matrizes',      sectionId: 'algebra-linear', title: 'Produto de Matrizes',                  kind: 'math', prereqs: ['matrizes-transformam', 'operacoes-vetores'] },
  { id: 'transposicao-broadcasting', sectionId: 'algebra-linear', title: 'Transposição e Broadcasting',     kind: 'math', prereqs: ['produto-matrizes'] },
  { id: 'tensores-generalizacao', sectionId: 'algebra-linear', title: 'Tensores como Generalização',         kind: 'math', prereqs: ['produto-matrizes', 'transposicao-broadcasting'] },

  // ── Trilha 3 — Cálculo & Otimização ───────────────────────────────────────
  { id: 'funcoes-tipos',          sectionId: 'calculo', title: 'Funções (revisão aplicada)',            kind: 'math', prereqs: ['funcoes-maquina'] },
  { id: 'limites',                sectionId: 'calculo', title: 'Limites',                                kind: 'math', prereqs: ['funcoes-tipos'] },
  { id: 'derivada',               sectionId: 'calculo', title: 'Derivada',                                kind: 'math', prereqs: ['limites'] },
  { id: 'regras-derivacao',       sectionId: 'calculo', title: 'Regras de Derivação',                    kind: 'math', prereqs: ['derivada'] },
  { id: 'regra-da-cadeia',        sectionId: 'calculo', title: 'Regra da Cadeia',                         kind: 'math', prereqs: ['regras-derivacao'] },
  { id: 'derivadas-exponencial-log', sectionId: 'calculo', title: 'Derivadas de Exponencial e Logaritmo', kind: 'math', prereqs: ['regra-da-cadeia', 'potencias-expoentes-logaritmos'] },
  { id: 'derivadas-parciais-gradiente', sectionId: 'calculo', title: 'Derivadas Parciais e Gradiente',    kind: 'math', prereqs: ['regra-da-cadeia', 'vetores-significado'] },
  { id: 'maximos-minimos',        sectionId: 'calculo', title: 'Máximos, Mínimos e Pontos Críticos',      kind: 'math', prereqs: ['regras-derivacao'] },
  { id: 'gradiente-forma-matricial', sectionId: 'calculo', title: 'Gradiente em Forma Matricial',         kind: 'math', prereqs: ['derivadas-parciais-gradiente', 'produto-matrizes'] },
  { id: 'gradient-descent-algoritmo', sectionId: 'calculo', title: 'Gradient Descent — o Algoritmo Completo', kind: 'math', prereqs: ['maximos-minimos', 'gradiente-forma-matricial'], pairId: 'gradient-descent-pratica' },

  // ── Trilha 4 — Probabilidade & Estatística ────────────────────────────────
  { id: 'o-que-e-probabilidade',       sectionId: 'probabilidade-estatistica', title: 'O que é Probabilidade',              kind: 'math', prereqs: ['potencias-expoentes-logaritmos', 'somatorios-notacao-sigma'] },
  { id: 'variavel-aleatoria-distribuicoes', sectionId: 'probabilidade-estatistica', title: 'Variável Aleatória e Distribuições', kind: 'math', prereqs: ['o-que-e-probabilidade'] },
  { id: 'media-variancia-desvio',      sectionId: 'probabilidade-estatistica', title: 'Média, Variância e Desvio-Padrão',   kind: 'math', prereqs: ['somatorios-notacao-sigma'] },
  { id: 'entropia-entropia-cruzada',   sectionId: 'probabilidade-estatistica', title: 'Entropia e Entropia Cruzada',        kind: 'math', prereqs: ['variavel-aleatoria-distribuicoes', 'potencias-expoentes-logaritmos'] },
  { id: 'softmax-matematica',          sectionId: 'probabilidade-estatistica', title: 'Softmax',                             kind: 'math', prereqs: ['entropia-entropia-cruzada'] },

  // ── Trilha 5 — Fundamentos de Implementação (código) ──────────────────────
  { id: 'tensores-codigo',        sectionId: 'implementacao', title: 'Tensores em Código',                kind: 'code', prereqs: ['tensores-generalizacao'] },
  { id: 'autodiff-implementado',  sectionId: 'implementacao', title: 'Autodiff: Derivada Automática',     kind: 'code', prereqs: ['tensores-codigo', 'derivadas-parciais-gradiente'], pairId: 'derivadas-parciais-gradiente' },
  { id: 'gradient-descent-pratica', sectionId: 'implementacao', title: 'Gradient Descent na Prática',     kind: 'code', prereqs: ['autodiff-implementado'], pairId: 'gradient-descent-algoritmo' },
  { id: 'tokenizacao-codigo',     sectionId: 'implementacao', title: 'Tokenização',                       kind: 'code', prereqs: ['tensores-codigo'] },
  { id: 'preparar-dados',         sectionId: 'implementacao', title: 'Preparar Dados: Normalização, One-Hot, Split', kind: 'code', prereqs: ['tensores-codigo', 'media-variancia-desvio'], pairId: 'media-variancia-desvio' },

  // ── Trilha 6 — Redes Neurais — Fundamentos ────────────────────────────────
  { id: 'perceptron',              sectionId: 'redes-neurais', title: 'Um Neurônio Sozinho (Perceptron)',   kind: 'math', prereqs: ['produto-matrizes'] },
  { id: 'perceptron-codigo',       sectionId: 'redes-neurais', title: 'Perceptron Implementado',            kind: 'code', prereqs: ['perceptron', 'tensores-codigo'], pairId: 'perceptron' },
  { id: 'funcoes-ativacao',        sectionId: 'redes-neurais', title: 'Funções de Ativação',                kind: 'math', prereqs: ['perceptron', 'derivadas-exponencial-log'] },
  { id: 'funcoes-ativacao-codigo', sectionId: 'redes-neurais', title: 'Funções de Ativação Implementadas',  kind: 'code', prereqs: ['funcoes-ativacao', 'perceptron-codigo'], pairId: 'funcoes-ativacao' },
  { id: 'redes-densas-mlp',        sectionId: 'redes-neurais', title: 'Camadas e Redes Densas (MLP)',       kind: 'math', prereqs: ['funcoes-ativacao', 'produto-matrizes'] },
  { id: 'mlp-codigo',              sectionId: 'redes-neurais', title: 'MLP Implementado',                   kind: 'code', prereqs: ['redes-densas-mlp', 'funcoes-ativacao-codigo'], pairId: 'redes-densas-mlp' },
  { id: 'funcao-custo-loss',       sectionId: 'redes-neurais', title: 'Função de Custo (Loss)',              kind: 'math', prereqs: ['redes-densas-mlp', 'entropia-entropia-cruzada'] },
  { id: 'backpropagation',         sectionId: 'redes-neurais', title: 'Backpropagation',                    kind: 'math', prereqs: ['regra-da-cadeia', 'funcao-custo-loss'] },
  { id: 'backpropagation-autodiff', sectionId: 'redes-neurais', title: 'Backpropagation via Autodiff',      kind: 'code', prereqs: ['backpropagation', 'autodiff-implementado'], pairId: 'backpropagation' },
  { id: 'hiperparametros-treino',  sectionId: 'redes-neurais', title: 'Epoch, Batch e Overfitting',         kind: 'math', prereqs: ['funcao-custo-loss', 'preparar-dados', 'gradient-descent-algoritmo'] },
  { id: 'treinar-modelo-completo', sectionId: 'redes-neurais', title: 'Treinando um Modelo Completo',       kind: 'code', prereqs: ['backpropagation-autodiff', 'mlp-codigo', 'hiperparametros-treino'], pairId: 'hiperparametros-treino' },
  { id: 'limites-redes-densas',    sectionId: 'redes-neurais', title: 'Por que Redes Densas Não Bastam para Tudo', kind: 'conceitual', prereqs: ['treinar-modelo-completo'] },

  // ── Trilha 7 — Arquiteturas Modernas ──────────────────────────────────────
  { id: 'embeddings',              sectionId: 'arquiteturas-modernas', title: 'Representando Palavras como Números: Embeddings', kind: 'conceitual', prereqs: ['tokenizacao-codigo', 'norma-distancia', 'coordenadas-espacos-nd'] },
  { id: 'sequencias-posicao',      sectionId: 'arquiteturas-modernas', title: 'Sequências e o Problema da Ordem',   kind: 'math', prereqs: ['embeddings', 'trigonometria-basica'] },
  { id: 'atencao',                 sectionId: 'arquiteturas-modernas', title: 'Atenção',                            kind: 'math', prereqs: ['operacoes-vetores', 'softmax-matematica', 'sequencias-posicao'] },
  { id: 'atencao-codigo',          sectionId: 'arquiteturas-modernas', title: 'Atenção Implementada',               kind: 'code', prereqs: ['atencao', 'mlp-codigo'], pairId: 'atencao' },
  { id: 'multi-head-atencao',      sectionId: 'arquiteturas-modernas', title: 'Múltiplas Cabeças de Atenção',       kind: 'math', prereqs: ['atencao'] },
  { id: 'bloco-transformer',       sectionId: 'arquiteturas-modernas', title: 'O Bloco Transformer',                kind: 'conceitual', prereqs: ['multi-head-atencao', 'redes-densas-mlp', 'backpropagation'] },
  { id: 'transformer-codigo',      sectionId: 'arquiteturas-modernas', title: 'Transformer Implementado',           kind: 'code', prereqs: ['bloco-transformer', 'atencao-codigo'], pairId: 'bloco-transformer' },
  { id: 'mixture-of-experts',      sectionId: 'arquiteturas-modernas', title: 'Mixture of Experts',                 kind: 'conceitual', prereqs: ['bloco-transformer', 'redes-densas-mlp', 'funcao-custo-loss'] },
  { id: 'mixture-of-experts-codigo', sectionId: 'arquiteturas-modernas', title: 'Mixture of Experts Implementado',  kind: 'code', prereqs: ['mixture-of-experts', 'transformer-codigo'], pairId: 'mixture-of-experts' },

  // ── Trilha 8 — Fundamentos Complementares (dinâmica, hoje vazia) ──────────
  // Só populada se a auditoria de citação (LESSON_GUIDE.md, Regra 4) exigir uma
  // aula fora de matemática/IA (ex: hardware/GPU, ponto flutuante). Não inventar
  // aulas aqui especulativamente.
];

const modules = import.meta.glob('./**/*.js', { eager: true });

function findModule(sectionId, id) {
  const entry = Object.entries(modules).find(([path]) => {
    if (!path.includes(`/${sectionId}/`)) return false;
    const file = path.split('/').pop().replace(/\.js$/, '');
    const slug = file.replace(/^\d+-/, '');
    return slug === id;
  });
  return entry ? entry[1] : null;
}

export function getLessonMeta(id) {
  return LESSONS.find(l => l.id === id) || null;
}

export function getLessonBlocks(id) {
  const meta = getLessonMeta(id);
  if (!meta) return null;
  const mod = findModule(meta.sectionId, id);
  if (!mod) return null;
  // cada arquivo de lição exporta `blocks` (convenção única, independente do nome da variável)
  return mod.blocks || Object.values(mod)[0] || null;
}

export function getSections() {
  return SECTIONS.map(section => ({
    ...section,
    items: LESSONS.filter(l => l.sectionId === section.id),
  }));
}

export function getFlatOrder() {
  return LESSONS.map(l => l.id);
}

export function getAdjacent(id) {
  const order = getFlatOrder();
  const idx = order.indexOf(id);
  return {
    prev: idx > 0 ? getLessonMeta(order[idx - 1]) : null,
    next: idx >= 0 && idx < order.length - 1 ? getLessonMeta(order[idx + 1]) : null,
  };
}

const VISITED_KEY = 'caderno:aulas-visitadas';

function readVisited() {
  try {
    return new Set(JSON.parse(localStorage.getItem(VISITED_KEY) || '[]'));
  } catch {
    return new Set();
  }
}

export function wasVisited(id) {
  return readVisited().has(id);
}

export function markVisited(id) {
  const visited = readVisited();
  if (visited.has(id)) return;
  visited.add(id);
  try {
    localStorage.setItem(VISITED_KEY, JSON.stringify([...visited]));
  } catch {
    // localStorage indisponível (ex: modo privado) — progresso simplesmente não persiste
  }
}
