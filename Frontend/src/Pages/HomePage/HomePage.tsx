import ResizableSplit from "../../Components/ResizableSplit/ResizableSplit";
import Sidebar from "../../Components/Sidebar/Sidebar";

export default function HomePage() {
  return (
    <div className="bg-red-400 mx-auto min-h-[75vh] container">
      <ResizableSplit
        left={
          <div className="w-[30vw] max-w-80">
            <Sidebar />
          </div>
        }
        right={
          <div className="w-[70vw] max-w-80">
            <div className="p-4">Home Page</div>
          </div>
        }
      />
    </div>
  );
}
