import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
  try {
    const filmes = await redis.get("filmes");
    res.status(200).json(filmes || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao listar filmes" });
  }
}
