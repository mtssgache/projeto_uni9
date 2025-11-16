import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Método não permitido" });

  try {
    const novoFilme = req.body;

    let filmes = await redis.get("filmes");
    if (!filmes) filmes = [];

    filmes.push(novoFilme);

    await redis.set("filmes", filmes);

    res.status(200).json({ sucesso: true });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ error: "Erro ao adicionar filme" });
  }
}
