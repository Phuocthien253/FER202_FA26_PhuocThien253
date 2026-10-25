
import { Outlet } from "react-router-dom";
import AppNavbar from "./AppNavbar";

export default function Layout() {
  return (
    <>
      <AppNavbar />
      <main className="container py-4">
        <Outlet />
      </main>
    </>
  );
}
