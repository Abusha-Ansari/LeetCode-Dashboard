import React, { useState, useEffect, useContext } from "react";
import { TextEffect } from "@/components/ui/text-effect";
import { LeetCodeContext } from "@/context/UserContext";

const HomePage = () => {
  const { userStats, loggedIn } = useContext(LeetCodeContext);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("vite-ui-theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.classList.add(savedTheme);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark", "system");
    root.classList.add(theme);
  }, [theme]);

  const isDark =
    theme === "dark" ||
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <div id="home-page" className="flex flex-col items-center p-6 space-y-6">
    
      <div
        id="welcome-banner"
        className={`w-full max-w-xl p-6 rounded-lg shadow ${
          isDark ? "bg-card text-card-foreground" : "bg-muted text-muted-foreground"
        }`}
      >
        <h1 className="text-3xl font-bold text-center">Welcome to LeetDash!</h1>
        <div className="text-lg mt-2 text-center">
          <TextEffect per="word" preset="fade">
            Your personalized LeetCode tracking hub.
          </TextEffect>
        </div>
      </div>

  
      {loggedIn && (
        <div
          id="user-stats"
          className={`w-full max-w-xl p-6 border rounded-lg shadow ${
            isDark ? "bg-card border-border text-muted-foreground" : "bg-card border-border text-foreground"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">Your Stats</h2>
          <ul className="text-lg space-y-2">
            <li>
              <strong>Number of solved problems:</strong>{" "}
              <span>{userStats ? userStats.userStats.totalSolved : 0}</span>
            </li>
            <li>
              <strong>Rank or percentile:</strong>{" "}
              <span>{userStats ? userStats.userStats.ranking : 0}</span>
            </li>
            <li>
              <strong>Most recent problem Submitted:</strong>{" "}
              <span>
                {userStats
                  ? `${userStats.userStats.recentSubmissions[0].title} (${userStats.userStats.recentSubmissions[0].lang.toUpperCase()})`
                  : 0}
              </span>
            </li>
            <li>
              <strong>Data from: </strong>{" "}
              <span>{userStats ? userStats.FetchDate : 0}</span>
            </li>
          </ul>
        </div>
      )}

   
      <div
        id="interactive-feature"
        className={`w-full max-w-xl p-6 rounded-lg shadow ${
          isDark ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
        }`}
      >
        <h2 className="text-2xl font-semibold text-center">Coding Quote of the Day</h2>
        <div className="text-lg mt-2 text-center">
          <TextEffect per="char" preset="fade">
            "Code is like humor. When you have to explain it, it’s bad."
          </TextEffect>
        </div>
      </div>

      <div id="connect-button" className="mt-6">
        <a
          href="/connect"
          className={`inline-block px-6 py-3 rounded-lg text-lg font-medium shadow transition-colors duration-200 ${
            isDark
              ? "bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
          }`}
        >
          Connect with Us
        </a>
      </div>
    </div>
  );
};

export default HomePage;
