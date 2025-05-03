import { MouseEvent, useEffect, useRef, useState } from "react";
import { useChatStore } from "../../Store/UseMessageStore";
import { useUserStore } from "../../Store/UseUserStore";

export default function ChatWindow() {
  const chat = useChatStore((s) => s.currentChat);
  const action_sendMessage = useChatStore((s) => s.action_sendMessage);
  const user = useUserStore((s) => s.user);
  const [message, setMessage] = useState<string>("");
  const [image, setImage] = useState<string>();
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessage("");

    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [chat]);

  const handleSendMessage = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!message || !chat) return;

    action_sendMessage({ content: message, targetId: chat.chatUser.id });
  };

  if (!chat) {
    return (
      <div className="flex flex-1 justify-center items-center h-full text-gray-500">
        Select a chat to start messaging
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4 h-full">
      <div className="flex items-center gap-4 mb-4 pb-4 border-gray-200 border-b">
        <div className="avatar">
          <div className="rounded-full w-12">
            <img src={chat.chatUser.image} alt="User Avatar" />
          </div>
        </div>
        <div>
          <h2 className="font-semibold text-lg">{chat.chatUser.name}</h2>
          <p className="text-gray-400 text-xs">Online</p>
        </div>
      </div>

      <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto">
        {chat.messages.map((msg) => (
          <div
            key={msg.id.toString()}
            className={`chat ${
              msg.senderId == user?.id ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-bubble">{msg.content}</div>
          </div>
        ))}
      </div>

      <form className="flex items-center gap-2 mt-4">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-11/12 input-bordered input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </form>
    </div>
  );
}
