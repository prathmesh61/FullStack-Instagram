import { useNavigate } from "react-router-dom";
import { useGetStrogeItem } from "./hooks/useGetStrogeItem";
import HomeScreen from "./screens/HomeScreen";
import { useEffect } from "react";

const App = () => {
  const { loginUser } = useGetStrogeItem();
  const navigate = useNavigate();
  useEffect(() => {
    if (loginUser == null || loginUser == undefined) {
      return navigate("/login");
    } else {
      return navigate("/");
    }
  }, []);

  return (
    <div className="max-w-screen-2xl mx-auto ">
      <HomeScreen />
    </div>
  );
};

export default App;
