import React from "react";
import ReactDOM from "react-dom";

window.jQuery = require("jquery");

const RichTextEditor = require("./RichTextEditor").default;

function App() {
  return (
    <div style={{ padding: 30 }}>
      <h1>Summernote</h1>
      <RichTextEditor />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
