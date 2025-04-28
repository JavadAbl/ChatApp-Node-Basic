import ChatWindow from "../../Components/ChatWindow/ChatWindow";
import ResizableSplit from "../../Components/ResizableSplit/ResizableSplit";
import Sidebar from "../../Components/Sidebar/Sidebar";

export default function HomePage() {
  const data = {
    name: "Jane Doe",
    image: "https://i.pravatar.cc/150?img=3",
    messages: [
      {
        message: "Hey, are you coming today?",
        fromMe: false,
        timestamp: new Date(),
      },
      {
        message: "Yes, I'm planning to. What about you?",
        fromMe: true,
        timestamp: new Date(),
      },
    ],
  };

  return (
    <div className="flex-auto mx-auto container">
      <ResizableSplit
        left={<Sidebar />}
        right={<ChatWindow selectedContact={data} />}
      />
    </div>
  );
}
