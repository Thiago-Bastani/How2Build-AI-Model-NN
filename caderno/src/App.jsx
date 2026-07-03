import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Lesson  from './components/Lesson';

import { funcoes }        from './lessons/calculo/01-funcoes';
import { derivada }       from './lessons/calculo/02-derivada';
import { gradiente }      from './lessons/calculo/03-gradiente';
import { produtoMatrizes} from './lessons/calculo/04-produto-matrizes';
import { regraDaCadeia }  from './lessons/calculo/05-regra-da-cadeia';
import { tensores }        from './lessons/01-tensores';
import { prepararDados }   from './lessons/02-preparar-dados';
import { construirModelo } from './lessons/03-modelo';

import './App.css';

const LESSONS = {
  'funcoes':          funcoes,
  'derivada':         derivada,
  'gradiente':        gradiente,
  'produto-matrizes': produtoMatrizes,
  'regra-da-cadeia':  regraDaCadeia,
  'tensores':         tensores,
  'preparar-dados':   prepararDados,
  'construir-modelo': construirModelo,
};

export default function App() {
  const [active, setActive] = useState('funcoes');

  return (
    <div className="app">
      <header className="header">
        <span className="logo">caderno ml</span>
      </header>

      <div className="layout">
        <Sidebar active={active} onChange={setActive} />

        <main className="content">
          <div className="lesson-col" key={active}>
            <Lesson blocks={LESSONS[active]} />
          </div>
        </main>
      </div>
    </div>
  );
}
