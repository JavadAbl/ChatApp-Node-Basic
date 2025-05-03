import { useEffect, useState } from "react";
import { ChatCard, useChatStore } from "../../Store/UseMessageStore";
import Sidebar_Card from "./Sidebar_Card";

export default function Sidebar() {
  const action_getChatList = useChatStore(
    (selector) => selector.action_getChatList
  );
  const [chatCards, setChatCards] = useState<ChatCard[]>([]);

  useEffect(() => {
    action_getChatList().then((data) => setChatCards(data));
  }, []);

  return (
    <div className="flex flex-col items-stretch justify-content-start bg-bg-cream rounded w-full h-[100%]">
      {chatCards.map((item) => (
        <Sidebar_Card chat={item} key={item.user.id.toString()} />
      ))}
    </div>
  );
}
