# Semantic Wisdom Explorer 🏛️🧠

A purely client-side Linguistic Vector Matrix Engine that cross-references modern technological and existential dilemmas (e.g., algorithmic overload, imposter syndrome, hustle burnout) with classical philosophical systems of thought. 

This tool serves as a dialectical sandbox, offering structural reframes rooted in Stoicism, Secular Buddhism, Existentialism, and Taoism.

## 🚀 Core Features

* **Deterministic Client-Side "NLP":** Evaluates user text inputs in real-time using a weighted lexical matrix. It tokenizes sentences, filters out noise, and scores emotional/existential keywords against pre-indexed philosophical vectors without relying on a cloud LLM.
* **Scalable JSON Knowledge Base (Corpus):** Employs a NoSQL-style document architecture. All philosophical data (quotes, modern reframes, primary/secondary keywords) are isolated in dedicated JSON files, allowing for infinite expansion without touching the TypeScript application logic.
* **Parallel Framework Proximity:** Visualizes not just the primary philosophical match, but how closely the user's dilemma aligns with alternative schools of thought via a dynamic proximity slider matrix.
* **Dynamic Reframing:** Algorithmically maps the input to a relevant ancient quote and a highly applicable "modern structural reframe" targeted at 21st-century tech culture.

## 🧠 Reflection on the Process

Building the Wisdom Explorer was a deeply intentional exercise in merging the humanities with strict engineering constraints. 

**1. The Illusion of AI vs. Heuristic Craftsmanship:**
In an era where the default engineering response to text analysis is "just hook it up to an LLM," I wanted to prove the efficacy of a well-crafted, deterministic heuristic engine. By building a weighted token-matching algorithm, this app achieves zero-latency, zero-cost text analysis entirely in the browser. It doesn't guess; it calculates based on a tightly curated lexical dictionary.

**2. The JSON Corpus Pivot:**
Initially, the philosophical data was bundled directly into the TypeScript logic. Recognizing that this would become a bottleneck, I refactored the architecture mid-build to use isolated JSON files (`src/data/corpus/`). This transformed the app from a rigid script into a highly scalable engine. Now, expanding the engine's "wisdom" is as simple as dropping a new JSON document into the folder.

**3. Engineering for the Human Experience:**
As developers, we frequently build tools for productivity, finance, or infrastructure. It is incredibly grounding to apply those exact same rigorous engineering patterns (interfaces, grid layouts, state management) to mental well-being, burnout, and existential grounding.

## 📦 Tech Stack

* **Framework:** React 18 / Vite
* **Text Processing:** Custom Client-Side Lexical Tokenizer & Scoring Matrix
* **Styling:** Tailwind CSS + Shared Component Tokens
* **Typography:** Mixed Serif (Ancient texts) and Sans-Serif (Analytical data)
* **Workspace:** Interconnected Monorepo Architecture (`@portfolio/shared-ui`)

## 💻 Local Development

Boot up the local development server for this specific micro-app from the workspace root:

```bash
npm run dev -w apps/wisdom-explorer
```

## Build & Deployment
To compile the application for production:

```bash
# Build the micro-app
npm run build -w apps/whois-oracle
```
---
