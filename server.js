import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/test", async (req, res) => {
  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama3.2",
      prompt: "Say hello in one line",
      stream: false,
    }),
  });

  const data = await response.json();
  res.json({ reply: data.response });
});

app.listen(5000, () => console.log("Server running on port 5000"));
