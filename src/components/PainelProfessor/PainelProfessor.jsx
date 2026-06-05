import { useState } from "react";
import { aulas } from "../../data/aulas";
import { trilhas } from "../../data/trilhas";

export default function PainelProfessor({ onAdicionarExercicio }) {
  const [trilhaSelecionada, setTrilhaSelecionada] = useState("bebe-js");
  const [aulaSelecionada, setAulaSelecionada] = useState(
    aulas["bebe-js"][0].id
  );
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dificuldade, setDificuldade] = useState("iniciante");

  const aulasDaTrilha = aulas[trilhaSelecionada];

  function trocarTrilha(idTrilha) {
    setTrilhaSelecionada(idTrilha);
    setAulaSelecionada(aulas[idTrilha][0].id);
  }

  function salvarExercicio(event) {
    event.preventDefault();

    if (!titulo.trim() || !descricao.trim()) {
      return;
    }

    const novoExercicio = {
      id: crypto.randomUUID(),
      trilhaId: trilhaSelecionada,
      aulaId: aulaSelecionada,
      titulo,
      descricao,
      dificuldade,
      criadoEm: new Date().toISOString(),
    };

    onAdicionarExercicio(novoExercicio);

    setTitulo("");
    setDescricao("");
    setDificuldade("iniciante");
  }

  return (
    <section className="card painel-professor">
      <h2>🧑‍🏫 Painel do Professor</h2>

      <p>Cadastre exercícios extras sem mexer no código.</p>

      <form onSubmit={salvarExercicio}>
        <label>
          Trilha
          <select
            value={trilhaSelecionada}
            onChange={(event) => trocarTrilha(event.target.value)}
          >
            {trilhas.map((trilha) => (
              <option key={trilha.id} value={trilha.id}>
                {trilha.titulo}
              </option>
            ))}
          </select>
        </label>

        <label>
          Aula
          <select
            value={aulaSelecionada}
            onChange={(event) => setAulaSelecionada(event.target.value)}
          >
            {aulasDaTrilha.map((aula) => (
              <option key={aula.id} value={aula.id}>
                {aula.titulo}
              </option>
            ))}
          </select>
        </label>

        <label>
          Dificuldade
          <select
            value={dificuldade}
            onChange={(event) => setDificuldade(event.target.value)}
          >
            <option value="iniciante">Iniciante</option>
            <option value="intermediario">Intermediário</option>
            <option value="desafio">Desafio</option>
          </select>
        </label>

        <label>
          Título do exercício
          <input
            type="text"
            value={titulo}
            onChange={(event) => setTitulo(event.target.value)}
            placeholder="Ex: Crie uma variável chamada cidade"
          />
        </label>

        <label>
          Descrição
          <textarea
            value={descricao}
            onChange={(event) => setDescricao(event.target.value)}
            placeholder="Explique o que o aluno deve fazer..."
          />
        </label>

        <button type="submit">Adicionar exercício</button>
      </form>
    </section>
  );
}
