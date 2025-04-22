import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import AppContent from "./AppContent";

function App() {
  return (
    // Wrap app content in router
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
