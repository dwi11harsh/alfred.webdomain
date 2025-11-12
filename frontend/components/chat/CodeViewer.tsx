"use client";

import { memo } from "react";
import { useSelectedFile, useFileContents } from "@/zustand";
import Card from "../ui/Card";

const CodeViewer = memo(function CodeViewer() {
  const selectedFile = useSelectedFile();
  const fileContents = useFileContents();

  const content = selectedFile ? fileContents[selectedFile] : null;

  if (!selectedFile) {
    return (
      <Card variant="outset" className="h-full flex items-center justify-center">
        <div className="text-center text-[var(--text-tertiary)]">
          <p className="text-lg mb-2">No file selected</p>
          <p className="text-sm">Select a file from the navigator to view its contents</p>
        </div>
      </Card>
    );
  }

  return (
    <Card variant="inset" className="h-full">
      <div className="h-full flex flex-col">
        <div className="neo-flat neo-rounded-sm p-2 mb-2">
          <span className="text-sm text-[var(--text-secondary)] font-mono">
            {selectedFile}
          </span>
        </div>
        <div className="flex-1 overflow-auto">
          <pre className="text-sm text-[var(--text-secondary)] font-mono p-4 whitespace-pre-wrap">
            <code>{content || "// Loading..."}</code>
          </pre>
        </div>
      </div>
    </Card>
  );
});

export default CodeViewer;

