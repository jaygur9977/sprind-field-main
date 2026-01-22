# 🏥 MediTrace Health Vault

A modern **Doctor–Patient Communication & Health Records Platform** built with **MERN Stack + Gemini AI + Qdrant**.  
Patients can upload medical documents, voice notes, and video notes, while doctors can verify patients, view their records, and chat securely.  
The app also includes an AI assistant with **toggle mode** and **evidence-based answers** powered by Qdrant.

---

## 🚀 Key Features

### 👤 Patient Portal
- ✅ Register & Login (Username + Password)
- ✅ Unique **12-character Patient ID** auto-generated
- ✅ Upload multiple files:
  - PDF / Image / DOC
  - Voice Notes (Audio)
  - Video Notes
- ✅ Add short description for every upload
- ✅ Patient Dashboard with:
  - **Document Upload (Active)**
  - **Chat Room (Active)**
- ✅ “Send to Doctor” option to make patient profile visible to doctors

### 👨‍⚕️ Doctor Portal
- ✅ Register & Login (Name + Multi-specialization tags + Username/Password)
- ✅ Doctor Dashboard shows **Patient Cards**
- ✅ Patient verification workflow (**Accept & Verify**)
- ✅ View patient details:
  - Basic info (Name, Mobile, Patient ID)
  - Documents + Voice + Video uploads
- ✅ Start chat by pasting Patient ID

### 💬 Chat System (Toggle Mode)
No `@` commands used.  
Toggle-based chat modes:

✅ **Patient Side Toggle**
- Doctor Chat
- AI Chat (Gemini)

✅ **Doctor Side Toggle**
- Patient Chat
- AI Assist (Gemini)

### 🤖 AI + Smart Search
- ✅ Gemini 2.5 Flash integration
- ✅ Audio/Video transcript generation via Gemini
- ✅ Evidence-based answers with:
  - Confidence level (High/Medium/Low)
  - “No evidence found” safe output

### 🔍 Qdrant (Primary Vector Search Engine)
Qdrant is used as the **main memory + semantic search engine** for:
- Uploaded document embeddings
- Transcripts embeddings
- Summaries & searchable memory
- Evidence retrieval for AI answers

---

## 🧠 MongoDB vs Qdrant (How we use both)

### MongoDB Stores:
- Doctor/Patient accounts
- Authentication & sessions
- Patient verification status
- Chat messages (raw)
- File upload URLs and metadata

### Qdrant Stores:
- Embeddings (vectors) of patient records
- Semantic search results for patient bot & doctor AI assist
- Evidence retrieval context for grounded AI responses

---

## 🛠️ Tech Stack
- **Frontend:** React (JSX) + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** MongoDB Atlas
- **Vector DB:** Qdrant
- **AI Model:** Gemini `gemini-2.5-flash`

---



PORT=5000

# MongoDB Atlas
MONGODB_URI

# JWT Secret
JWT_SECRET

# Gemini AI
GEMINI_API_KEY
GEMINI_MODEL=gemini-2.5-flash

# Qdrant
QDRANT_URL
QDRANT_API_KEY
QDRANT_COLLECTION=patient_memory
