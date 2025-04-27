import ResizableSplit from "../../Components/ResizableSplit/ResizableSplit";
import Sidebar from "../../Components/Sidebar/Sidebar";

export default function HomePage() {
  return (
    <div className="bg-red-400 mx-auto container">
      <ResizableSplit
        left={<Sidebar />}
        right={<div className="">Home Page</div>}
      />
    </div>
  );
}
