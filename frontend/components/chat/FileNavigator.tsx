"use client";

import { memo, useState } from "react";
import { useFileTree, useSetSelectedFile, useSetFileContent } from "@/zustand";
import type { FileNode } from "@/zustand";

interface FileItemProps {
  node: FileNode;
  level: number;
  onSelect: (path: string) => void;
}

const FileItem = memo(function FileItem({
  node,
  level,
  onSelect,
}: FileItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    if (node.type === "folder") {
      setIsExpanded(!isExpanded);
    } else {
      onSelect(node.path);
    }
  };

  const icon = node.type === "folder" ? (isExpanded ? "📂" : "📁") : "📄";

  return (
    <div>
      <div
        onClick={handleClick}
        className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-[var(--bg-tertiary)] rounded-sm text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        style={{ paddingLeft: `${level * 16 + 8}px` }}
      >
        <span className="text-base">{icon}</span>
        <span>{node.name}</span>
      </div>
      {node.type === "folder" && isExpanded && node.children && (
        <div>
          {node.children.map((child) => (
            <FileItem
              key={child.path}
              node={child}
              level={level + 1}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
});

const FileNavigator = memo(function FileNavigator() {
  const fileTree = useFileTree();
  const setSelectedFile = useSetSelectedFile();
  const setFileContent = useSetFileContent();

  const handleFileSelect = (path: string) => {
    setSelectedFile(path);
    // Simulate loading file content (in real implementation, this would fetch from API)
    setFileContent(path, `// Content of ${path}\n// This is a placeholder\n\n// Replace this with actual file content from your API`);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="neo-outset neo-rounded-sm p-3 mb-2">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">
          Files
        </h3>
      </div>
      <div className="flex-1 overflow-y-auto">
        {fileTree.length === 0 ? (
          <div className="text-center text-[var(--text-tertiary)] text-sm mt-4">
            No files yet
          </div>
        ) : (
          <div>
            {fileTree.map((node) => (
              <FileItem
                key={node.path}
                node={node}
                level={0}
                onSelect={handleFileSelect}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

export default FileNavigator;

