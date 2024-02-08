"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.bubble.css";

interface PreviewProps {
  value: string; // Current value
}

export const Preview = ({ value }: PreviewProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  // https://chat.openai.com/share/d2f7c222-0c6d-4fda-9878-065383b4227d

  return <ReactQuill theme="bubble" value={value} readOnly />;
};
