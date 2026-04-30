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
              Return ONLY valid JSON in this format:
              {
                "score": {
                },
                "evidence": [
                  
                ],
                "kpis": [
                  
                ],
                "gaps": [],
                "follow_up_questions": []
              }
              Rules:
              - Extract exact quotes and unerstand the 2 types of work a fello can perform: execution or visible work and Systems building or the actual mandate
              -  flag when a transcript only shows execution or visible work evidence.
              - On the basis of your understanding, extracted quotes compare it with the description in ${rubricScore.rubric} and give them a overall score. IMPORTANT: understand deeply before scoring especially between 6 and 7 score (take a look at ${rubricScore.rubric.criticalBoundary})
              - for the evidence exactly use the same quotes as the supervisor and give proper evidance from the transcript for the score you are giving
              - On the basis of the supervisor's description connect the fello's work with its most suitable KPI present in ${rubricScore.kpis} and use the same label as mentioned in the most suitable KPI found before. 
              - For the gaps match with most suitable description in ${rubricScore.assessmentDimensions} and reply with the answers of the questions mentioned in a summarized form make sure to keep the relevance and continuty with respect to the transcript
              - After understanding the whole transcript about the fello ask some of the top open ended unanswered follow_up_questions with repect to the score, kpi, gaps or anything related to the conversation and also try to answer the same with best of you ability in a summarise way
              - Keep in mind that supervisors are honest but biased. like Helpfulness bias, Presence bias, Halo/horn effect , Recency bias. So identify when a supervisor's praise describes task absorption vs. systems building, or when a negative comment might actually indicate systems work the supervisor doesn't recognize.
              - On the basis of above rules fill in the 5 valid json field. IMPORTANT NOTE: inside each of these 5 field you may add any number of subfield that will help the user easily understand the output and the data if you do so keep in mind to name all of these subfield
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
