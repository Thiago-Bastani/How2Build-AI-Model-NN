// Visualização: produto de matrizes animado
import { useState } from 'react';

const A = [[1,2],[3,4],[5,6]];
const B = [[0.1,0.2,0.3],[0.4,0.5,0.6]];

function dot(row, col) {
  return row.reduce((s, v, i) => s + v * col[i], 0);
}
const C = A.map(row => B[0].map((_, j) => dot(row, B.map(r => r[j]))));

const CELL = 36;
const GAP  = 6;

function MatCell({ val, highlight, color }) {
  const bg = highlight ? (color || '#7c6af7') : '#1a1a1a';
  return (
    <div style={{
      width: CELL, height: CELL, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: bg, borderRadius: 5, fontSize: 12,
      color: highlight ? '#fff' : '#666',
      border: `1px solid ${highlight ? bg : '#222'}`,
      transition: 'background 0.2s',
      fontFamily: 'monospace',
    }}>
      {typeof val === 'number' ? (Number.isInteger(val) ? val : val.toFixed(2)) : val}
    </div>
  );
}

function MatGrid({ data, hlRow, hlCol, color }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: GAP }}>
      {data.map((row, i) => (
        <div key={i} style={{ display: 'flex', gap: GAP }}>
          {row.map((val, j) => (
            <MatCell key={j} val={val}
              highlight={(hlRow === i || hlCol === j) && (hlRow !== undefined || hlCol !== undefined)}
              color={color} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function MatrizViz() {
  const [sel, setSel] = useState(null); // { i, j } do elemento de C selecionado

  const hlRowA = sel?.i;
  const hlColB = sel?.j;

  return (
    <div className="viz-card">
      <div className="viz-title">Produto de Matrizes — clique em C</div>

      <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>

        {/* A */}
        <div>
          <div style={{ fontSize: 10, color: '#666', marginBottom: 4, textAlign: 'center' }}>A [3×2]</div>
          <MatGrid data={A} hlRow={hlRowA} color="#4fc3f7" />
        </div>

        <div style={{ color: '#555', fontSize: 20 }}>×</div>

        {/* B */}
        <div>
          <div style={{ fontSize: 10, color: '#666', marginBottom: 4, textAlign: 'center' }}>B [2×3]</div>
          <MatGrid data={B} hlCol={hlColB} color="#f44336" />
        </div>

        <div style={{ color: '#555', fontSize: 20 }}>=</div>

        {/* C */}
        <div>
          <div style={{ fontSize: 10, color: '#666', marginBottom: 4, textAlign: 'center' }}>C [3×3]</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: GAP }}>
            {C.map((row, i) => (
              <div key={i} style={{ display: 'flex', gap: GAP }}>
                {row.map((val, j) => {
                  const isSelected = sel?.i === i && sel?.j === j;
                  return (
                    <div key={j}
                      onClick={() => setSel(isSelected ? null : { i, j })}
                      style={{
                        width: CELL, height: CELL, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: isSelected ? '#7c6af7' : '#1a1a1a',
                        border: `1px solid ${isSelected ? '#7c6af7' : '#333'}`,
                        borderRadius: 5, fontSize: 11, color: isSelected ? '#fff' : '#aaa',
                        cursor: 'pointer', fontFamily: 'monospace',
                        transition: 'all 0.15s',
                      }}>
                      {val.toFixed(2)}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {sel && (
        <div style={{ margin: '0 16px 12px', padding: '10px 12px', background: '#111', borderRadius: 6, fontSize: 12, color: '#aaa', lineHeight: 1.6 }}>
          <span style={{ color: '#7c6af7' }}>C[{sel.i}][{sel.j}]</span> = linha {sel.i} de A · coluna {sel.j} de B<br/>
          = {A[sel.i].map((v, k) => `${v}×${B[k][sel.j]}`).join(' + ')}<br/>
          = <strong style={{ color: '#fff' }}>{C[sel.i][sel.j].toFixed(2)}</strong>
        </div>
      )}

      <div style={{ padding: '0 16px 12px', fontSize: 11, color: '#444' }}>
        shape: [3×2] · [2×3] = [3×3] — o 2 do meio bate ✓
      </div>
    </div>
  );
}
