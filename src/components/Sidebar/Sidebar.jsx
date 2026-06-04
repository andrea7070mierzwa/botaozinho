import { trilhas } from "../../data/trilhas";

export default function Sidebar({ setTrilhaAtual, trilhaAtual }) {
  return (
    <aside>
      <h2>🧭 Trilhas</h2>

      {trilhas.map((trilha) => (
        <button
          key={trilha.id}
          className={trilhaAtual === trilha.id ? "ativo" : ""}
          onClick={() => setTrilhaAtual(trilha.id)}
        >
          {trilha.titulo}
        </button>
      ))}
    </aside>
  );
}