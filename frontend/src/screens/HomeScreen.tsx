import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Leftbar from "../components/Leftbar";
import TimeLine from "../components/TimeLine";

const HomeScreen = () => {
  const navigate = useNavigate();

  if (!localStorage.getItem("user")) {
    navigate("/login");
  }

  return (
    <div className="mx-10 md:mx-15">
      <Header />
      <div className="flex mt-10">
        <div className="h-full w-[25%] md:w-[20%] ">
          <Leftbar />
        </div>
        <div className="g-full w-[75%] ">
          <TimeLine />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
