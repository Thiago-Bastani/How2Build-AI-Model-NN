import { useState } from 'react';
import tensores from '../../01_tensores.js?raw';
import prepararDados from '../../02_preparar_dados.js?raw';
import './App.css';

const TABS = [
  { id: 'tensores',      label: '01 — Tensores',       content: tensores },
  { id: 'dados',         label: '02 — Preparar Dados',  content: prepararDados },
];

export default function App() {
  const [active, setActive] = useState('tensores');
  const tab = TABS.find(t => t.id === active);

  return (
    <div className="app">
      <header className="header">
        <span className="logo">caderno ml</span>
        <nav className="tabs">
          {TABS.map(t => (
            <button
              key={t.id}
              className={`tab ${active === t.id ? 'active' : ''}`}
              onClick={() => setActive(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="content">
        <pre className="code-block"><code>{tab.content}</code></pre>
      </main>
    </div>
  );
}
