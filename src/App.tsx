import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import AppContent from "./AppContent";

function App() {
  return (
    // wrap content in router for navigation
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
