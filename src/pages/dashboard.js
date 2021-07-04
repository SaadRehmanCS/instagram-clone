import { useEffect } from "react";
import Header from "../components/Header";
import Timeline from "../components/Timeline";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  useEffect(() => document.title = "Dashboard");
  return (
    <div>
    <Header />
    <div className="grid">
      <Timeline />
      <Sidebar />
    </div>
    </div>
  );
}
