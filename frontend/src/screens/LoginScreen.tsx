import { Link, useNavigate } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { useState } from "react";

const LoginScreen = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const login = async (e: any) => {
    e.preventDefault();
    const res = await useApi.post("/login", {
      email,
      password,
    });
    console.log(res.data);
    localStorage.setItem("user", JSON.stringify(res.data));
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-20">
      {/* logo */}
      <div className="relative w-[200px] h-[200px]">
        <img
          src="src\assets\IGname.png"
          alt="logo"
          className="w-full h-full object-contain"
        />
      </div>
      {/* loginform */}
      <section className="bg-gray-50 ">
        <div className="flex flex-col items-center justify-center px-6 mx-auto  lg:py-0">
          <div className="w-[400px] h-[60vh] flex justify-center flex-col items-center  bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-10 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                login account
              </h1>
              <form
                className="space-y-6 md:space-y-6 flex flex-col gap-4 "
                onSubmit={login}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    placeholder="name@company.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Login an account
                </button>
              </form>
              <div className="text-center">
                <Link
                  to="/register"
                  className="text-sm font-medium text-gray-900 dark:text-white hover:underline mt-4"
                >
                  if yoh have an account? Create Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginScreen;
