# AI-Driven Cognitive Warfare Simulator (ACWS)

ACWS is a full-stack AI project that simulates how misinformation can spread in a social network, predicts whether that spread looks suspicious, and explains why the model made that decision.

It includes:
- A training pipeline for graph-based misinformation detection
- A FastAPI backend for generation, simulation, prediction, and explanation
- A Next.js frontend for interactive analysis and visualization

---

## 1. Project Overview

### What problem does this solve?
Misinformation can spread very fast online. People often share content before checking whether it is true. By the time fact-checking arrives, the damage may already be done.

### Why does misinformation matter?
Misinformation can:
- Influence elections
- Create panic during health crises
- Damage trust in institutions
- Polarize communities through repeated false narratives

### What does ACWS do end-to-end?
ACWS lets a user enter a topic, then:
- Generates a narrative (using a local LLM)
- Simulates how that narrative spreads through a network
- Extracts measurable spread features
- Classifies risk using a graph-based model pipeline
- Explains the decision using SHAP-based explainability
- Visualizes everything in a clean frontend report

Think of it like a “flight simulator” for information spread: you can test scenarios safely and inspect what drives risk.

---

## 2. System Flow (Very Important)

### High-level flow

```text
User Topic
   |
   v
Narrative Generation (Ollama)
   |
   v
Propagation Simulation (Agent-Based Network)
   |
   v
Feature Extraction (velocity, bot ratio, echo density, depth)
   |
   v
Detection Model (GNN artifacts + backend inference)
   |
   v
SHAP Attribution + Explanation Engine
   |
   v
Frontend Report + 3D Network Visualization
```

### API-oriented flow

```text
Frontend /analyze page
   -> POST /analyze
      -> generate_misinformation(topic)
      -> simulate_network(text, steps)
      -> metrics_to_feature_vector(...)
      -> model_service.predict(features)
      -> get_shap_attributions(features)
      -> generate_explanation(...)
   <- structured response (prediction, confidence, risk, drivers, recommendation)
```

---

## 3. Core Concepts (Beginner Friendly)

### 3.1 What is a Graph Neural Network (GNN)?
A graph is a set of nodes and links.
- Nodes = people or posts
- Links = interactions, shares, or relationships

A GNN learns patterns from these connections, not just from text alone.

Analogy:
- A normal model reads one message.
- A GNN reads the message and also who shared it, how quickly it spread, and which clusters repeated it.

### 3.2 What is propagation?
Propagation means “how information spreads over time.”

Example:
- One account posts a claim
- A few influencers share it
- Bot-like accounts amplify it
- Closed groups keep repeating it

ACWS simulates this spread and measures it.

### 3.3 What is SHAP?
SHAP tells us which input features pushed the model decision most.

In plain language:
- “These factors had the biggest impact on the model saying this looks risky.”

### 3.4 What is XAI?
XAI means Explainable AI.

Why we need it:
- Without explanation, a model is a black box
- In sensitive domains, decisions must be understandable and auditable

### 3.5 What is Ollama?
Ollama runs large language models locally on your machine.

In this project, Ollama is used to generate narratives for simulation. If Ollama is unavailable, backend fallback text generation can still work (depending on config).

---

## 4. Architecture

### Frontend (Next.js)
Purpose:
- Collect user inputs (topic, text, simulation steps)
- Trigger backend APIs
- Display generated narrative, risk score, reasoning, SHAP drivers, and graph view

Main pages:
- Home
- Generate
- Simulate
- Analyze

### Backend (FastAPI)
Purpose:
- Expose clean APIs
- Orchestrate end-to-end analysis pipeline
- Serve model inference and explanation results

Key modules:
- llm_service: narrative generation through Ollama (+ local fallback)
- simulation_service: agent-based graph simulation and spread dynamics
- model_service: loads trained artifacts and performs prediction with threshold
- xai_service: SHAP attributions for feature importance
- explanation_engine: converts metrics + SHAP values into human-readable rationale

### ML pipeline (offline training + online inference)
- Training pipeline creates graph features and model artifacts in AI/outputs
- Backend loads those artifacts at startup
- Online inference uses extracted tabular features from simulated propagation

### Architecture diagram

```text
                +-----------------------------+
                |          Frontend           |
                |   Next.js + TypeScript UI   |
                +-------------+---------------+
                              |
                              | HTTP
                              v
                +-------------+---------------+
                |        FastAPI Backend      |
                | /generate /simulate /predict|
                | /explain /analyze           |
                +------+------+------+--------+
                       |      |      |
                       |      |      +--> XAI (SHAP)
                       |      +----------> Model Service
                       +-----------------> LLM + Simulation

Offline Training (AI/main.py) --> AI/outputs/*.pt, metrics.json
                                --> backend/model/model.pkl (surrogate)
```

---

## 5. Folder Structure

Project root contains three main working areas and one output area:

```text
aiot/
├── AI/
│   ├── main.py
│   ├── requirements.txt
│   ├── dataset/
│   ├── outputs/
│   └── src/gnn_pipeline/
├── backend/
│   ├── app/
│   ├── requirements.txt
│   └── run.py
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── package.json
└── README.md
```

### AI/
- Purpose: data processing, graph construction, feature engineering, model training/evaluation
- Important files:
  - AI/main.py: orchestrates end-to-end training pipeline
  - AI/src/gnn_pipeline/discovery.py: discovers datasets automatically
  - AI/src/gnn_pipeline/loaders.py: loads FakeNewsNet, LIAR, and PHEME-style data
  - AI/src/gnn_pipeline/preprocessing.py: cleans and standardizes text/table data
  - AI/src/gnn_pipeline/graph_builder.py: builds graph nodes and edges
  - AI/src/gnn_pipeline/feature_engineering.py: builds text + structural + temporal features
  - AI/src/gnn_pipeline/model.py: GraphGATClassifier architecture
  - AI/src/gnn_pipeline/train.py: training loop, threshold search, metrics, artifact export

### backend/
- Purpose: production API server and runtime inference engine
- Important files:
  - backend/run.py: starts Uvicorn server
  - backend/app/main.py: FastAPI app initialization and route wiring
  - backend/app/routes/: API route handlers
  - backend/app/services/llm_service.py: Ollama generation
  - backend/app/services/simulation_service.py: network spread simulation
  - backend/app/services/model_service.py: model loading + prediction logic
  - backend/app/services/xai_service.py: SHAP explainer
  - backend/app/services/explanation_engine.py: turns SHAP + metrics into readable analysis

### frontend/
- Purpose: interactive user interface and visual report
- Important files:
  - frontend/app/generate/page.tsx: generate narrative variants
  - frontend/app/simulate/page.tsx: run simulation and inspect metrics
  - frontend/app/analyze/page.tsx: full analysis workflow and report view
  - frontend/components/GraphVisualization.tsx: 3D propagation visualization
  - frontend/lib/api.ts: typed API client

### outputs/ (AI/outputs)
- Purpose: trained artifacts and model metadata produced by AI pipeline
- Important artifacts:
  - model_state_dict.pt
  - model_torchscript.pt
  - processed_graph.pt
  - metrics.json
  - dataset_registry.json

---

## 6. Model Training

### Dataset sources used by the training pipeline
The pipeline discovers and combines multiple misinformation-related datasets from AI/dataset/archive* directories:
- FakeNewsNet-style content and user interaction files
- LIAR benchmark splits (train/valid/test TSV)
- PHEME-style rumor CSV candidates

### Preprocessing
- Cleans text (lowercase, URL removal, punctuation cleanup)
- Normalizes required columns (id, parent_id, text, label, timestamp)
- Removes duplicates and empty rows

### Graph creation
Graph builder creates:
- News nodes
- User nodes
- User-news edges
- User-user edges
- Parent-child edges for conversation structure

### Feature engineering
Node feature vectors combine:
- Text embeddings (sentence-transformer/transformer/hashing)
- Structural signals (degree, centrality, clustering, propagation depth)
- Time features
- Bot probability heuristic
- Optional compressed user features from sparse matrices

The backend tabular features used for runtime detection are:
- velocity
- bot_ratio
- echo_density
- depth

### Training and evaluation
- Model: GraphGATClassifier (residual multi-block GAT)
- Split: train/val/test with stratification when possible
- Threshold selection: optimized on validation data (objective: F1 or recall)
- Exports: state dict, TorchScript, metrics JSON, backend surrogate model

### Evaluation metrics explained
- Accuracy: how often predictions are correct overall
- Precision: among predicted misinformation cases, how many are truly misinformation
- Recall: among actual misinformation cases, how many were caught
- F1-score: balance between precision and recall

Current saved test metrics in AI/outputs/metrics.json:
- Accuracy: 0.9071
- Precision: 0.7840
- Recall: 0.9462
- F1: 0.8575
- Threshold used: 0.12

---

## 7. How Inference Works

### Model loading strategy
At backend startup, ModelService tries in this order:
- AI/outputs/model_state_dict.pt (trained GNN state dict)
- AI/outputs/model_torchscript.pt (TorchScript model)
- backend/model/model.pkl (surrogate model)
- final emergency fallback dummy model

### Threshold usage
- Threshold is loaded from AI/outputs/metrics.json when available
- If missing, defaults to 0.5
- Prediction is binary using probability > threshold

### Prediction flow
1. Simulation outputs graph stats + propagation metrics
2. Feature vector is created as [velocity, bot_ratio, echo_density, depth]
3. Model predicts probability of misinformation class
4. System returns prediction, confidence, and threshold_used

---

## 8. XAI Explanation

### How SHAP works conceptually
SHAP estimates each feature’s contribution to the final prediction.

Simple view:
- Start from a baseline expectation
- Add feature influence one by one
- Measure how much each feature pushed prediction up or down

### How ACWS converts SHAP into human explanation
The pipeline:
- Gets SHAP values for the 4 backend features
- Ranks them by absolute impact
- Builds top drivers with:
  - label
  - short explanation sentence
  - normalized score
  - direction (toward misinformation or organic spread)
- Combines this with propagation thresholds to produce:
  - summary
  - risk_level (low/medium/high)
  - reasoning bullets
  - recommendation

---

## 9. Setup Guide (Very Clear)

## Prerequisites
- Python 3.10+ recommended
- Node.js 18+ and npm
- Ollama installed locally

### Step 1: Clone repo
```bash
git clone https://github.com/Swastik-59/AI-driver-cognitive-warfare-simulator.git
cd aiot
```

If you already have this project locally, you can directly run:
```bash
cd /home/user/dev/aiot
```

### Step 2: Create virtual environment
```bash
python3 -m venv .venv
source .venv/bin/activate
```

### Step 3: Install Python dependencies
Backend dependencies:
```bash
pip install -r backend/requirements.txt
```

Training dependencies:
```bash
pip install -r AI/requirements.txt
```

If needed for your environment, install PyTorch and PyTorch Geometric following official instructions for your OS/CUDA version.

### Step 4: Run backend
```bash
cd backend
python run.py
```
Backend default URL: http://localhost:8000

Optional: run/rebuild training artifacts first
```bash
cd AI
python main.py --dataset-root ./dataset --output-dir ./outputs
```

### Step 5: Run frontend
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```
Frontend default URL: http://localhost:3000

### Step 6: Start Ollama
In another terminal:
```bash
ollama serve
ollama pull llama3:8b-instruct-q4_0
```

Optional frontend env file:
- Create frontend/.env.local with:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 10. How To Use

### Option A: Through frontend UI
1. Open http://localhost:3000
2. Use Generate page to create narrative variants
3. Use Simulate page to test propagation on custom text
4. Use Analyze page for full pipeline report

### Option B: Through backend API
Health check:
```bash
curl http://127.0.0.1:8000/
```

Generate misinformation:
```bash
curl -X POST http://127.0.0.1:8000/generate/misinformation \
  -H "Content-Type: application/json" \
  -d '{"topic":"election misinformation"}'
```

Simulate:
```bash
curl -X POST http://127.0.0.1:8000/simulate \
  -H "Content-Type: application/json" \
  -d '{"text":"sample narrative text","steps":10}'
```

Analyze end-to-end:
```bash
curl -X POST http://127.0.0.1:8000/analyze \
  -H "Content-Type: application/json" \
  -d '{"topic":"public health rumor","steps":10}'
```

---

## 11. Sample Output

### Sample input
```json
{
  "topic": "public health rumor",
  "steps": 10
}
```

### Sample analyze output shape
```json
{
  "generated_text": "...",
  "metrics": {
    "graph_stats": {
      "nodes": 78,
      "edges": 146,
      "density": 0.0486,
      "average_degree": 3.7436,
      "agent_counts": {
        "normal": 48,
        "influencer": 12,
        "bot": 14,
        "skeptic": 4
      },
      "bot_ratio": 0.1795,
      "influencer_ratio": 0.1538,
      "skeptic_ratio": 0.0513
    },
    "propagation_metrics": {
      "reach": 52,
      "depth": 6,
      "velocity": 4.8,
      "velocity_by_step": [3, 8, 7, 9, 6, 4, 2],
      "echo_chamber_density": 0.4712
    },
    "features": [4.8, 0.1795, 0.4712, 6.0]
  },
  "prediction": 1,
  "confidence": 0.89,
  "threshold_used": 0.12,
  "explanation": {
    "summary": "This content shows strong indicators of misinformation propagation.",
    "risk_level": "high",
    "reasoning": [
      "High propagation velocity suggests rapid viral spread.",
      "High echo chamber density suggests information is circulating within closed communities."
    ],
    "key_drivers": [
      {
        "label": "Echo chamber density",
        "score": 0.42,
        "direction": "toward misinformation",
        "explanation": "Echo chamber density contributed most to the classification by pushing the model toward misinformation."
      }
    ],
    "recommendation": "Content should be verified before sharing."
  }
}
```

---

## 12. Design Decisions

### Why use a GNN?
Because misinformation behavior is relational. The same text can look very different depending on who spreads it and how.

### Why use SHAP?
To make predictions transparent and reviewable. Analysts need reasons, not only labels.

### Why include simulation?
Real-world diffusion data is hard to collect in controlled settings. Simulation allows safe experimentation with spread dynamics and what-if scenarios.

### Why keep backend surrogate logic?
It improves robustness when full graph inference artifacts are not available and supports reliable API operation.

---

## 13. Limitations

- The simulation is simplified and does not fully represent all real social platform behaviors.
- The system does not ingest live social media streams in real time.
- Inference at backend level currently uses compact engineered features for speed and reliability.
- LLM-generated narratives can vary by model and prompt behavior.
- Explainability is approximate and depends on background assumptions used by SHAP.

---

## 14. Future Work

- Integrate real social graph streams and temporal event pipelines
- Upgrade to richer heterogeneous/dynamic GNN variants
- Add live monitoring dashboards and alerting
- Add stronger calibration and uncertainty estimation
- Expand multilingual misinformation handling

---

## 15. Viva Prep: Common Questions & Answers

### Q1: Why GNN instead of only text classification?
A: Misinformation is often identified by spread patterns and network structure, not only wording. GNN captures relationship signals directly.

### Q2: Why SHAP for explainability?
A: SHAP gives feature-level contribution values. This makes decisions interpretable and easier to justify to reviewers.

### Q3: Why threshold tuning?
A: Default threshold 0.5 is not always optimal. Tuning threshold on validation data improves trade-offs, especially when recall is critical.

### Q4: What is precision vs recall?
A:
- Precision = out of flagged items, how many were truly misinformation
- Recall = out of true misinformation items, how many were successfully flagged

### Q5: Why is recall important in this project?
A: Missing dangerous misinformation can be costly. High recall helps catch more risky cases, then human review can handle false positives.

### Q6: What role does Ollama play?
A: It provides local LLM generation for scenario narratives. This keeps experimentation local and reproducible.

### Q7: Is this system production-ready for national-scale monitoring?
A: Not yet. It is a strong research/prototype platform with modular architecture, but needs real-time ingestion, stronger validation, and operational hardening for large-scale deployment.

---

## Quick Recap

ACWS is a complete educational and engineering stack for misinformation analysis:
- Generate narrative
- Simulate propagation
- Detect risk
- Explain why
- Visualize results

This makes it useful for learning, demos, experimentation, and research-oriented system design discussions.
