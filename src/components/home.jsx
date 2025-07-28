import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firabase"; // adjust path if needed
import "./home.css";

// Icons
import quizIcon from "../assets/icons/quiz.png";
import resumeIcon from "../assets/icons/headhunting.png";
import chatIcon from "../assets/icons/artificial-intelligence.png";
import jobsIcon from "../assets/icons/profile.png";
import bannerImage from "../assets/icons/home.jpg";

export default function Home({ user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="home-container">
      <header className="home-header">
        {/* Top bar with logout */}
        <div className="top-bar">
          <h1>JobPrep360</h1>
          {user && (
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>

        <div className="hero-section">
          <div className="hero-text">
            <h2>Your AI-powered assistant for career readiness</h2>
            {!user && (
              <Link to="/register" className="cta-button">
                Get Started
              </Link>
            )}
          </div>
          <div className="hero-image">
            <img src={bannerImage} alt="Career Preparation" />
          </div>
        </div>
      </header>

      <section className="card-grid">
        <div className="feature-card">
          <img src={quizIcon} alt="Quiz" />
          <h3>Skill Quiz</h3>
          <p>Test your IT knowledge with real quizzes.</p>
          <Link to="/quiz">Start Quiz</Link>
        </div>

        <div className="feature-card">
          <img src={resumeIcon} alt="Resume" />
          <h3>Resume Builder</h3>
          <p>Create or improve your resume with AI tips.</p>
          <Link to="/resume">Build Resume</Link>
        </div>

        <div className="feature-card">
          <img src={chatIcon} alt="Interview" />
          <h3>Interview Practice</h3>
          <p>Chat with AI and practice common questions.</p>
          <Link to="/chat">Start Practice</Link>
        </div>

       
      </section>
    </div>
  );
}
