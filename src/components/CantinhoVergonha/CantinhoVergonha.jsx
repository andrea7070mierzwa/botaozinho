export default function CantinhoVergonha({ aula }) {
  if (!aula?.vergonha) {
    return null;
  }

  return (
    <section className="cantinho">
      <header className="cantinho-topo">
        <div className="bolinhas">
          <span className="vermelha"></span>
          <span className="amarela"></span>
          <span className="verde"></span>
        </div>

        <p>🖥️ Cantinho da Vergonha™</p>
      </header>

      <div className="terminal">
        <p>console.log →</p>

        <code>{aula.vergonha.comando}</code>

        <p>Resultado:</p>

        <code>{aula.vergonha.saida}</code>

        <p>💡 {aula.vergonha.dica}</p>
      </div>
    </section>
  );
}
