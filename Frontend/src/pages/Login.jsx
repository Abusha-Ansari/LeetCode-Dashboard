import React, { useContext, useEffect, useState } from "react";
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
import { LeetCodeContext } from "@/context/UserContext";

function LoginPage() {
  
  const [isVisible, setIsVisible] = useState(false);
  
  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [Theme, setTheme] = useState(() => {
    return localStorage.getItem("vite-ui-theme");
  });

  const [clicked, setClicked] = useState(false);

  const { loggedIn, setloggedIn } = useContext(LeetCodeContext);

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
    event.preventDefault();
    try {
      setClicked(true);
      const BackendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${BackendUrl}/${"login"}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        response.json().then((data) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user_id", data.user_id);

          if (data.user_id) {
            notify("Login Succesfull");
            setloggedIn(true);
          } else {
            console.error(data.message);
          }
        });
      } else {
        setClicked(false);
        notify("Login was not Succesfull");
      }

      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      console.error(error);
      setClicked(false);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <>
      <Card className="w-[400px] mr-[20px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Welcome back to LeetDash!</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
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
              <Button disable={clicked} type={clicked ? "" : "submit"}>
                Login
              </Button>
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

export default LoginPage;
