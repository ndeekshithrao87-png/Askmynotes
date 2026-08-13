import { useState } from "react";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const askQuestion = async () => {
    const cleanedQuestion = question.trim();

    if (!cleanedQuestion) {
      setError("Please enter a question.");
      setAnswer("");
      return;
    }

    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const response = await fetch("http://localhost:8000/ask", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          question: cleanedQuestion,
        }),
      });

      if (!response.ok) {
        throw new Error(`Backend returned status ${response.status}`);
      }

      const data = await response.json();

      setAnswer(data.answer);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to connect to the backend. Check whether the FastAPI container is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="app-card">
    <h1 className="app-title">Ask My Notes</h1>
    <p className="app-subtitle">Enter a question and send it to the FastAPI backend.</p>

    <label className="field-label">Your question</label>
    <textarea
      className="question-input"
      placeholder="For example: What is Docker?"
      value={question}
      onChange={(e) => setQuestion(e.target.value)}
    />
    {error && <p className="error-text">{error}</p>}

    <button className="ask-button" onClick={askQuestion} disabled={loading}>
      {loading ? "Asking..." : "Ask Question"}
    </button>

    {answer && (
      <div className="response-box">
        <p className="response-label">Backend response</p>
        <p className="response-text">{answer}</p>
      </div>
    )}
  </div>
);
}
export default App;