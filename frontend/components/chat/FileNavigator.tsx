export default function FileNavigator() {
  return (
    <div className="h-full flex flex-col">
      <div className="neo-outset neo-rounded-sm p-3 mb-2">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">
          Files
        </h3>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div>
          <div className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-[var(--bg-tertiary)] rounded-sm text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors" style={{ paddingLeft: '8px' }}>
            <span className="text-base">📂</span>
            <span>app</span>
          </div>
          <div className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-[var(--bg-tertiary)] rounded-sm text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors" style={{ paddingLeft: '24px' }}>
            <span className="text-base">📄</span>
            <span>layout.tsx</span>
          </div>
          <div className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-[var(--bg-tertiary)] rounded-sm text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors" style={{ paddingLeft: '24px' }}>
            <span className="text-base">📄</span>
            <span>page.tsx</span>
          </div>
          <div className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-[var(--bg-tertiary)] rounded-sm text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors" style={{ paddingLeft: '24px' }}>
            <span className="text-base">📄</span>
            <span>globals.css</span>
          </div>
        </div>
      </div>
    </div>
  );
}
