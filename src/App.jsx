import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function App() {
  const [url, setUrl] = useState("https://randomuser.me/api");
  const [method, setMethod] = useState("GET");
  const [headers, setHeaders] = useState("{}");
  const [parameters, setParameters] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [response, setResponse] = useState("");
  const [contentType, setContentType] = useState("application/json");

  const sendRequest = async () => {
    try {
      const options = {
        method,
        headers: {
          ...JSON.parse(headers),
          Authorization: `Bearer ${authToken}`,
          "Content-Type": contentType,
        },
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
    textAlign: "left",
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
      <input
        type="text"
        placeholder="Enter Authentication Token/API Key"
        value={authToken}
        onChange={(e) => setAuthToken(e.target.value)}
        style={inputStyle}
      />
      <br />
      <select
        value={contentType}
        onChange={(e) => setContentType(e.target.value)}
        style={inputStyle}
      >
        <option value="application/json">JSON</option>
        <option value="application/x-www-form-urlencoded">Form Data</option>
      </select>
      <br />
      <button onClick={sendRequest} style={buttonStyle}>
        Send Request
      </button>
      <pre style={responseStyle}>
        <SyntaxHighlighter language="json" style={prism}>
          {response}
        </SyntaxHighlighter>
      </pre>
    </div>
  );
}
