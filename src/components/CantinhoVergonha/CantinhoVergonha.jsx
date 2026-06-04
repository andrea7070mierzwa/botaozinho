export default function CantinhoVergonha({
  aula,
}) {

  return (

    <section className="cantinho">

      <header className="cantinho-topo">

        <div className="bolinhas">

          <span className="vermelha"></span>

          <span className="amarela"></span>

          <span className="verde"></span>

        </div>

        <p>
          🖥️ Cantinho da Vergonha™
        </p>

      </header>

      <div className="terminal">

        <p>
          console.log →
        </p>

        {aula.id === "bebe-js" && (

          <code>
            Andrea
          </code>

        )}

        {aula.id === "console-log" && (

          <code>
            undefined 😂
          </code>

        )}

      </div>

    </section>

  );
}