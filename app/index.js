const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bem-vindo à minha API 🚀");
});

const frases = [
  "A persistência leva ao sucesso.",
  "Você é mais forte do que imagina.",
  "O fracasso é apenas um degrau para o aprendizado.",
];

app.get("/frases", (req, res) => {
  res.json(frases);
});

app.get("/frases/aleatoria", (req, res) => {
  const aleatoria = frases[Math.floor(Math.random() * frases.length)];
  res.json({ frase: aleatoria });
});

app.post("/frases", (req, res) => {
  const { frase } = req.body;
  frases.push(frase);
  res.status(201).json({ mensagem: "Frase adicionada!", frases });
});

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
