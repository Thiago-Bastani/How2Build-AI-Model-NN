import { useRef, useEffect, useState } from 'react';
import Markdown from 'react-markdown';

export default function Cell({ cell, onRun, onChange, onDelete, onAdd, index, total }) {
  const taRef = useRef(null);
  const [editingMd, setEditingMd] = useState(cell.content === '');

  useEffect(() => {
    autoResize(taRef.current);
  }, [cell.content]);

  function autoResize(el) {
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  }

  function handleKeyDown(e) {
    if ((e.shiftKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      onRun(cell.id);
    }
  }

  const isCode = cell.type === 'code';

  return (
    <div className={`cell ${cell.type} ${cell.running ? 'running' : ''}`}>
      <div className="cell-gutter">
        <span className="cell-index">[{isCode ? (cell.hasRun ? index + 1 : ' ') : 'M'}]</span>
        {isCode && (
          <button
            className="run-btn"
            onClick={() => onRun(cell.id)}
            title="Executar (Shift+Enter)"
            disabled={cell.running}
          >
            {cell.running ? '◌' : '▶'}
          </button>
        )}
      </div>

      <div className="cell-body">
        {isCode ? (
          <textarea
            ref={taRef}
            className="cell-editor"
            value={cell.content}
            onChange={e => { onChange(cell.id, e.target.value); autoResize(e.target); }}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            placeholder="// escreva código aqui — tf e print() estão disponíveis"
            rows={1}
          />
        ) : (
          editingMd ? (
            <textarea
              ref={taRef}
              className="cell-editor md-editor"
              value={cell.content}
              onChange={e => { onChange(cell.id, e.target.value); autoResize(e.target); }}
              onBlur={() => cell.content.trim() && setEditingMd(false)}
              spellCheck={false}
              placeholder="# Markdown&#10;Escreva anotações, fórmulas, explicações..."
              rows={3}
              autoFocus
            />
          ) : (
            <div
              className="md-preview"
              onClick={() => setEditingMd(true)}
              title="Clique para editar"
            >
              <Markdown>{cell.content}</Markdown>
            </div>
          )
        )}

        {cell.output && (
          <div className={`cell-output ${cell.output.error ? 'has-error' : ''}`}>
            {cell.output.outputs.map((o, i) => (
              <pre key={i} className="output-line">{o.text}</pre>
            ))}
            {cell.output.error && (
              <pre className="output-error">{cell.output.error}</pre>
            )}
            {cell.output.outputs.length === 0 && !cell.output.error && (
              <span className="output-empty">✓ executado sem saída</span>
            )}
          </div>
        )}
      </div>

      <div className="cell-actions">
        <button onClick={() => onAdd('code', cell.id)} title="Adicionar célula de código abaixo">+ código</button>
        <button onClick={() => onAdd('markdown', cell.id)} title="Adicionar célula markdown abaixo">+ nota</button>
        {total > 1 && (
          <button onClick={() => onDelete(cell.id)} className="delete-btn" title="Deletar célula">✕</button>
        )}
      </div>
    </div>
  );
}
