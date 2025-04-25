import { Outlet } from "react-router";
import Navbar from "../../Components/Navbar/Navbar";

export default function Index() {
  return (
    <div className="bg-bg-l1 min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
}
