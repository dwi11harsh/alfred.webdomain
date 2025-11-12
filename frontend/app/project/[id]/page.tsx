"use client";

import { BACKEND_URL } from "@/app/config";
import {
  ChatInput,
  ChatPanel,
  FilesTab,
  PreviewTab,
  TabSwitcher,
} from "@/components";
import { dummyFileTree, extractFileContents } from "@/utils/dummyProject";
import { parseXml } from "@/utils/parseXml";
import {
  useActiveTab,
  useAddMessage,
  useCurrentPrompt,
  useSetCurrentPrompt,
  useSetFileContent,
  useSetFileTree,
  useSetProjectId,
} from "@/zustand";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProjectPage() {
  const [steps, setSteps] = useState([]);
  const params = useParams();
  const projectId = params.id as string;
  const currentPrompt = useCurrentPrompt();
  const setCurrentPrompt = useSetCurrentPrompt();
  const setProjectId = useSetProjectId();
  const addMessage = useAddMessage();
  const activeTab = useActiveTab();
  const setFileTree = useSetFileTree();
  const setFileContent = useSetFileContent();

  useEffect(() => {
    if (projectId) {
      setProjectId(projectId);

      // Initialize dummy file tree
      setFileTree(dummyFileTree);
      const fileContents = extractFileContents(dummyFileTree);
      Object.entries(fileContents).forEach(([path, content]) => {
        setFileContent(path, content);
      });

      // If there's a current prompt, add it as the first message
      if (currentPrompt) {
        addMessage({
          role: "user",
          content: currentPrompt,
        });
        setCurrentPrompt("");
      }
    }
  }, [
    projectId,
    currentPrompt,
    setProjectId,
    addMessage,
    setCurrentPrompt,
    setFileTree,
    setFileContent,
  ]);

  const init = async () => {
    // Only call API if we have a prompt
    if (!currentPrompt) {
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_URL}/template`, {
        prompt: currentPrompt.trim(),
      });

      const { prompts, uiPrompts } = response.data;

      console.log("prompts: ", prompts);
      console.log("ui prompts: ", uiPrompts);

      setSteps(uiPrompts.map((x: string) => parseXml(x)));

      const stepsResponse = await axios.post(`${BACKEND_URL}/chat`, {
        messages: [...prompts, currentPrompt].map((content) => ({
          role: "user",
          content,
        })),
      });

      console.log("steps response : ", stepsResponse);
    } catch (error) {
      console.error("Error calling /template endpoint:", error);
      if (axios.isAxiosError(error)) {
        if (error.code === "ECONNREFUSED" || error.code === "ERR_NETWORK") {
          console.error("Backend server is not running or not accessible");
        } else {
          console.error("Error response:", error.response?.data);
        }
      }
    }
  };

  useEffect(() => {
    init();
  }, [currentPrompt]);

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
