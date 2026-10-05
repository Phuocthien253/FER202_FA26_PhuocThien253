import { ToastProvider } from "./contexts/ToastContext";
import ToastDemo from "./components/ToastDemo";

export default function App() {
  return (
    <ToastProvider>
      <div className="container py-4">
        <ToastDemo />
      </div>
    </ToastProvider>
  );
}