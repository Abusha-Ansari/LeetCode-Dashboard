import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LeetCodeContext } from "@/context/UserContext";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useContext, useState } from "react";

export function LcAccINPUT() {
  
  const [clicked, setClicked] = useState(false);

  const { AccounName, setAccounName } = useContext(LeetCodeContext);

  async function handsubmit(e) {
    e.preventDefault();
    setClicked(true)
    const userID = localStorage.getItem("user_id");

    try {
      const BackendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${BackendUrl}/profile/${AccounName}/${userID}`);
      const data = await response.json()
        if(data.message && data.response){
          console.log('fetch succesfull')
        }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
    <div className="flex flex-col items-center">
      <Label className="m-2 text-xl font-semibold">
        Enter Your Leetcode Username
      </Label>
      <div className="flex flex-row gap-2">
        <Input
          type="text"
          placeholder="Username"
          className="w-[30rem]"
          onChange={(e) => setAccounName(e.target.value)}
        />
        <Button type="submit" disable={clicked} onClick={handsubmit}>
          Search Account
        </Button>
      </div>
    </div>
    </>
   
  );
}
export default LcAccINPUT;
