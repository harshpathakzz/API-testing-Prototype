import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./App.css";

export default function App() {
  const [url, setUrl] = useState("http://localhost:8080/api/v1/users/login");
  const [method, setMethod] = useState("POST");
  const [headers, setHeaders] = useState("{}");
  const [parameters, setParameters] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [response, setResponse] = useState("");
  const [contentType, setContentType] = useState("application/json");
  const [requestBody, setRequestBody] = useState(`{
  "password": "test@123",
  "username": "doejohn"
}`);

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

      if (method !== "GET" && method !== "HEAD") {
        options.body = requestBody;
      }

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

  return (
    <div className="container">
      <h1 className="title">API Testing Prototype</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter API URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="input"
        />
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="select"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>
      <textarea
        placeholder="Enter Headers (JSON format)"
        value={headers}
        onChange={(e) => setHeaders(e.target.value)}
        className="textarea"
      />
      <textarea
        placeholder="Enter Parameters (Key=Value format)"
        value={parameters}
        onChange={(e) => setParameters(e.target.value)}
        className="textarea"
      />

      <textarea
        placeholder="Enter Request Body (JSON format)"
        value={requestBody}
        onChange={(e) => setRequestBody(e.target.value)}
        className="textarea"
      />
      <input
        type="text"
        placeholder="Enter Authentication Token/API Key"
        value={authToken}
        onChange={(e) => setAuthToken(e.target.value)}
        className="input"
      />
      <select
        value={contentType}
        onChange={(e) => setContentType(e.target.value)}
        className="select"
      >
        <option value="application/json">JSON</option>
        <option value="application/x-www-form-urlencoded">Form Data</option>
      </select>

      <button onClick={sendRequest} className="send-button">
        Send Request
      </button>
      <pre className="response">
        <SyntaxHighlighter language="json" style={prism}>
          {response}
        </SyntaxHighlighter>
      </pre>
    </div>
  );
}
