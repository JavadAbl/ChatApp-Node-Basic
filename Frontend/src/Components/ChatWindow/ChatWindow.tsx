export default function ChatWindow({ selectedContact }) {
  if (!selectedContact) {
    return (
      <div className="flex flex-1 justify-center items-center h-full text-gray-500">
        Select a chat to start messaging
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4 h-full">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4 pb-4 border-gray-200 border-b">
        <div className="avatar">
          <div className="rounded-full w-12">
            <img src={selectedContact.image} alt="User Avatar" />
          </div>
        </div>
        <div>
          <h2 className="font-semibold text-lg">{selectedContact.name}</h2>
          <p className="text-gray-400 text-xs">Online</p>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 space-y-4 overflow-y-auto">
        {selectedContact.messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat ${msg.fromMe ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-bubble">{msg.message}</div>
          </div>
        ))}
      </div>

      {/* Input box */}
      <div className="flex items-center gap-2 mt-4">
        <input
          type="text"
          placeholder="Type a message..."
          className="input-bordered w-full input"
        />
        <button className="btn btn-primary">Send</button>
      </div>
    </div>
  );
}
