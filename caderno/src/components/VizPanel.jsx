import FuncoesCustoViz from './viz/FuncoesCustoViz';
import DerivadaViz     from './viz/DerivadaViz';
import GradienteViz    from './viz/GradienteViz';
import MatrizViz       from './viz/MatrizViz';
import CadeiaViz       from './viz/CadeiaViz';

const VIZ_MAP = {
  'funcoes-custo':  FuncoesCustoViz,
  'derivada':       DerivadaViz,
  'gradiente':      GradienteViz,
  'produto-matriz': MatrizViz,
  'cadeia':         CadeiaViz,
};

export default function VizPanel({ vizIds }) {
  if (!vizIds?.length) return <aside className="viz-panel viz-empty"><span>sem visualizações para esta lição</span></aside>;

  return (
    <aside className="viz-panel">
      {vizIds.map(id => {
        const Comp = VIZ_MAP[id];
        return Comp ? <Comp key={id} /> : null;
      })}
    </aside>
  );
}
