import { Link, Navigate, useNavigate } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useContext, useState } from "react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import LogoCanvas from "../components/LogoCanvas";
import { UserContext } from "../context/UserContext";
import { LoggedInContext } from "../context/LoggedInContext";
import { backendUrl } from "../api/api";

const SignInPage = () => {
  const { user, setUser } = useContext(UserContext);
  const { loggedIn, setLoggedIn } = useContext(LoggedInContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    console.log("signin ", user);

    const res = await fetch(`${backendUrl}/api/v1/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    setUser(data);

    setLoggedIn(true);
    setEmail("");
    setPassword("");

    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("loggedIn", JSON.stringify(true));

    navigate("/");
  };

  return (
    <div className="min-h-svh flex flex-col justify-between px-5 pb-12 pt-4">
      <div className="flex flex-col">
        <LogoCanvas scale={0.3} />
        <h1 className="text-center mb-6 text-purple-1 self-center font-roboto-bold text-xl border-b-2 border-green-1">
          Sign In
        </h1>
        <form className="flex flex-col gap-6">
          <CustomInput
            type="text"
            label="Email"
            icon={<EmailIcon sx={{ color: "#00ECAA" }} />}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <CustomInput
            type="password"
            label="Password"
            icon={<LockIcon sx={{ color: "#00ECAA" }} />}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </form>
      </div>
      <div className="flex flex-col gap-4 items-center pt-6">
        <CustomButton
          fontSize="16px"
          width="100%"
          borderRadius="15px"
          bgcolor="#7254EE"
          bgcolorHover="#5D3EDE"
          padding="16px"
          text="Sign In"
          endIcon={<ArrowCircleRightIcon />}
          onClick={handleSignIn}
        />
        <p className="text-sm text-green-1">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="font-roboto-bold text-purple-2 hover:text-purple-1 underline underline-offset-4">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
