import { aulas } from "../../data/aulas";

export default function Progresso({
  trilhaAtual,
  totalAulas,
  aulasConcluidas,
}) {
  const quantidadeConcluida = aulasConcluidas.length;
  const porcentagem = Math.round((quantidadeConcluida / totalAulas) * 100);
  const aulaAtual = aulas[trilhaAtual];

  return (
    <section className="card progresso-card">
      <h2>📊 Progresso</h2>

      <p>
        Nível atual:
        <strong> {aulaAtual.titulo}</strong>
      </p>

      <div className="barra-progresso">
        <div
          className="barra-preenchida"
          style={{ width: `${porcentagem}%` }}
        ></div>
      </div>

      <p>{porcentagem}% da jornada concluída</p>

      <p>
        {quantidadeConcluida} de {totalAulas} aulas concluídas
      </p>
    </section>
  );
}
