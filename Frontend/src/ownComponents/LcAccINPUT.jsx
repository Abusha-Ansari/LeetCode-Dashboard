import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";

export function LcAccINPUT() {
    const [accountName , setAccounName] = useState('');
    function handsubmit(){
        const username = accountName;
        const userID = localStorage.getItem("user_id");
        console.log(userID)
    }

  return (
    // <div className="flex flex-col w-full max-w-xl items-center space-x-2">
    <div className="flex flex-col items-center">
      <Label className="m-2 text-xl font-semibold"> Enter Your Leetcode Username</Label>
      <div className="flex flex-row gap-2">
        <Input type="text" placeholder="Username" className="w-[30rem]" onChange={(e)=>setAccounName(e.target.value)} />
        <Button type="submit" onClick={handsubmit}>Search</Button>
      </div>
    </div>
  );
}
export default LcAccINPUT;
