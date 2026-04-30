````md
# 🧠 Trinethra Supervisor Feedback Analyzer

AI-assisted tool to analyze supervisor transcripts and generate structured performance insights for Fellows.

---

## 🚀 Setup Instructions

```bash
# Install dependencies
npm install

# Start Ollama (in separate terminal)
ollama pull llama3.2
ollama run llama3.2

# Start backend
node server.js
```
````

- Open `index.html` in your browser (or use a live server)

---

## 🤖 Model Used

**llama3.2 (Ollama)**

- Runs locally (no API key required)
- Lightweight and fast
- Suitable for structured output generation

---

## 🏗️ Architecture

```
Frontend (HTML/JS)
   ↓
Backend (Node.js + Express)
   ↓
Ollama (llama3.2 via local API)
   ↓
Structured JSON → UI sections
```

- Frontend collects transcript input
- Backend constructs prompt and calls Ollama
- Response is parsed and displayed as structured output

---

## 🧠 Prompt Design

- Prompt fully designed and written by me based on:
  - Fellow model (execution vs systems building)
  - Rubric definitions (1–10 scoring)
  - KPI mappings
  - Supervisor bias patterns

- Enforces:
  - Clear distinction between execution and systems work
  - Strict rubric-based scoring (especially 6 vs 7 boundary)
  - Mapping natural language → predefined KPIs
  - Bias-aware interpretation

- Iteratively refined using sample transcripts for consistency

---

## ⚙️ Design Challenges Tackled

### 1. Structured Output Reliability

- Strict JSON-only prompt
- Regex-based fallback parsing for malformed responses

### 2. Rubric-Based Scoring Consistency

- Hard constraints in prompt (execution ≤ 6, systems ≥ 7)
- Explicit handling of critical 6 vs 7 boundary

### 3. Avoiding Automation Bias

- Output labeled as **“AI Draft — Please Review”**
- Designed for human-in-the-loop validation

---

## 🔧 Improvements (With More Time)

- Side-by-side transcript + analysis view
- Editable output fields for intern review
- Highlight evidence directly in transcript
- Multi-step prompting (separate extraction + scoring)
- Confidence scoring for each section

---

```

```
