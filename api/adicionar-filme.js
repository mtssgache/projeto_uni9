import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const novoFilme = req.body;

    const filePath = path.join(process.cwd(), 'filmes.json');
    const filmes = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    filmes.push(novoFilme);

    fs.writeFileSync(filePath, JSON.stringify(filmes, null, 2));

    res.status(200).json({ sucesso: true });
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}
