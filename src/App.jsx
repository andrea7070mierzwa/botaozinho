import { useState } from "react";

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
  const [trilhaAtual, setTrilhaAtual] = useState("bebe-js");

  return (
  <main className="layout-geral">

    <Header />

    <div className="layout">

      <Sidebar
        setTrilhaAtual={setTrilhaAtual}
        trilhaAtual={trilhaAtual}
      />

      <section className="conteudo">

        <CapivaraScript />

        <CardAula
          aula={aulas[trilhaAtual]}
        />

        <Quiz />

        <Exercicios />

      </section>

      <aside className="painel-lateral">

        <Progresso />

        <Conquistas />

      </aside>

    </div>

  </main>
);
}