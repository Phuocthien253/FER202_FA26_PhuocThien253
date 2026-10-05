import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  const showToast = useCallback((message, variant = "success") => {
    setToast({
      show: true,
      message,
      variant,
    });
  }, []);

  const hideToast = useCallback(() => {
    setToast((current) => ({
      ...current,
      show: false,
    }));
  }, []);

  const value = useMemo(
    () => ({
      showToast,
    }),
    [showToast]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      <ToastContainer
        position="top-end"
        className="p-3"
      >
        <Toast
          show={toast.show}
          onClose={hideToast}
          delay={3000}
          autohide
          bg={toast.variant}
        >
          <Toast.Header>
            <strong className="me-auto">
              Notification
            </strong>
          </Toast.Header>

          <Toast.Body
            className={
              toast.variant === "dark"
                ? "text-white"
                : ""
            }
          >
            {toast.message}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (context === null) {
    throw new Error(
      "useToast phải được dùng bên trong <ToastProvider>"
    );
  }

  return context;
}