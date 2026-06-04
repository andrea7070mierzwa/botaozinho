import { useState } from "react";

export default function Quiz({ aula }) {
  const [respostaEscolhida, setRespostaEscolhida] = useState(null);

  if (!aula?.quiz) {
    return null;
  }

  const acertou = respostaEscolhida === aula.quiz.correta;

  return (
    <section className="card quiz-card">
      <h2>🎯 Quiz</h2>

      <p>{aula.quiz.pergunta}</p>

      <div className="quiz-opcoes">
        {aula.quiz.alternativas.map((alternativa, index) => (
          <button
            key={alternativa}
            onClick={() => setRespostaEscolhida(index)}
            className={respostaEscolhida === index ? "ativo" : ""}
          >
            {alternativa}
          </button>
        ))}
      </div>

      {respostaEscolhida !== null && (
        <p className={acertou ? "feedback-certo" : "feedback-erro"}>
          {acertou
            ? "Acertou, dev de rodinhas! 🚲✨"
            : "Quase! Respira, lê de novo e tenta mais uma vez. 🐾"}
        </p>
      )}
    </section>
  );
}
