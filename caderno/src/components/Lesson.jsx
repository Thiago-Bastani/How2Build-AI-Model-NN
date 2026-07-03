import CodeBlock from './CodeBlock';
import FuncoesCustoViz from './viz/FuncoesCustoViz';
import DerivadaViz     from './viz/DerivadaViz';
import GradienteViz    from './viz/GradienteViz';
import MatrizViz       from './viz/MatrizViz';
import CadeiaViz       from './viz/CadeiaViz';
import DerivadaCurvasViz from './viz/DerivadaCurvasViz';
import CoordenadasViz from './viz/CoordenadasViz';
import { getLessonBlocks, getLessonMeta, getAdjacent, markVisited } from '../lessons/curriculum';

const VIZ_MAP = {
  'funcoes-custo':     FuncoesCustoViz,
  'derivada':          DerivadaViz,
  'derivada-curvas':   DerivadaCurvasViz,
  'gradiente':         GradienteViz,
  'produto-matriz':    MatrizViz,
  'cadeia':            CadeiaViz,
  'coordenadas':       CoordenadasViz,
};

function InlineText({ text }) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith('`') && p.endsWith('`'))   return <code key={i} className="ic">{p.slice(1,-1)}</code>;
    if (p.startsWith('**') && p.endsWith('**')) return <strong key={i}>{p.slice(2,-2)}</strong>;
    return p;
  });
}

function Block({ block }) {
  switch (block.type) {
    case 'h1':      return <h1 className="l-h1"><InlineText text={block.text} /></h1>;
    case 'h2':      return <h2 className="l-h2"><InlineText text={block.text} /></h2>;
    case 'h3':      return <h3 className="l-h3"><InlineText text={block.text} /></h3>;
    case 'p':       return <p  className="l-p" ><InlineText text={block.text} /></p>;
    case 'note':    return <div className="l-note"><InlineText text={block.text} /></div>;
    case 'warn':    return <div className="l-warn"><InlineText text={block.text} /></div>;
    case 'formula': return <div className="l-formula"><code>{block.text}</code></div>;
    case 'formal':  return (
      <div className="l-formal">
        <span className="l-formal-label">notação formal</span>
        <code className="l-formal-eq">{block.eq}</code>
        {block.legend && (
          <ul className="l-formal-legend">
            {block.legend.map((item, i) => <li key={i}><InlineText text={item} /></li>)}
          </ul>
        )}
      </div>
    );
    case 'list':    return (
      <ul className="l-list">
        {block.items.map((item, i) => <li key={i}><InlineText text={item} /></li>)}
      </ul>
    );
    case 'divider': return <hr className="l-divider" />;
    case 'code':    return <CodeBlock initial={block.code} />;
    default:        return null;
  }
}

// Cada segmento: blocos que ficam ao lado do viz que os acompanha.
// O viz aparece à direita do texto que vem ANTES dele (quem o citou).
function segmentBlocks(blocks) {
  const segments = [];
  let current = [];
  for (const block of blocks) {
    if (block.type === 'viz') {
      segments.push({ blocks: current, vizId: block.id });
      current = [];
    } else {
      current.push(block);
    }
  }
  if (current.length > 0) segments.push({ blocks: current, vizId: null });
  return segments;
}

function PrereqBanner({ meta, onNavigate }) {
  if (meta.prereqs.length === 0) return null;
  return (
    <div className="l-note prereq-banner">
      Esta aula constrói sobre:{' '}
      {meta.prereqs.map((id, i) => {
        const m = getLessonMeta(id);
        return (
          <span key={id}>
            <button className="prereq-link" onClick={() => onNavigate(id)}>{m ? m.title : id}</button>
            {i < meta.prereqs.length - 1 ? ', ' : ''}
          </span>
        );
      })}
      .
    </div>
  );
}

function NavFooter({ meta, onNavigate }) {
  const { prev, next } = getAdjacent(meta.id);
  return (
    <div className="lesson-nav-footer">
      {prev ? (
        <button className="lesson-nav-btn" onClick={() => onNavigate(prev.id)}>← {prev.title}</button>
      ) : <span />}
      {next ? (
        <button className="lesson-nav-btn lesson-nav-btn--next" onClick={() => onNavigate(next.id)}>{next.title} →</button>
      ) : <span />}
    </div>
  );
}

export default function Lesson({ lessonId, onNavigate }) {
  const meta = getLessonMeta(lessonId);
  const blocks = getLessonBlocks(lessonId);

  if (!meta) return null;

  markVisited(lessonId);

  if (!blocks) {
    return (
      <div className="lesson-outer">
        <article className="lesson">
          <h1 className="l-h1">{meta.title}</h1>
          <div className="l-note">Esta aula ainda está em construção — faz parte do roadmap do currículo, mas o conteúdo ainda não foi escrito.</div>
        </article>
        <NavFooter meta={meta} onNavigate={onNavigate} />
      </div>
    );
  }

  const segments = segmentBlocks(blocks);

  return (
    <div className="lesson-outer">
      <PrereqBanner meta={meta} onNavigate={onNavigate} />
      {segments.map((seg, i) => {
        const VizComp = seg.vizId ? VIZ_MAP[seg.vizId] : null;
        return (
          <div key={i} className={VizComp ? 'lesson-row' : 'lesson-row lesson-row--full'}>
            <article className="lesson">
              {seg.blocks.map((b, j) => <Block key={j} block={b} />)}
            </article>
            {VizComp && (
              <div className="lesson-viz-col">
                <VizComp />
              </div>
            )}
          </div>
        );
      })}
      <NavFooter meta={meta} onNavigate={onNavigate} />
    </div>
  );
}
