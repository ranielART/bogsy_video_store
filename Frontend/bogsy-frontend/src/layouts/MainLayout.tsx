import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="flex flex-col items-center h-full">
      <title>Bogsy Video Store</title>

      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
