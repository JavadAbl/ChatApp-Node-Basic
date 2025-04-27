import Sidebar_Card from "./Sidebar_Card";

export default function Sidebar() {
  const data = [
    {
      image: "https://i.pravatar.cc/150?img=3",
      name: "Jane Doe",
      lastMessage: "Hey, are you coming today?",
      date: "2:45 PM",
      unreadCount: 3,
    },
  ];

  return (
    <div className="flex flex-col items-stretch justify-content-start bg-bg-cream border border-border-tan rounded min-h-[75vh]">
      <Sidebar_Card chat={data[0]} />
      <Sidebar_Card chat={data[0]} />
    </div>
  );
}
