import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState(""); // For entering the JSON data (with Base64 string)
  const [response, setResponse] = useState(""); // Display server response
  const [error, setError] = useState(""); // Display any errors

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Validate JSON input
      // const parsedData = JSON.parse(data);

      // Send POST request
      const res = await axios.post("https://bajaj-coding-challange-backend.onrender.com/bfhl", {input:data});
      setResponse(JSON.stringify(res.data, null, 2));
      setError("");
    } catch (err) {
      setError(err.message);
      setResponse("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>BFHL Data Submission</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Enter JSON Data:</label>
          <textarea
            rows="5"
            cols="50"
            value={data}
            onChange={(e) => setData(e.target.value)}
            placeholder='e.g., {"data": ["A", "B", "1", "2"], "file_b64": "BASE64_ENCODED_STRING"}'
            required
          />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>
          Submit
        </button>
      </form>

      {response && (
        <div style={{ marginTop: "20px" }}>
          <h3>Server Response:</h3>
          <pre>{response}</pre>
        </div>
      )}

      {error && (
        <div style={{ marginTop: "20px", color: "red" }}>
          <h3>Error:</h3>
          <pre>{error}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
