import express from "express";
import cors from "cors";

import { casinoContent } from "./data/casinoContent";

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.get("/api/content", (_req, res) => {
  res.json(casinoContent);
});

app.get("/api/games", (_req, res) => {
  res.json(casinoContent.casinoGames);
});

app.get("/api/games/:id", (req, res) => {
  const game = casinoContent.casinoGames.find(g => g.id === req.params.id);
  if (!game) return res.status(404).json({ error: "Game not found" });
  res.json(game);
});

app.get("/api/promotions", (_req, res) => res.json(casinoContent.promotions));
app.get("/api/news", (_req, res) => res.json(casinoContent.casinoNews));

const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
