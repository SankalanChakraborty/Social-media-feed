import { useEffect, useState } from "react";
import "./Toast.css";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
}

const Toast = ({ message, type }: ToastProps) => {
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const hideTimer = setTimeout(() => setHiding(true), 2000); // start exit before unmount
    return () => clearTimeout(hideTimer);
  }, []);
  return (
    <div
      className={`toast-wrapper toast-${type} ${hiding ? "toast-hide" : ""}`}
    >
      {type === "success" ? (
        <svg width="20" height="20" viewBox="0 0 12 12" fill="none">
          <path
            d="M2 6l3 3 5-5"
            stroke="#fff"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 12 12" fill="none">
          <path
            d="M2 2l8 8M10 2l-8 8"
            stroke="#fff"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      <p className="toast-title">{message}</p>
    </div>
  );
};

export default Toast;
