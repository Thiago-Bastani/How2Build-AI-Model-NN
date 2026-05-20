import CodeBlock from './CodeBlock';
import FuncoesCustoViz from './viz/FuncoesCustoViz';
import DerivadaViz     from './viz/DerivadaViz';
import GradienteViz    from './viz/GradienteViz';
import MatrizViz       from './viz/MatrizViz';
import CadeiaViz       from './viz/CadeiaViz';
import DerivadaCurvasViz from './viz/DerivadaCurvasViz';

const VIZ_MAP = {
  'funcoes-custo':     FuncoesCustoViz,
  'derivada':          DerivadaViz,
  'derivada-curvas':   DerivadaCurvasViz,
  'gradiente':         GradienteViz,
  'produto-matriz':    MatrizViz,
  'cadeia':            CadeiaViz,
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
      // fecha o segmento atual junto com este viz
      segments.push({ blocks: current, vizId: block.id });
      current = [];
    } else {
      current.push(block);
    }
  }
  // texto restante após o último viz (ou tudo se não houver viz)
  if (current.length > 0) segments.push({ blocks: current, vizId: null });
  return segments;
}

export default function Lesson({ blocks }) {
  const segments = segmentBlocks(blocks);

  return (
    <div className="lesson-outer">
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
    </div>
  );
}
