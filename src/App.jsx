import { useEffect, useRef, useState } from "react";

import Login from "./components/Login/Login";
import PainelProfessor from "./components/PainelProfessor/PainelProfessor";

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import CapivaraScript from "./components/CapivaraScript/CapivaraScript";
import CardAula from "./components/CardAula/CardAula";
import Quiz from "./components/Quiz/Quiz";
import Exercicios from "./components/Exercicios/Exercicios";
import Progresso from "./components/Progresso/Progresso";
import Conquistas from "./components/Conquistas/Conquistas";

import { aulas } from "./data/aulas";

export default function App() {
  const [usuario, setUsuario] = useState(() => {
    const usuarioSalvo = localStorage.getItem("botaozinho-usuario");
    return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
  });

  const [trilhaAtual, setTrilhaAtual] = useState("bebe-js");
  const [indiceAulaAtual, setIndiceAulaAtual] = useState(0);
  const [aulasConcluidas, setAulasConcluidas] = useState([]);
  const [mostrarPainelProfessor, setMostrarPainelProfessor] = useState(false);

  const painelProfessorRef = useRef(null);

  const [exerciciosExtras, setExerciciosExtras] = useState(() => {
    const exerciciosSalvos = localStorage.getItem("botaozinho-exercicios");
    return exerciciosSalvos ? JSON.parse(exerciciosSalvos) : [];
  });

  const aulasDaTrilha = aulas[trilhaAtual];
  const aulaAtual = aulasDaTrilha[indiceAulaAtual];

  const totalAulas = Object.values(aulas).reduce(
    (total, listaDeAulas) => total + listaDeAulas.length,
    0
  );

  useEffect(() => {
    if (mostrarPainelProfessor && painelProfessorRef.current) {
      painelProfessorRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [mostrarPainelProfessor]);

  function fazerLogin(dadosUsuario) {
    setUsuario(dadosUsuario);
  }

  function sair() {
    localStorage.removeItem("botaozinho-usuario");
    setUsuario(null);
    setMostrarPainelProfessor(false);
  }

  function mudarTrilha(idTrilha) {
    setTrilhaAtual(idTrilha);
    setIndiceAulaAtual(0);
    setMostrarPainelProfessor(false);
  }

  function concluirAula(idAula) {
    setAulasConcluidas((aulasAtuais) => {
      if (aulasAtuais.includes(idAula)) {
        return aulasAtuais;
      }

      return [...aulasAtuais, idAula];
    });
  }

  function irParaProximaAula() {
    if (indiceAulaAtual < aulasDaTrilha.length - 1) {
      setIndiceAulaAtual(indiceAulaAtual + 1);
    }
  }

  function voltarAula() {
    if (indiceAulaAtual > 0) {
      setIndiceAulaAtual(indiceAulaAtual - 1);
    }
  }

  function adicionarExercicio(novoExercicio) {
    const listaAtualizada = [...exerciciosExtras, novoExercicio];

    setExerciciosExtras(listaAtualizada);

    localStorage.setItem(
      "botaozinho-exercicios",
      JSON.stringify(listaAtualizada)
    );
  }

  function excluirExercicio(idExercicio) {
    const listaAtualizada = exerciciosExtras.filter(
      (exercicio) => exercicio.id !== idExercicio
    );

    setExerciciosExtras(listaAtualizada);

    localStorage.setItem(
      "botaozinho-exercicios",
      JSON.stringify(listaAtualizada)
    );
  }

  const exerciciosDaAulaAtual = exerciciosExtras.filter(
    (exercicio) => exercicio.aulaId === aulaAtual.id
  );

  if (!usuario) {
    return <Login onLogin={fazerLogin} />;
  }

  return (
    <main className="layout-geral">
      <Header />

      <div className="layout">
        <Sidebar setTrilhaAtual={mudarTrilha} trilhaAtual={trilhaAtual} />

        <section className="conteudo">
          <CapivaraScript />

          <CardAula aula={aulaAtual} />

          {exerciciosDaAulaAtual.map((exercicio) => (
            <section className="card exercicio-extra" key={exercicio.id}>
              <span>{exercicio.dificuldade}</span>

              <h2>{exercicio.titulo}</h2>

              <p>{exercicio.pergunta || exercicio.descricao}</p>

              {exercicio.alternativas && (
                <div className="exercicio-extra-opcoes">
                  {exercicio.alternativas.map((alternativa, index) => (
                    <div
                      key={`${exercicio.id}-${index}`}
                      className={
                        index === exercicio.correta
                          ? "exercicio-extra-opcao correta"
                          : "exercicio-extra-opcao"
                      }
                    >
                      <strong>{String.fromCharCode(65 + index)})</strong>{" "}
                      {alternativa}
                    </div>
                  ))}
                </div>
              )}

              {exercicio.alternativas && (
                <p className="resposta-extra">
                  ✅ Resposta correta: alternativa{" "}
                  {String.fromCharCode(65 + exercicio.correta)}
                </p>
              )}
            </section>
          ))}

          <Quiz aula={aulaAtual} onConcluirAula={concluirAula} />

          <div className="navegacao-aulas">
            <button onClick={voltarAula} disabled={indiceAulaAtual === 0}>
              ← Aula anterior
            </button>

            <span>
              Aula {indiceAulaAtual + 1} de {aulasDaTrilha.length}
            </span>

            <button
              onClick={irParaProximaAula}
              disabled={indiceAulaAtual === aulasDaTrilha.length - 1}
            >
              Próxima aula →
            </button>
          </div>

          <Exercicios />

          {usuario.tipo === "professor" && mostrarPainelProfessor && (
            <section
              className="painel-professor-central"
              ref={painelProfessorRef}
            >
              <div className="painel-professor-topo">
                <div>
                  <h2>➕ Inserir exercícios</h2>
                  <p>Cadastre novos desafios para a aula escolhida.</p>
                </div>

                <button
                  type="button"
                  onClick={() => setMostrarPainelProfessor(false)}
                >
                  Fechar painel
                </button>
              </div>

              <PainelProfessor
                exerciciosExtras={exerciciosExtras}
                onAdicionarExercicio={adicionarExercicio}
                onExcluirExercicio={excluirExercicio}
              />
            </section>
          )}
        </section>

        <aside className="painel-lateral">
          <section className="card usuario-card">
            <h2>👤 Usuário</h2>
            <p>{usuario.nome}</p>
            <strong>{usuario.tipo}</strong>
            <button onClick={sair}>Sair</button>
          </section>

          {usuario.tipo === "professor" && (
            <section className="card inserir-exercicios-card">
              <h2>➕ Exercícios</h2>

              <p>Abra o painel para cadastrar novos cards.</p>

              <button
                type="button"
                onClick={() =>
                  setMostrarPainelProfessor((estadoAtual) => !estadoAtual)
                }
              >
                {mostrarPainelProfessor
                  ? "Ocultar painel"
                  : "Inserir exercícios"}
              </button>
            </section>
          )}

          <Progresso
            aulaAtual={aulaAtual}
            totalAulas={totalAulas}
            aulasConcluidas={aulasConcluidas}
          />

          <Conquistas aulasConcluidas={aulasConcluidas} />
        </aside>
      </div>
    </main>
  );
}
