import { getSections } from '../lessons/curriculum';

const KIND_BADGE = { math: 'Σ', code: '</>', conceitual: '◆' };

export default function Sidebar({ active, onChange }) {
  const sections = getSections();

  return (
    <aside className="sidebar">
      {sections.map(section => (
        <div key={section.id} className="sb-section">
          <span className="sb-label">{section.label}</span>
          <ul className="sb-list">
            {section.items.map((item, i) => (
              <li key={item.id}>
                <button
                  className={`sb-item ${active === item.id ? 'active' : ''}`}
                  onClick={() => onChange(item.id)}
                  title={item.kind === 'code' ? 'aula de código' : item.kind === 'conceitual' ? 'aula conceitual' : 'aula de matemática'}
                >
                  <span className={`sb-kind sb-kind--${item.kind}`}>{KIND_BADGE[item.kind] || ''}</span>
                  <span className="sb-num">{String(i + 1).padStart(2, '0')}</span>
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}
