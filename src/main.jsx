import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ContextProvider } from "./context/AllContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./styles/index.css";
import App from "./App.jsx";

const client = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <Router>
        <ContextProvider>
          <App />
        </ContextProvider>
      </Router>
    </QueryClientProvider>
  </StrictMode>
);
