export default function Sidebar_Card({ chat }: any) {
  return (
    <div className="group flex justify-between items-center bg-bg-cream hover:bg-btn-brown shadow-md p-1 cursor-pointer">
      {/* Left: chat Image */}
      <div className="flex-shrink-0">
        <img
          src={chat.image}
          alt={chat.name}
          className="border-2 border-border-tan rounded-full w-12 h-12 object-cover"
        />
      </div>

      {/* Middle: Name and Last Message */}
      <div className="flex-1 mx-4 min-w-0">
        <div className="font-semibold text-text-main group-hover:text-bg-cream text-base truncate">
          {chat.name}
        </div>
        <div className="text-text-label group-hover:text-bg-cream text-sm truncate">
          {chat.lastMessage}
        </div>
      </div>

      {/* Right: Date and Unread Count */}
      <div className="flex flex-col items-end space-y-1">
        <span className="text-text-label group-hover:text-bg-cream text-xs">
          {chat.date}
        </span>
        {chat.unreadCount > 0 && (
          <div className="bg-btn-brown px-2 py-0.5 rounded-full text-white text-xs">
            {chat.unreadCount}
          </div>
        )}
      </div>
    </div>
  );
}
