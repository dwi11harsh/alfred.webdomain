import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export type TabType = "preview" | "files";

export interface FileNode {
  name: string;
  path: string;
  type: "file" | "folder";
  children?: FileNode[];
  content?: string;
}

interface ChatState {
  messages: Message[];
  currentPrompt: string;
  activeTab: TabType;
  projectId: string | null;
  isLoading: boolean;
  fileTree: FileNode[];
  selectedFile: string | null;
  fileContents: Record<string, string>;
}

interface ChatActions {
  addMessage: (message: Omit<Message, "id" | "timestamp">) => void;
  setCurrentPrompt: (prompt: string) => void;
  setActiveTab: (tab: TabType) => void;
  setProjectId: (id: string) => void;
  setIsLoading: (loading: boolean) => void;
  setFileTree: (tree: FileNode[]) => void;
  setSelectedFile: (path: string | null) => void;
  setFileContent: (path: string, content: string) => void;
  clearMessages: () => void;
  reset: () => void;
}

type ChatStore = ChatState & ChatActions;

const initialState: ChatState = {
  messages: [],
  currentPrompt: "",
  activeTab: "preview",
  projectId: null,
  isLoading: false,
  fileTree: [],
  selectedFile: null,
  fileContents: {},
};

export const useChatStore = create<ChatStore>()(
  subscribeWithSelector((set) => ({
    ...initialState,
    addMessage: (message) =>
      set((state) => ({
        messages: [
          ...state.messages,
          {
            ...message,
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            timestamp: new Date(),
          },
        ],
      })),
    setCurrentPrompt: (prompt) => set({ currentPrompt: prompt }),
    setActiveTab: (tab) => set({ activeTab: tab }),
    setProjectId: (id) => set({ projectId: id }),
    setIsLoading: (loading) => set({ isLoading: loading }),
    setFileTree: (tree) => set({ fileTree: tree }),
    setSelectedFile: (path) => set({ selectedFile: path }),
    setFileContent: (path, content) =>
      set((state) => ({
        fileContents: { ...state.fileContents, [path]: content },
      })),
    clearMessages: () => set({ messages: [] }),
    reset: () => set(initialState),
  }))
);

// Selectors for optimized subscriptions
export const useMessages = () => useChatStore((state) => state.messages);
export const useCurrentPrompt = () =>
  useChatStore((state) => state.currentPrompt);
export const useActiveTab = () => useChatStore((state) => state.activeTab);
export const useProjectId = () => useChatStore((state) => state.projectId);
export const useIsLoading = () => useChatStore((state) => state.isLoading);
export const useAddMessage = () => useChatStore((state) => state.addMessage);
export const useSetCurrentPrompt = () =>
  useChatStore((state) => state.setCurrentPrompt);
export const useSetActiveTab = () =>
  useChatStore((state) => state.setActiveTab);
export const useSetProjectId = () =>
  useChatStore((state) => state.setProjectId);
export const useSetIsLoading = () =>
  useChatStore((state) => state.setIsLoading);
export const useFileTree = () => useChatStore((state) => state.fileTree);
export const useSelectedFile = () =>
  useChatStore((state) => state.selectedFile);
export const useFileContents = () =>
  useChatStore((state) => state.fileContents);
export const useSetFileTree = () => useChatStore((state) => state.setFileTree);
export const useSetSelectedFile = () =>
  useChatStore((state) => state.setSelectedFile);
export const useSetFileContent = () =>
  useChatStore((state) => state.setFileContent);
