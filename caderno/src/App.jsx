import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Lesson  from './components/Lesson';
import { getFlatOrder } from './lessons/curriculum';

import './App.css';

export default function App() {
  const [active, setActive] = useState(getFlatOrder()[0]);

  return (
    <div className="app">
      <header className="header">
        <span className="logo">caderno ml</span>
      </header>

      <div className="layout">
        <Sidebar active={active} onChange={setActive} />

        <main className="content">
          <div className="lesson-col" key={active}>
            <Lesson lessonId={active} onNavigate={setActive} />
          </div>
        </main>
      </div>
    </div>
  );
}
