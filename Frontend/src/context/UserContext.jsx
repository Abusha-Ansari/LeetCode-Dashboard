import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const LeetCodeContext = createContext();

export const LeetCodeProvider = ({ children }) => {
  // const fetchFromDB = async () => {
  //   if (loggedIn) {
  //     const user_id = localStorage.getItem("user_id");
  //     const BackendUrl = import.meta.env.VITE_BACKEND_URL;
  //     try {
  //       if (!user_id) {
  //         console.error("Login first");
  //         return;
  //       }
  //       // const response = await axios.get(
  //       //   `${BackendUrl}/getuserdata/${user_id}`
  //       // );

  //       const response = await fetch(`${BackendUrl}/getuserdata/${user_id}`, {
  //         method: "GET",
  //       });

  //       // if (response.status == 200) {
  //       //   return response.data.data.userStats;
  //       // }

  //       const data = await response.json();
  //       setUserStats(data);


  //       return;
  //     } catch (error) {
  //       return {}
  //     }
  //   } else {
  //     return {};
  //   }
  // };

  const [loggedIn, setloggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );

  const [AccounName, setAccounName] = useState("");

  const [userStats, setUserStats] = useState();


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
        

        const data = await response.json()
        setUserStats(data.data.userStats);

      } catch (error) {}
    };

    fetchUserData();
  }, [loggedIn]);

  const Logout = () => {
    localStorage.removeItem('token')
    setloggedIn(false)
}

  return (
    <LeetCodeContext.Provider
      value={{
        // fetchFromDB,
        loggedIn,
        setloggedIn,
        AccounName,
        setAccounName,
        userStats,
        setUserStats,
        Logout,
      }}
    >
      {children}
    </LeetCodeContext.Provider>
  );
};
