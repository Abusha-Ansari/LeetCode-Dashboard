import { Button } from "@/components/ui/button";
import { LeetCodeContext } from "@/context/UserContext";
import { LcAccINPUT } from "@/ownComponents/LcAccINPUT";
import { useContext } from "react";

function AddProfile() {
  const { userStats , setUserStats , loggedIn} = useContext(LeetCodeContext);

  const fetchUserData = async () => {
    const userID = localStorage.getItem("user_id");
    try {
      const BackendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${BackendUrl}/profile/${userStats.LeetCodeUsername}/${userID}` , {
        method: "PUT",
      });
      const data = await response.json()
        if(data.message && data.response){
          setUserStats(data.response)
        }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {
        loggedIn? <div className="w-full max-w-5xl mx-auto flex flex-col gap-4 p-4">
        {userStats && userStats.LeetCodeUsername ? (
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform">
              <span className="text-lg text-gray-800 font-medium">
                Your LeetCode username is: {userStats.LeetCodeUsername}
              </span>
              <span className="text-sm text-gray-600 mt-2">
                Profile Updated at: {userStats.FetchDate}
              </span>
            </div>
            <Button
              onClick={fetchUserData}
              className="w-80 bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              Click To Refresh Data
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center bg-white border border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors">
            <LcAccINPUT />
          </div>
        )}
      </div> : <div>Login first</div>
      }
    </div>
  );
}

export default AddProfile;
