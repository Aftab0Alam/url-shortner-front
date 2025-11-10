import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShortUrl("");
    setIsCopied(false);

    if (!originalUrl) {
      setError("Please enter a URL.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/url/shorten", { originalUrl });
      setShortUrl(response.data.shortUrl);
      setOriginalUrl("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to shorten URL.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (navigator.clipboard && shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">Shortly</h2>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>Make your URL easy to share</h1>
          <p>
            Shortening your URL makes it easier to share on social media,
            email, text messages and more. Try it out below!
          </p>
        </div>
        <div className="hero-img"></div>
      </section>

      {/* Shorten Section */}
      <section className="shorten-section">
        <form onSubmit={handleSubmit} className="shorten-form">
          <input
            type="text"
            placeholder="Shorten a link here..."
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Shortening..." : "Shorten it!"}
          </button>
        </form>
        {error && <p className="error-text">⚠️ {error}</p>}

        {shortUrl && (
          <div className="short-result">
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
            <button
              className={isCopied ? "copied" : ""}
              onClick={handleCopy}
            >
              {isCopied ? "Copied!" : "Copy"}
            </button>
          </div>
        )}
      </section>

      {/* Stats Section */}
      <section className="stats">
        <h2>Advanced Statistics</h2>
        <p>
          Track how many clicks your shortened URLs receive and measure
          their performance.
        </p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>Shorten your link now @ 2025</p>
        <button className="footer-btn">Aftab Alam</button>
      </footer>
    </div>
  );
}

export default App;
