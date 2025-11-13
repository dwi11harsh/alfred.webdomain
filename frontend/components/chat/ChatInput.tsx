export default function ChatInput() {
  return (
    <div className="neo-outset neo-rounded-sm p-3">
      <div className="flex items-end gap-2">
        <textarea
          placeholder="Type your message..."
          className="flex-1 bg-transparent border-none outline-none resize-none text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] text-sm min-h-[40px] max-h-[120px] overflow-y-auto"
          rows={1}
        />
        <button className="neo-pressed neo-rounded-sm px-4 py-2 text-[var(--text-primary)] text-sm font-medium transition-opacity">
          Send
        </button>
      </div>
    </div>
  );
}
