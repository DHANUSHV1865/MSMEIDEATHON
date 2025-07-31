import Sidebar from "./Sidebar";

export default function LayoutWithSidebar({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 min-h-screen" style={{ backgroundColor: "#435355" }}>
        {children}
      </div>
    </div>
  );
}
