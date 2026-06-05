import { useState } from "react";

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
  const [usuario, setUsuario] = useState(null);
  const [trilhaAtual, setTrilhaAtual] = useState("bebe-js");
  const [indiceAulaAtual, setIndiceAulaAtual] = useState(0);
  const [aulasConcluidas, setAulasConcluidas] = useState([]);

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

  function fazerLogin(dadosUsuario) {
    setUsuario(dadosUsuario);
  }

  function sair() {
    setUsuario(null);
  }

  function mudarTrilha(idTrilha) {
    setTrilhaAtual(idTrilha);
    setIndiceAulaAtual(0);
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
              <p>{exercicio.descricao}</p>
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
        </section>

        <aside className="painel-lateral">
          <section className="card usuario-card">
            <h2>👤 Usuário</h2>
            <p>{usuario.nome}</p>
            <strong>{usuario.tipo}</strong>
            <button onClick={sair}>Sair</button>
          </section>

          {usuario.tipo === "professor" && (
            <PainelProfessor onAdicionarExercicio={adicionarExercicio} />
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
