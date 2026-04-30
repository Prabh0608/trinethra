import express from "express";
import cors from "cors";
import rubricScore from "./rubric.json" with { type: "json" };

const app = express();
app.use(cors());
app.use(express.json());

app.post("/analyze", async (req, res) => {
  const { transcript } = req.body;
  const prompt = `
              Analyze this supervisor transcript.
              Return ONLY valid JSON in this format and nothing else:
              {
                "score": {
                  "score": 1-10,
                  "justification": ""
                },
                "evidence": [],
                "kpis": [],
                "gaps": [],
                "follow_up_questions": []
              }
              Rules:
              - Extract exact quotes and unerstand the 2 types of work a fello can perform: execution or visible work and Systems building or the actual mandate
              - On the basis of your understanding, extracted quotes compare it with the description in ${rubricScore.rubric}. IMPORTANT: understand deeply before scoring especially between 6 and 7 score (take a look at ${rubricScore.rubric.criticalBoundary})
              - lower the score when a transcript shows more execution or visible work evidence and less Systems building or the actual mandate
              - for the evidence exactly use the same quotes as the supervisor and give proper evidance from the transcript for the score you are giving
              - On the basis of the supervisor's description connect the fello's work with its most suitable KPI also justify present in ${rubricScore.kpis} and use the same label as mentioned in the kpis
              - For the gaps match with most suitable description in ${rubricScore.assessmentDimensions} and reply with the answers of the questions mentioned in a summarized form make sure it feels like a natural reply and not just answering some question maintain the relevance and continuty with respect to the transcript
              - After understanding the whole transcript about the fellow ask some of the top open ended unanswered follow_up_questions with repect to the score, kpi, gaps or anything related to the conversation and also answer the same in a summarise way
              - Keep in mind that supervisors are honest but biased. like Helpfulness bias, Presence bias, Halo/horn effect , Recency bias. Hence fill in the fields carefully 
              - On the basis of above rules fill in the 5 valid json field. IMPORTANT NOTE: inside each of these 5 field you may add any number of subfield that will help the user easily understand the output and the data if you do so keep in mind to name all of these subfield(dont use question and answer subfield name for gaps)
              - Dont try to give fill these 5 field early first try to understand everything and then give the result since it might change after understand or getting to know about other things.
              Transcript: ${transcript}
`;
  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama3.2",
      prompt,
      stream: false,
    }),
  });

  const data = await response.json();
  res.json({ result: data.response });
});

app.listen(5000, () => console.log("Server running on port 5000"));
