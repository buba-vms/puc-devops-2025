const request = require("supertest");
const app = require("../app"); // ajuste o caminho se necessário

describe("Testes da API de frases", () => {
  test("GET / deve responder com a mensagem de boas-vindas", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toContain("Bem-vindo à minha API 🚀");
  });

  test("GET /frases deve retornar lista de frases", async () => {
    const res = await request(app).get("/frases");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("GET /frases/aleatoria deve retornar uma frase válida", async () => {
    const res = await request(app).get("/frases/aleatoria");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("frase");
    expect(typeof res.body.frase).toBe("string");
  });

  test("POST /frases deve adicionar uma nova frase", async () => {
    const novaFrase = { frase: "Testando a API com Jest 🚀" };
    const res = await request(app).post("/frases").send(novaFrase);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("mensagem", "Frase adicionada!");
    expect(res.body.frases).toContain(novaFrase.frase);
  });

  test("POST /frases sem 'frase' deve retornar 400", async () => {
    const res = await request(app).post("/frases").send({});
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("erro", "Campo 'frase' é obrigatório");
  });
});
