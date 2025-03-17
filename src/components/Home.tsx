import React from "react";
import { useLocation } from "react-router-dom";

interface LocationState {
  user?: string;
}

const Home: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  const user = typeof state?.user === "string" ? state.user : "Guest";
  return <h1>Welcome, {user}.</h1>;
};

export default Home;
