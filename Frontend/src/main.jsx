import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./components/theme-provider";
import { LeetCodeProvider } from "./context/UserContext";

createRoot(document.getElementById("root")).render(
  <LeetCodeProvider>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  </LeetCodeProvider>
);
