"use client";

import { Toaster } from "react-hot-toast";

export const ToastProvider = () => {
  return (
    <Toaster
      toastOptions={{
        error: {
          duration: 7000,
          style: {
            background: "#ff3640",
            color: "#fff",
          },
          iconTheme: {
            primary: "white",
            secondary: "red",
          },
        },
      }}
    />
  );
};
