import { useNavigate } from "react-router-dom";
import { useApi } from "./useApi";
import { useState } from "react";

export const useLogin = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const login = async (e: any) => {
    e.preventDefault();
    const res = await useApi.post(
      "/login",
      {
        email,
        password,
      },
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    console.log(res.data);
    localStorage.setItem("user", JSON.stringify(res.data));
    navigate("/");
  };
  return { login, setEmail, setPassword, email, password };
};
