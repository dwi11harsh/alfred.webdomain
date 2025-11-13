export default function PromptInput() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="neo-outset neo-rounded-lg p-4 flex items-end gap-3">
        <textarea
          placeholder="What will you create today?"
          className="flex-1 bg-transparent border-none outline-none resize-none text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] text-lg min-h-[60px] max-h-[200px] overflow-y-auto"
          rows={1}
        />
        <button className="neo-pressed neo-rounded-sm px-6 py-3 text-[var(--text-primary)] font-medium transition-opacity">
          Create
        </button>
      </div>
    </div>
  );
}
