import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./components/firabase";

// Components
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";
import ChatInterface from "./components/IA"; 

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const Protected = ({ children }) => {
    if (loading) return <div style={{ padding: '2rem' }}>Loading...</div>;
    return user ? children : <Navigate to="/register" />;
  };

  return (
  <Router>
  <Routes>
    <Route path="/" element={<Home user={user} />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* Unified GPT Chat Interface */}
    <Route
      path="/quiz"
      element={
        <Protected>
          <ChatInterface
            title="Skill Quiz Assistant"
            placeholder="Ask about networking or Python..."
          />
        </Protected>
      }
    />
    <Route
      path="/resume"
      element={
        <Protected>
          <ChatInterface
            title="Resume Builder Assistant"
            placeholder="Help me write a resume..."
          />
        </Protected>
      }
    />
    <Route
      path="/chat"
      element={
        <Protected>
          <ChatInterface
            title="Interview Practice Bot"
            placeholder="Ask me common interview questions..."
          />
        </Protected>
      }
    />
    <Route
      path="/jobs"
      element={
        <Protected>
          <ChatInterface
            title="Job Finder Assistant"
            placeholder="Find remote developer jobs..."
          />
        </Protected>
      }
    />
  </Routes>
</Router>
  );
}

export default App;