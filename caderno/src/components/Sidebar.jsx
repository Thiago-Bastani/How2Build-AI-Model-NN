const SECTIONS = [
  {
    id: 'calculo',
    label: 'Cálculo',
    items: [
      { id: 'funcoes',          label: 'Funções' },
      { id: 'derivada',         label: 'Derivada' },
      { id: 'gradiente',        label: 'Gradiente' },
      { id: 'produto-matrizes', label: 'Produto de Matrizes' },
      { id: 'regra-da-cadeia',  label: 'Regra da Cadeia' },
    ],
  },
  {
    id: 'ml',
    label: 'ML',
    items: [
      { id: 'tensores',         label: '01 — Tensores' },
      { id: 'preparar-dados',   label: '02 — Preparar Dados' },
      { id: 'construir-modelo', label: '03 — Construir um Modelo' },
    ],
  },
];

export default function Sidebar({ active, onChange }) {
  return (
    <aside className="sidebar">
      {SECTIONS.map(section => (
        <div key={section.id} className="sb-section">
          <span className="sb-label">{section.label}</span>
          <ul className="sb-list">
            {section.items.map(item => (
              <li key={item.id}>
                <button
                  className={`sb-item ${active === item.id ? 'active' : ''}`}
                  onClick={() => onChange(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}
