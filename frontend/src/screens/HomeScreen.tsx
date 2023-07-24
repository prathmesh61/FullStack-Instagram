import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const navigate = useNavigate();

  if (!localStorage.getItem("user")) {
    navigate("/login");
  }

  const user: unknown = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = async () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      Home: {user?.user?.name}
      <br />
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default HomeScreen;
