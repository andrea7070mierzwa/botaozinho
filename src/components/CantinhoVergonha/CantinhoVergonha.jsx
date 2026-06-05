import { useEffect, useState } from "react";

export default function CantinhoVergonha({ aula }) {
  const [codigo, setCodigo] = useState(aula?.codigo || "");
  const [resultado, setResultado] = useState("");
  const [historico, setHistorico] = useState([]);
  const [indiceDica, setIndiceDica] = useState(0);
  const [missaoCumprida, setMissaoCumprida] = useState(false);

  const desafio = aula?.desafio;

  useEffect(() => {
    setCodigo(aula?.codigo || "");
    setResultado("");
    setHistorico([]);
    setIndiceDica(0);
    setMissaoCumprida(false);
  }, [aula?.id, aula?.codigo]);

  function formatarMensagem(mensagem) {
    if (typeof mensagem === "object") {
      return JSON.stringify(mensagem, null, 2);
    }

    return String(mensagem);
  }

  function validarDesafio(saida) {
    if (!desafio?.validacao) {
      return null;
    }

    const codigoMinusculo = codigo.toLowerCase();
    const itensObrigatorios = desafio.validacao.deveConter || [];

    const faltando = itensObrigatorios.filter(
      (item) => !codigoMinusculo.includes(item.toLowerCase())
    );

    if (faltando.length > 0) {
      return {
        sucesso: false,
        mensagem: `🦫 A CapivaraScript suspeita que faltou usar: ${faltando.join(
          ", "
        )}.`,
      };
    }

    if (
      desafio.validacao.saidaEsperada &&
      !saida.includes(desafio.validacao.saidaEsperada)
    ) {
      return {
        sucesso: false,
        mensagem: `🦫 O código rodou, mas a saída esperada era: ${desafio.validacao.saidaEsperada}`,
      };
    }

    return {
      sucesso: true,
      mensagem: "✅ Missão cumprida! A CapivaraScript aprovou esse código.",
    };
  }

  function executarCodigo() {
    const logs = [];

    const consoleFake = {
      log: (...mensagens) => {
        logs.push(mensagens.map(formatarMensagem).join(" "));
      },
    };

    try {
      const executar = new Function("console", codigo);
      const retorno = executar(consoleFake);

      let saida = "";

      if (logs.length > 0) {
        saida = logs.join("\n");
      } else if (retorno !== undefined) {
        saida = String(retorno);
      } else {
        saida = "Código executado sem saída no console.";
      }

      const validacao = validarDesafio(saida);
      const mensagemFinal = validacao
        ? `${saida}\n\n${validacao.mensagem}`
        : saida;

      setResultado(mensagemFinal);

      if (validacao?.sucesso) {
        setMissaoCumprida(true);
      }

      setHistorico((tentativas) => [
        {
          id: crypto.randomUUID(),
          codigo,
          resultado: mensagemFinal,
          data: new Date().toLocaleTimeString("pt-BR"),
        },
        ...tentativas,
      ]);
    } catch (erro) {
      const mensagemErro = `Erro: ${erro.message}`;

      setResultado(mensagemErro);

      setHistorico((tentativas) => [
        {
          id: crypto.randomUUID(),
          codigo,
          resultado: mensagemErro,
          data: new Date().toLocaleTimeString("pt-BR"),
        },
        ...tentativas,
      ]);
    }
  }

  function mostrarProximaDica() {
    if (!desafio?.dicas?.length) {
      return;
    }

    if (indiceDica < desafio.dicas.length - 1) {
      setIndiceDica(indiceDica + 1);
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
        {desafio && (
          <section className="missao-terminal">
            <h3>{desafio.titulo}</h3>

            <p>{desafio.enunciado}</p>

            <div className="dica-terminal">
              <strong>💡 Dica {indiceDica + 1}:</strong>
              <span>{desafio.dicas[indiceDica]}</span>
            </div>

            <button
              type="button"
              onClick={mostrarProximaDica}
              disabled={indiceDica === desafio.dicas.length - 1}
            >
              Me dá mais uma pista
            </button>

            {missaoCumprida && (
              <p className="missao-cumprida">
                ✅ Missão concluída. Pode avançar, dev de rodinhas!
              </p>
            )}
          </section>
        )}

        <label>
          Escreva ou altere o código:
          <textarea
            value={codigo}
            onChange={(event) => setCodigo(event.target.value)}
            spellCheck="false"
          />
        </label>

        <button type="button" onClick={executarCodigo}>
          Executar
        </button>

        <div className="saida-terminal">
          <p>Resultado:</p>
          <pre>{resultado || "Aguardando execução..."}</pre>
        </div>

        {historico.length > 0 && (
          <section className="historico-terminal">
            <h3>📜 Histórico de tentativas</h3>

            {historico.map((tentativa, index) => (
              <details key={tentativa.id}>
                <summary>
                  Tentativa {historico.length - index} — {tentativa.data}
                </summary>

                <p>Código:</p>
                <pre>{tentativa.codigo}</pre>

                <p>Resultado:</p>
                <pre>{tentativa.resultado}</pre>
              </details>
            ))}
          </section>
        )}
      </div>
    </section>
  );
}
