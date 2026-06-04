export const aulas = {
  "bebe-js": {
    id: "bebe-js",
    titulo: "🍼 Bebê JS",
    descricao: "Aqui começam os primeiros passinhos no JavaScript.",
    explicacao:
      "Variáveis são caixinhas que guardam informações. Você dá um nome para a caixinha e coloca um valor dentro dela.",
    codigo: `const nome = "Andrea";

console.log(nome);`,
    vergonha: {
      comando: "console.log(nome)",
      saida: "Andrea",
      dica: "Se a variável existe e foi escrita do mesmo jeitinho, o console mostra o valor guardado nela.",
    },
    quiz: {
      pergunta: "O que uma variável faz?",
      alternativas: [
        "Guarda uma informação",
        "Apaga o computador",
        "Muda a cor do teclado",
      ],
      correta: 0,
    },
  },

  "dev-rodinhas": {
    id: "dev-rodinhas",
    titulo: "🚲 Dev de Rodinhas",
    descricao: "Funções, lógica e estruturas básicas.",
    explicacao:
      "Funções são bloquinhos de código que guardam uma ação. Você cria uma vez e pode chamar quando precisar.",
    codigo: `function darBomDia() {
  console.log("Bom dia, dev!");
}

darBomDia();`,
    vergonha: {
      comando: "darBomDia",
      saida: "Nada aconteceu 😬",
      dica: "Para chamar uma função, não esqueça dos parênteses: darBomDia()",
    },
    quiz: {
      pergunta: "Para executar uma função, usamos:",
      alternativas: [
        "Apenas o nome dela",
        "O nome dela com parênteses",
        "Sempre um alert",
      ],
      correta: 1,
    },
  },

  "domador-arrays": {
    id: "domador-arrays",
    titulo: "🧃 Domador de Arrays",
    descricao: "map(), filter(), find() e reduce().",
    explicacao:
      "Arrays são listas. Eles servem para guardar vários valores em uma única variável.",
    codigo: `const frutas = ["maçã", "banana", "uva"];

console.log(frutas[0]);`,
    vergonha: {
      comando: "console.log(frutas[3])",
      saida: "undefined 🫠",
      dica: "Arrays começam no índice 0. Se a lista tem 3 itens, os índices são 0, 1 e 2.",
    },
    quiz: {
      pergunta: "Em JavaScript, o primeiro item de um array fica no índice:",
      alternativas: ["1", "0", "10"],
      correta: 1,
    },
  },

  "console-log": {
    id: "console-log",
    titulo: "☕ Sobreviveu ao console.log",
    descricao: "DOM, eventos e Cantinho da Vergonha.",
    explicacao:
      "O console.log é uma forma de pedir para o JavaScript mostrar algo no console. Ele ajuda a entender o que está acontecendo no código.",
    codigo: `const humor = "sobrevivendo";

console.log(humor);`,
    vergonha: {
      comando: "console.log(humorErrado)",
      saida: "ReferenceError 😵",
      dica: "O JavaScript é literal: se o nome da variável está diferente, ele não adivinha.",
    },
    quiz: {
      pergunta: "Para que usamos console.log?",
      alternativas: [
        "Para testar e visualizar informações no console",
        "Para publicar o site",
        "Para criar imagens",
      ],
      correta: 0,
    },
  },
};
