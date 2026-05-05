# 🚀 DocuMind AI – AI Document Assistant (RAG)

DocuMind AI is a Retrieval-Augmented Generation (RAG) application that allows users to upload PDF documents and ask questions using natural language.

The system processes documents, performs semantic search using vector embeddings, and generates accurate answers using LLMs.

---

## 🧠 Features

* 📄 Upload PDF documents
* 🔍 Semantic search over document content
* 💬 Ask questions in natural language
* ⚡ Context-aware responses using Gemini
* 🧩 Session-based document handling (one active document at a time)
* 🔄 Automatic session reset on new upload

---

## 🏗️ Architecture

```
PDF Upload → Text Extraction → Chunking → Embedding → Qdrant
                                                    ↓
User Query → Embedding → Similarity Search → Context → LLM Model (Ollama/Gemini) → Answer
```

---

## 🛠️ Tech Stack

* **Backend:** FastAPI
* **Vector Database:** Qdrant (Cloud)
* **LLM & Embeddings:** Google Gemini API
* **Frameworks:** LangChain (partial usage)
* **Local Testing:** Ollama

---

## ⚙️ How It Works

1. User uploads a PDF
2. Text is extracted and split into chunks
3. Each chunk is converted into embeddings
4. Embeddings are stored in Qdrant
5. User asks a question
6. Relevant chunks are retrieved using semantic search
7. Gemini generates an answer based on context

---

## 📁 Project Structure

```
backend/
│
├── src/
│   ├── api/            # API routes (upload, query)
│   ├── services/       # business logic (ingestion, retrieval, LLM)
│   ├── db/             # Qdrant client
│   ├── core/           # config, embeddings
│   └── main.py         # FastAPI entry point
│
├── .env
├── requirements.txt
```

---

## 🔧 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/documind-ai.git
cd documind-ai/backend
```

---

### 2. Create virtual environment

```bash
python -m venv venv
venv\Scripts\activate   # Windows
# source venv/bin/activate  # Mac/Linux
```

---

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

---

### 4. Setup Environment Variables

Create a `.env` file:

```env
QDRANT_URL=your_qdrant_url
QDRANT_API_KEY=your_qdrant_api_key
GEMINI_API_KEY=your_gemini_api_key
```

---

### 5. Run the application

```bash
uvicorn src.main:app --reload
```

Open:
👉 http://127.0.0.1:8000/docs

---

## 📌 API Endpoints

### Upload PDF

```
POST /upload
```

### Ask Question

```
GET /query?q=your_question&session_id=your_session_id
```

---

## ⚠️ Limitations

* Only one active document per session
* Optimized for small PDFs (recommended 1–2 pages due to Gemini free tier)
* No persistent storage for sessions (in-memory handling)

---

## 🚀 Future Improvements

* UI (React frontend)
* Multi-document support
* Session persistence (Redis/DB)
* Streaming responses
* Deployment (Railway/Render)

---

## 🧠 Key Learnings

* Understanding RAG architecture (retrieval + generation)
* Importance of chunking and semantic search
* Handling session-based vector storage
* Integrating LLMs with backend systems

---

## 📬 Connect

If you're working on similar AI or RAG-based systems, feel free to connect!

---

⭐ If you found this project useful, consider giving it a star!
