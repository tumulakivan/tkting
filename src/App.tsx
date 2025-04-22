import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import AppContent from "./AppContent";

function App() {
  return (
    <Router>
      {/* Wrap app content in router */}
      <AppContent />
    </Router>
  );
}

export default App;
