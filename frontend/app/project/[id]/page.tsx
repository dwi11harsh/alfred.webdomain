"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import {
  useCurrentPrompt,
  useSetCurrentPrompt,
  useSetProjectId,
  useAddMessage,
  useActiveTab,
} from "@/zustand";
import {
  ChatPanel,
  ChatInput,
  TabSwitcher,
  PreviewTab,
  FilesTab,
} from "@/components";

export default function ProjectPage() {
  const params = useParams();
  const projectId = params.id as string;
  const currentPrompt = useCurrentPrompt();
  const setCurrentPrompt = useSetCurrentPrompt();
  const setProjectId = useSetProjectId();
  const addMessage = useAddMessage();
  const activeTab = useActiveTab();

  useEffect(() => {
    if (projectId) {
      setProjectId(projectId);

      // If there's a current prompt, add it as the first message
      if (currentPrompt) {
        addMessage({
          role: "user",
          content: currentPrompt,
        });
        setCurrentPrompt("");
      }
    }
  }, [projectId, currentPrompt, setProjectId, addMessage, setCurrentPrompt]);

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Chat Panel - 25% width */}
      <div className="w-1/4 border-r border-[var(--border-color)] flex flex-col p-4 bg-[var(--bg-primary)]">
        <ChatPanel />
        <div className="mt-4">
          <ChatInput />
        </div>
      </div>

      {/* Right Content Area - 75% width */}
      <div className="flex-1 flex flex-col p-4 bg-[var(--bg-primary)]">
        <TabSwitcher />
        <div className="flex-1 overflow-hidden">
          {activeTab === "preview" ? <PreviewTab /> : <FilesTab />}
        </div>
      </div>
    </div>
  );
}

