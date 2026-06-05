import { useState } from "react";

export default function Login({ onLogin }) {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("aluno");

  function entrar(event) {
    event.preventDefault();

    if (!nome.trim()) {
      return;
    }

    onLogin({
      nome,
      tipo,
    });
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <h1>🟣 Botãozinho JS</h1>

        <p>Entre para continuar sua jornada dev sem trauma.</p>

        <form onSubmit={entrar}>
          <label>
            Nome
            <input
              type="text"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              placeholder="Digite seu nome"
            />
          </label>

          <label>
            Perfil
            <select
              value={tipo}
              onChange={(event) => setTipo(event.target.value)}
            >
              <option value="aluno">Aluno</option>
              <option value="professor">Professor</option>
            </select>
          </label>

          <button type="submit">Entrar</button>
        </form>
      </section>
    </main>
  );
}
