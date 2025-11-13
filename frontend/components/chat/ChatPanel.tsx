import Card from '../ui/Card'

export default function ChatPanel() {
  return (
    <div className="h-full flex flex-col">
      <div className="neo-outset neo-rounded-sm p-4 mb-4">
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">Chat</h2>
      </div>
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        <div className="flex justify-end">
          <div className="neo-flat neo-rounded-lg p-4 max-w-[80%] bg-[var(--bg-tertiary)] text-[var(--text-primary)]">
            <p className="whitespace-pre-wrap">Hello, I want to create a todo app</p>
          </div>
        </div>
        <div className="flex justify-start">
          <div className="neo-flat neo-rounded-lg p-4 max-w-[80%] bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
            <p className="whitespace-pre-wrap">I understand you want to create: Hello, I want to create a todo app. Let me help you build that!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
