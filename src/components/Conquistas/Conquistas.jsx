const conquistas = [
  {
    id: "bebe-js",
    texto: "🍼 Primeiro console.log",
  },
  {
    id: "dev-rodinhas",
    texto: "🚲 Chamou uma função sem cair",
  },
  {
    id: "domador-arrays",
    texto: "🧃 Domou o primeiro array",
  },
  {
    id: "console-log",
    texto: "☕ Sobreviveu ao console.log",
  },
];

export default function Conquistas({ aulasConcluidas }) {
  const conquistasLiberadas = conquistas.filter((conquista) =>
    aulasConcluidas.includes(conquista.id)
  );

  return (
    <section className="card conquistas-card">
      <h2>🏆 Conquistas</h2>

      {conquistasLiberadas.length === 0 ? (
        <p>Responda um quiz corretamente para desbloquear conquistas.</p>
      ) : (
        <ul>
          {conquistasLiberadas.map((conquista) => (
            <li key={conquista.id}>{conquista.texto}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
