"use client";

import { useSetCurrentPrompt, useSetProjectId } from "@/zustand";
import { useRouter } from "next/navigation";
import { KeyboardEvent, memo, useEffect, useRef, useState } from "react";

const PromptInput = memo(function PromptInput() {
  const [prompt, setPrompt] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const setCurrentPrompt = useSetCurrentPrompt();
  const setProjectId = useSetProjectId();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [prompt]);

  const handleSubmit = () => {
    if (!prompt.trim()) return;

    const projectId = Date.now().toString();
    setCurrentPrompt(prompt.trim());
    setProjectId(projectId);
    router.push(`/project/${projectId}`);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="neo-outset neo-rounded-lg p-4 flex items-end gap-3">
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What will you create today?"
          className="flex-1 bg-transparent border-none outline-none resize-none text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] text-lg min-h-[60px] max-h-[200px] overflow-y-auto"
          rows={1}
        />
        <button
          onClick={handleSubmit}
          disabled={!prompt.trim()}
          className="neo-pressed neo-rounded-sm px-6 py-3 text-[var(--text-primary)] font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          Create
        </button>
      </div>
    </div>
  );
});

export default PromptInput;
