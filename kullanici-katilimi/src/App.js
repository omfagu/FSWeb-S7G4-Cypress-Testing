// App.js
import React from "react";
import Form from "./components/Form";
import "./App.css";

function App() {
  return (
    <div className="App bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="container mx-auto p-4">
        <div className="w-full max-w-md">
          <Form />
        </div>
      </div>
    </div>
  );
}

export default App;
