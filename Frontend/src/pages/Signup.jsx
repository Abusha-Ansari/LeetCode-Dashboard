import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


function SignupPage() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    college: "",
  });

  const [clicked, setClicked] = useState(false);
  const [Theme, setTheme] = useState(() => {
      return localStorage.getItem("vite-ui-theme");
    });
  const notify = (message) =>
    toast.success(`${message}`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: `${Theme}`,
    });

  const handleSubmit = async (event) => {
    setClicked(true);
    event.preventDefault();
    try {
      const BackendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${BackendUrl}/${"signup"}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(response)
      if(response.status == 200){
        response.json().then((data) => notify(data.message));
        setClicked(true)
      } else{
        notify("Error Signing up Retry sign up")
        setClicked(false)
      }

    } catch (error) {
      console.error(error);
      setClicked(false)
    }
    setFormData({
      username: "",
      email: "",
      password: "",
      college: "",
    });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleCollegeChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      college: value,
    }));
  };

  return (
    <>
    
    <Card className="w-[350px] mr-[20px]">
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription>Welcome to LeetDash!</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Name</Label>
              <Input
                id="username"
                placeholder="Enter your Name"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your Email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <div className="relative">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  className="pe-9"
                  placeholder="Enter your Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  type={isVisible ? "text" : "password"}
                />
                <button
                  className="absolute top-1/2 right-2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label={isVisible ? "Hide password" : "Show password"}
                  aria-pressed={isVisible}
                  aria-controls="password"
                >
                  {isVisible ? (
                    <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
                  ) : (
                    <Eye size={16} strokeWidth={2} aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="College">College</Label>
              <Select onValueChange={handleCollegeChange}>
                <SelectTrigger id="College">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="PCE">
                    Pillai College of Engineering
                  </SelectItem>
                  <SelectItem value="SIES">
                    SIES College of Engineering
                  </SelectItem>
                  <SelectItem value="VJTI">
                    Veermata Jijabai technical university
                  </SelectItem>
                  <SelectItem value="SPIT">
                    Sardar patel College of Engineering
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button disable={clicked} type="submit">Sign Up</Button>
          </div>
        </form>
      </CardContent>
    </Card>
    <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={`${Theme}`}
          />
    </>
  );
}

export default SignupPage;