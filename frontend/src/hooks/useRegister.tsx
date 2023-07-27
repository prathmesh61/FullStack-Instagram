import { useNavigate } from "react-router-dom";
import { useApi } from "./useApi";
import { useState } from "react";

export const useRegister = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const register = async (event: any) => {
    event.preventDefault();
    try {
      const res = await useApi.post("/createuser", { email, name, password });
      if (res.data) {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    }
  };
  return { register, setName, setEmail, setPassword, email, name, password };
};
