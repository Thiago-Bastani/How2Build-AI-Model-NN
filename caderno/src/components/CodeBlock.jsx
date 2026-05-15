import { useState, useRef, useEffect } from 'react';
import { executeCode } from '../lib/executor';

export default function CodeBlock({ initial }) {
  const [code, setCode]       = useState(initial);
  const [output, setOutput]   = useState(null);
  const [running, setRunning] = useState(false);
  const taRef = useRef(null);

  useEffect(() => { resize(taRef.current); }, [code]);

  function resize(el) {
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  }

  async function run() {
    setRunning(true);
    setOutput(null);
    const result = await executeCode(code);
    setOutput(result);
    setRunning(false);
  }

  function onKeyDown(e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      const s = e.target.selectionStart;
      const v = code.slice(0, s) + '  ' + code.slice(e.target.selectionEnd);
      setCode(v);
      requestAnimationFrame(() => { e.target.selectionStart = e.target.selectionEnd = s + 2; });
    }
    if ((e.shiftKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      run();
    }
  }

  return (
    <div className="cb">
      <div className="cb-header">
        <span className="cb-lang">js + tf</span>
        <button className={`cb-run ${running ? 'running' : ''}`} onClick={run} disabled={running}>
          {running ? '◌ rodando…' : '▶ rodar'}
        </button>
      </div>

      <textarea
        ref={taRef}
        className="cb-editor"
        value={code}
        onChange={e => setCode(e.target.value)}
        onKeyDown={onKeyDown}
        spellCheck={false}
        rows={1}
      />

      {output && (
        <div className={`cb-output ${output.error ? 'cb-err' : ''}`}>
          {output.outputs.map((line, i) => <pre key={i}>{line}</pre>)}
          {output.error && <pre className="cb-errline">Erro: {output.error}</pre>}
          {!output.error && output.outputs.length === 0 && (
            <pre className="cb-empty">✓ executado sem saída</pre>
          )}
        </div>
      )}
    </div>
  );
}
