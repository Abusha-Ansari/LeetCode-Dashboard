import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const LeetCodeContext = createContext();

export const LeetCodeProvider = ({ children }) => {

const [loggedIn, setloggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );

const [UserData, setUserdata] = useState({
    name: "",
    LcUsername: "",
    email: "",
    college: "",
    user_id: "",
  });


const [AccounName, setAccounName] = useState("");

const fetchFromDB = async () => {
        const user_id = localStorage.getItem("user_id");
        const BackendUrl = import.meta.env.VITE_BACKEND_URL;
        try {
          if (!user_id) {
            console.error("Login first");
            return;
          }
          const response = await axios.get(`${BackendUrl}/getuserdata/${user_id}`);

          if (response.status == 200) {
    
            return response.data.data.userStats;
          }
          return;
        } catch (error) {
          return console.error(error);
        };
      };

const [userStats, setUserStats] = useState(fetchFromDB);

    useEffect(() => {
      async function getLatestData () {
        setUserStats(fetchFromDB);
      }
      getLatestData();
    }, [loggedIn]);

  return (
    <LeetCodeContext.Provider
      value={{
        fetchFromDB,
        loggedIn,
        setloggedIn,
        UserData,
        setUserdata,
        AccounName,
        setAccounName,
        userStats,
        setUserStats,
      }}
    >
      {children}
    </LeetCodeContext.Provider>
  );
};
