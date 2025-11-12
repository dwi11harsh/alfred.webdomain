"use client";

import { memo } from "react";
import { useActiveTab, useSetActiveTab } from "@/zustand";
import type { TabType } from "@/zustand";

const TabSwitcher = memo(function TabSwitcher() {
  const activeTab = useActiveTab();
  const setActiveTab = useSetActiveTab();

  const tabs: { id: TabType; label: string }[] = [
    { id: "preview", label: "Preview" },
    { id: "files", label: "Files" },
  ];

  return (
    <div className="flex gap-2 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`neo-rounded-sm px-6 py-2 font-medium transition-all ${
            activeTab === tab.id
              ? "neo-pressed text-[var(--text-primary)]"
              : "neo-flat text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
});

export default TabSwitcher;

