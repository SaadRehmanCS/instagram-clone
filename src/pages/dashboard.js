import { useEffect } from "react";
import Header from "../components/Header";
import Timeline from "../components/Timeline";
import Sidebar from '../components/Sidebar/index';

export default function Dashboard() {
  useEffect(() => document.title = "Dashboard");
  return (
    <div>
    <Header />
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <Timeline />
      <Sidebar />
    </div>
    </div>
  );
}
