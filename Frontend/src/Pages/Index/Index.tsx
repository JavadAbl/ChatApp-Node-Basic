import { Outlet } from "react-router";
import Navbar from "../../Components/Navbar/Navbar";

export default function Index() {
  return (
    <div className="flex flex-col bg-bg-l1 h-screen overflow-y-auto">
      <Navbar />
      <Outlet />
    </div>
  );
}
