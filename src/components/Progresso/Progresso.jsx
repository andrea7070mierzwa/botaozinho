export default function Progresso() {
  return (
    <section className="card progresso-card">
      <h2>📊 Progresso</h2>

      <p>
        Nível atual:
        <strong> 🍼 Bebê JS</strong>
      </p>

      <div className="barra-progresso">
        <div className="barra-preenchida"></div>
      </div>

      <p>
        15% da trilha concluída
      </p>
    </section>
  );
}