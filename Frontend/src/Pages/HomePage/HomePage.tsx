import ChatWindow from "../../Components/ChatWindow/ChatWindow";
import ResizableSplit from "../../Components/ResizableSplit/ResizableSplit";
import Sidebar from "../../Components/Sidebar/Sidebar";

export default function HomePage() {
  return (
    <div className="flex-auto mx-auto max-h-[calc(100%-2rem)] container">
      <ResizableSplit left={<Sidebar />} right={<ChatWindow />} />
    </div>
  );
}
