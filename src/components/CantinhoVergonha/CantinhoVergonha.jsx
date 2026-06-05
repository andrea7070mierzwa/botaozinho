import { useEffect, useState } from "react";

export default function CantinhoVergonha({ aula }) {
  const [codigo, setCodigo] = useState(aula?.codigo || "");
  const [resultado, setResultado] = useState("");

  useEffect(() => {
    setCodigo(aula?.codigo || "");
    setResultado("");
  }, [aula?.id, aula?.codigo]);

  function executarCodigo() {
    const logs = [];

    const consoleFake = {
      log: (...mensagens) => {
        logs.push(
          mensagens
            .map((mensagem) =>
              typeof mensagem === "object"
                ? JSON.stringify(mensagem, null, 2)
                : String(mensagem)
            )
            .join(" ")
        );
      },
    };

    try {
      const executar = new Function("console", codigo);
      const retorno = executar(consoleFake);

      if (logs.length > 0) {
        setResultado(logs.join("\n"));
        return;
      }

      if (retorno !== undefined) {
        setResultado(String(retorno));
        return;
      }

      setResultado("Código executado sem saída no console.");
    } catch (erro) {
      setResultado(`Erro: ${erro.message}`);
    }
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

      <div className="terminal terminal-interativo">
        <label>
          Escreva ou altere o código:
          <textarea
            value={codigo}
            onChange={(event) => setCodigo(event.target.value)}
            spellCheck="false"
          />
        </label>

        <button onClick={executarCodigo}>Executar</button>

        <div className="saida-terminal">
          <p>Resultado:</p>
          <pre>{resultado || "Aguardando execução..."}</pre>
        </div>
      </div>
    </section>
  );
}
