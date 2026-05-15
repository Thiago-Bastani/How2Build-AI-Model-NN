import CodeBlock from './CodeBlock';

// Transforma **negrito** e `codigo` em JSX
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

export default function Lesson({ blocks }) {
  return (
    <article className="lesson">
      {blocks.map((block, i) => <Block key={i} block={block} />)}
    </article>
  );
}
