import {
  ChatInput,
  ChatPanel,
  FilesTab,
  PreviewTab,
  TabSwitcher,
} from "@/components";

export default function ProjectPage() {
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
          <PreviewTab />
        </div>
      </div>
    </div>
  );
}
