// /backend/index.js
// Importa os módulos necessários
import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import 'dotenv/config'; // Para carregar variáveis de ambiente do arquivo .env

const app = express();
const PORT = process.env.PORT || 3000;

// Configura o CORS para permitir requisições apenas do seu app
// Altere as origens para o domínio do seu app Glide/Lovaleb
const corsOptions = {
  origin: ["https://YOUR-DOMAIN.site", "lovaleb://app", "http://localhost:3000"],
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Rota principal para busca de vídeos
app.get("/search", async (req, res) => {
  try {
    const { q, channelId, pageToken } = req.query;

    // Lê a chave da API das variáveis de ambiente (MUITO IMPORTANTE!)
    const apiKey = process.env.YT_API_KEY;

    if (!apiKey) {
      throw new Error("A chave da API do YouTube não foi configurada no servidor.");
    }

    // Parâmetros base da busca
    const params = new URLSearchParams({
      key: apiKey,
      part: "snippet",
      type: "video",
      maxResults: "25",
      safeSearch: "strict", // Força a busca segura
      videoEmbeddable: "true",
      relevanceLanguage: "pt", // Prioriza conteúdo em português
      regionCode: "BR",
    });

    // Adiciona parâmetros opcionais à busca
    if (q) params.append("q", q);
    if (channelId) params.append("channelId", channelId);
    if (pageToken) params.append("pageToken", pageToken);

    // Faz a chamada para a API do YouTube
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?${params.toString()}`);
    const data = await response.json();

    if (data.error) {
        console.error("Erro da API do YouTube:", data.error.message);
        return res.status(500).json({ error: "YOUTUBE_API_ERROR", message: data.error.message });
    }

    // Normaliza os resultados para um formato mais limpo e seguro
    const results = (data.items || []).map(item => ({
      videoId: item.id?.videoId,
      title: item.snippet?.title,
      thumb: item.snippet?.thumbnails?.medium?.url,
      channelTitle: item.snippet?.channelTitle,
      publishedAt: item.snippet?.publishedAt,
    })).filter(video => video.videoId); // Garante que apenas vídeos válidos sejam retornados

    res.json({ results, nextPageToken: data.nextPageToken || null });
  } catch (error) {
    console.error("Erro interno no servidor de busca:", error);
    res.status(500).json({ error: "INTERNAL_SERVER_ERROR", message: error.message });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor proxy rodando na porta ${PORT}`);
});

export default app;
