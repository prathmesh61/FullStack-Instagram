import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import { useGetStrogeItem } from "../hooks/useGetStrogeItem";
import { useLogout } from "../hooks/useLogout";
import { BsSearch, BsMessenger } from "react-icons/bs";
const Header = () => {
  const { loginUser } = useGetStrogeItem();
  const { logout } = useLogout();
  return (
    <div className="  text-white h-[80px] flex justify-between items-center border-b-2 border-gray-800">
      <Link to="/" className="w-[40px] h-[30px] ">
        <img
          src="\src\assets\instagram.png"
          alt="logo"
          className="object-contain"
        />
      </Link>
      <div className="flex items-center space-x-8">
        <div className="flex item-center space-x-8">
          <BsSearch className="text-white w-[16px] h-[16px] cursor-pointer" />
          <BsMessenger className="text-white w-[16px] h-[16px] cursor-pointer" />
        </div>
        <details className="dropdown  ">
          <summary className="m-1 cursor-pointer text-white">
            <Avatar name={loginUser?.user.name} round={true} size="30" />
          </summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-fit">
            <li>
              <Link to="/profile/:id">Progile</Link>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </ul>
        </details>
      </div>
    </div>
  );
};

export default Header;
