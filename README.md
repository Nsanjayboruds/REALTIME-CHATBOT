# REALTIME-CHATBOT 🤖💬

A modern AI-powered, real-time chatbot built with **React** (frontend) and **Node.js/Express** (backend).  
It features **text and voice interactions**, **smart command detection**, and integrates with powerful LLM APIs like OpenAI or Gemini.

---

##  Table of Contents

- [Demo](#-demo)
- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#-prerequisites)
  - [Installation](#-installation)
  - [Environment Variables](#-environment-variables)
  - [Running the App](#-running-the-app)
- [Screenshots](#-screenshots)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [Contact](#-contact)
- [License](#-license)

---


---

##  About

**REALTIME-CHATBOT** is designed for natural, seamless conversations. You can interact via:

- **Text** — Type your messages.
- **Voice** — Use speech recognition and text-to-speech for hands-free chat.

The bot recognizes **smart commands** like “search Google for …” or “open YouTube”, making your interaction more dynamic.

---

##  Features

- **Text Chat**: Instant message exchange.
- **Voice Input**: Speak your messages using the browser’s SpeechRecognition API.
- **Voice Output**: Hear responses via SpeechSynthesis API.
- **Smart Commands**: Built-in actions for web searches, opening links, etc.
- **Responsive Design**: Works well on both desktop and mobile.
- **AI Integration**: Powered by LLMs (OpenAI, Gemini, Groq… etc.).
- *(Optional)* **Chat History**: Save previous conversations (e.g., with MongoDB).

---

##  Tech Stack

| Layer      | Technologies & APIs |
|------------|----------------------|
| Frontend   | React, Vite, Tailwind CSS, optionally ShadCN UI |
| Voice APIs | Web Speech API (SpeechRecognition, SpeechSynthesis) |
| Backend    | Node.js, Express, integration with LLM APIs |
| (Optional) | MongoDB or another database for chat history |

---

##  Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v16+  
- npm or yarn  
- (Optional) MongoDB instance or connection string

---

### Installation

```bash
# Clone the repo
git clone https://github.com/Nsanjayboruds/REALTIME-CHATBOT.git
cd REALTIME-CHATBOT

# Install dependencies in frontend & backend
cd frontend
npm install

cd ../backend
npm install

Environment Variables

Create a .env file inside your backend directory:

PORT=5000
MONGO_URI=<your_mongodb_connection_uri_optional>
OPENAI_API_KEY=<your_openai_api_key>      # or GEMINI_API_KEY / GROQ_API_KEY as needed


Running the App:-

# In backend directory
npm run dev   # Starts the backend server (e.g., on port 5000)

# In frontend directory
npm run dev   # Starts the React app (usually port 5173)


Then open your browser at http://localhost:5173/






Contributing

Contributions are welcome! Here's how to get started:

Fork this repository.

Create your feature branch: git checkout -b feature/YourFeature

Commit changes: git commit -m "Add your-feature"

Push to your branch: git push origin feature/YourFeature

Open a Pull Request.

Please follow project conventions and maintain code quality.



License

This project is licensed under the MIT License.
See the LICENSE











