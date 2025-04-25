import Sidebar_Card from "./Sidebar_Card";

export default function Sidebar() {
  const data = [
    {
      name: "javad",
      messages: [{ content: "hello", timestamp: "2min" }],
      image: "https://example.com/javad.jpg",
    },
  ];

  return (
    <div className="flex bg-bg-cream rounded">
      <Sidebar_Card chat={data[0]} />
    </div>
  );
}
