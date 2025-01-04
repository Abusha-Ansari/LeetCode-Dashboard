import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const LeetCodeContext = createContext();

export const LeetCodeProvider = ({ children }) => {
  const [loggedIn, setloggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [AccounName, setAccounName] = useState("");
  const [userStats, setUserStats] = useState();
  const [user, setUser] = useState();


  //* Fetch user stats 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const user_id = localStorage.getItem("user_id");
        const BackendUrl = import.meta.env.VITE_BACKEND_URL;
        if (!token) {
          throw new Error("No token found. Please log in.");
        }
        const response = await fetch(`${BackendUrl}/getuserdata/${user_id}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUserStats(data.data);
      } catch (error) {}
    };
    fetchUserData();
  }, [loggedIn]);

  //* Fetch user details 
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user_id = localStorage.getItem("user_id");
        const BackendUrl = import.meta.env.VITE_BACKEND_URL;

        if (!user_id) {
          throw new Error("No token found. Please log in.");
        }
        const response = await fetch(`${BackendUrl}/user/${user_id}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUser(data.data)
      } catch (error) {}
    };
    fetchUser();
  }, [loggedIn])
  

  const Logout = () => {
    localStorage.removeItem("user_id")
    localStorage.removeItem("token");
    setloggedIn(false);
    
  };

  return (
    <LeetCodeContext.Provider
      value={{
        loggedIn,
        setloggedIn,
        AccounName,
        setAccounName,
        userStats,
        setUserStats,
        Logout,
        user,
        setUser,
      }}
    >
      {children}
    </LeetCodeContext.Provider>
  );
};
