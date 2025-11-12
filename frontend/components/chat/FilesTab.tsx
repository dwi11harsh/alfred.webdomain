"use client";

import { memo } from "react";
import FileNavigator from "./FileNavigator";
import CodeViewer from "./CodeViewer";

const FilesTab = memo(function FilesTab() {
  return (
    <div className="h-full flex gap-4">
      {/* File Navigator - 25% of available width */}
      <div className="w-1/4 border-r border-[var(--border-color)]">
        <FileNavigator />
      </div>
      {/* Code Viewer - 75% of available width */}
      <div className="flex-1">
        <CodeViewer />
      </div>
    </div>
  );
});

export default FilesTab;

