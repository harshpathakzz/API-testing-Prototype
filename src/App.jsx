import { useState, useEffect } from "react";

export default function App() {
  const [url, setUrl] = useState("https://randomuser.me/api");
  const [method, setMethod] = useState("GET");
  const [headers, setHeaders] = useState("{}");
  const [parameters, setParameters] = useState("");
  const [response, setResponse] = useState("");
  const [savedUrls, setSavedUrls] = useState([]);

  // Load saved URLs from Local Storage on initial load
  useEffect(() => {
    const savedUrlsString = localStorage.getItem("savedUrls");
    if (savedUrlsString) {
      setSavedUrls(JSON.parse(savedUrlsString));
    }
  }, []);

  // Save the current URL to Local Storage
  const saveUrl = () => {
    const newSavedUrls = [...savedUrls, url];
    setSavedUrls(newSavedUrls);
    localStorage.setItem("savedUrls", JSON.stringify(newSavedUrls));
  };

  // Clear all saved URLs from state and Local Storage
  const clearSavedUrls = () => {
    setSavedUrls([]);
    localStorage.removeItem("savedUrls");
  };

  const sendRequest = async () => {
    try {
      const options = {
        method,
        headers: JSON.parse(headers),
      };

      const apiUrl = new URL(url);
      if (parameters) {
        apiUrl.search = new URLSearchParams(parameters).toString();
      }

      const apiResponse = await fetch(apiUrl.toString(), options);
      const jsonResponse = await apiResponse.json();

      setResponse(JSON.stringify(jsonResponse, null, 2));
    } catch (error) {
      console.error(error);
      setResponse("Error occurred while making the request.");
    }
  };

  const inputStyle = {
    padding: "8px",
    marginBottom: "10px",
    width: "300px",
  };

  const buttonStyle = {
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    marginRight: "10px",
  };

  const responseStyle = {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "14px",
    whiteSpace: "pre-wrap",
  };

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h1>API Testing Prototype</h1>
      <input
        type="text"
        placeholder="Enter API URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={inputStyle}
      />
      <br />
      <select
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        style={inputStyle}
      >
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
        <option value="DELETE">DELETE</option>
      </select>
      <br />
      <textarea
        placeholder="Enter Headers (JSON format)"
        value={headers}
        onChange={(e) => setHeaders(e.target.value)}
        style={inputStyle}
      />
      <br />
      <textarea
        placeholder="Enter Parameters (Key=Value format)"
        value={parameters}
        onChange={(e) => setParameters(e.target.value)}
        style={inputStyle}
      />
      <br />
      <button onClick={sendRequest} style={buttonStyle}>
        Send Request
      </button>
      <button onClick={saveUrl} style={buttonStyle}>
        Save URL
      </button>
      <button onClick={clearSavedUrls} style={buttonStyle}>
        Clear Saved URLs
      </button>
      <pre style={responseStyle}>{response}</pre>
      <div>
        <h2>Saved URLs</h2>
        <ul>
          {savedUrls.map((savedUrl, index) => (
            <li key={index}>{savedUrl}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
