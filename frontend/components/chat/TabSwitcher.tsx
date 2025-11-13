export default function TabSwitcher() {
  return (
    <div className="flex gap-2 mb-4">
      <button className="neo-rounded-sm px-6 py-2 font-medium transition-all neo-pressed text-[var(--text-primary)]">
        Preview
      </button>
      <button className="neo-rounded-sm px-6 py-2 font-medium transition-all neo-flat text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
        Files
      </button>
    </div>
  );
}
