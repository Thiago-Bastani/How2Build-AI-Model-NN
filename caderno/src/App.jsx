import { useState } from 'react';
import Lesson from './components/Lesson';
import { tensores }      from './lessons/01-tensores';
import { prepararDados } from './lessons/02-preparar-dados';
import './App.css';

const TABS = [
  { id: '01', label: '01 — Tensores',        lesson: tensores },
  { id: '02', label: '02 — Preparar Dados',  lesson: prepararDados },
];

export default function App() {
  const [active, setActive] = useState('01');
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
        <Lesson blocks={tab.lesson} />
      </main>
    </div>
  );
}
