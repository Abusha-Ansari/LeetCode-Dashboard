import React, { useContext } from "react";
import GraphStats from "@/ownComponents/GraphStats";
import SolvedChart from "@/ownComponents/SolvedChart";
import { LeetCodeContext } from "@/context/UserContext";
import SubmissionChart from "@/ownComponents/SubmissionStats";

function Dashboard() {
  const { userStats } = useContext(LeetCodeContext);
  const data = userStats; 

  return (
    <>
  <div className="w-full max-w-[80rem] mx-auto flex flex-col md:flex-row justify-around gap-4 mt-5 mb-5">
    <SolvedChart
      easy={data ? data.userStats.easySolved : 0}
      medium={data ? data.userStats.mediumSolved : 0}
      hard={data ? data.userStats.hardSolved : 0}
      totalSolved={data ? data.userStats.totalSolved : 0}
    />
    <SubmissionChart
      totalSubmission={data ? data.userStats.totalSubmissions[0]?.submissions : 0}
      easy={data ? data.userStats.totalSubmissions[1]?.submissions : 0}
      medium={data ? data.userStats.totalSubmissions[2]?.submissions : 0}
      hard={data ? data.userStats.totalSubmissions[3]?.submissions : 0}
    />
  </div>
  <div className="w-full max-w-[80rem] mx-auto flex flex-col gap-4 px-4">
    <GraphStats submissionCalendar={data ? data.userStats.submissionCalendar : {}} />
  </div>
</>

  );
}

export default Dashboard;
