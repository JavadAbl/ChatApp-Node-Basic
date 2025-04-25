export default function Sidebar_Card({ chat }: any) {
  return (
    <div style={{ width: "250px" }} className="flex gap-x-1">
      <div className="flex justify-center items-center">
        <img className="" src="vite.svg" alt="" />
      </div>

      <div className="flex-auto px-1">
        <div className="flex justify-between">
          <span>{chat.name}</span>
          <span>{chat.messages[0].timestamp}</span>
        </div>

        <div className="flex justify-between">
          <span className="flex-auto">{chat.messages[0].content}</span>
          <span className="bg-bg-l2 rounded-full">{"2"}</span>
        </div>
      </div>
    </div>
  );
}
