// Visualização: produto de matrizes com as mesmas matrizes do texto
// Cita: A=[[1,2],[3,4]]  B=[[5,6],[7,8]]  C=[[19,22],[43,50]]
import { useState } from 'react';

const A = [[1, 2], [3, 4]];
const B = [[5, 6], [7, 8]];

function dot(row, col) {
  return row.reduce((s, v, i) => s + v * col[i], 0);
}
const C = A.map(row => B[0].map((_, j) => dot(row, B.map(r => r[j]))));

const CELL = 44;
const GAP  = 6;

function MatCell({ val, highlight, color }) {
  const bg = highlight ? (color || '#7c6af7') : '#1a1a1a';
  return (
    <div style={{
      width: CELL, height: CELL, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: bg, borderRadius: 5, fontSize: 13,
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

      <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>

        {/* A */}
        <div>
          <div style={{ fontSize: 10, color: '#666', marginBottom: 4, textAlign: 'center' }}>A [2×2]</div>
          <MatGrid data={A} hlRow={hlRowA} color="#4fc3f7" />
        </div>

        <div style={{ color: '#555', fontSize: 20 }}>×</div>

        {/* B */}
        <div>
          <div style={{ fontSize: 10, color: '#666', marginBottom: 4, textAlign: 'center' }}>B [2×2]</div>
          <MatGrid data={B} hlCol={hlColB} color="#f44336" />
        </div>

        <div style={{ color: '#555', fontSize: 20 }}>=</div>

        {/* C */}
        <div>
          <div style={{ fontSize: 10, color: '#666', marginBottom: 4, textAlign: 'center' }}>C [2×2]</div>
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
                        borderRadius: 5, fontSize: 13, color: isSelected ? '#fff' : '#aaa',
                        cursor: 'pointer', fontFamily: 'monospace',
                        transition: 'all 0.15s',
                      }}>
                      {val}
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
          = {A[sel.i].map((v, k) => v * B[k][sel.j]).join(' + ')} = <strong style={{ color: '#fff' }}>{C[sel.i][sel.j]}</strong>
        </div>
      )}

      <div style={{ padding: '0 16px 12px', fontSize: 11, color: '#444' }}>
        shape: [2×2] · [2×2] = [2×2] — o 2 do meio bate ✓
      </div>
    </div>
  );
}
