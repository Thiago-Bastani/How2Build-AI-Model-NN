import { useState } from 'react';
import Sidebar   from './components/Sidebar';
import Lesson    from './components/Lesson';
import VizPanel  from './components/VizPanel';

import { funcoes,         funcoesViz }         from './lessons/calculo/01-funcoes';
import { derivada,        derivadaViz }         from './lessons/calculo/02-derivada';
import { gradiente,       gradienteViz }        from './lessons/calculo/03-gradiente';
import { produtoMatrizes, produtoMatrizesViz }  from './lessons/calculo/04-produto-matrizes';
import { regraDaCadeia,   regraDaCadeiaViz }    from './lessons/calculo/05-regra-da-cadeia';
import { tensores }      from './lessons/01-tensores';
import { prepararDados } from './lessons/02-preparar-dados';

import './App.css';

const LESSONS = {
  'funcoes':          { blocks: funcoes,         viz: funcoesViz },
  'derivada':         { blocks: derivada,         viz: derivadaViz },
  'gradiente':        { blocks: gradiente,        viz: gradienteViz },
  'produto-matrizes': { blocks: produtoMatrizes,  viz: produtoMatrizesViz },
  'regra-da-cadeia':  { blocks: regraDaCadeia,    viz: regraDaCadeiaViz },
  'tensores':         { blocks: tensores,          viz: [] },
  'preparar-dados':   { blocks: prepararDados,     viz: [] },
};

export default function App() {
  const [active, setActive] = useState('funcoes');
  const { blocks, viz } = LESSONS[active];

  return (
    <div className="app">
      <header className="header">
        <span className="logo">caderno ml</span>
      </header>

      <div className="layout">
        <Sidebar active={active} onChange={setActive} />

        <main className="content">
          <div className="lesson-col" key={active}>
            <Lesson blocks={blocks} />
          </div>
          <VizPanel vizIds={viz} />
        </main>
      </div>
    </div>
  );
}
