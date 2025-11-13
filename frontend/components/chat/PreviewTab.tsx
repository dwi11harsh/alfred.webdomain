import Card from '../ui/Card'

export default function PreviewTab() {
  return (
    <div className="h-full">
      <Card variant="outset" className="h-full flex items-center justify-center">
        <div className="text-center text-[var(--text-tertiary)]">
          <p className="text-lg mb-2">Preview will appear here</p>
          <p className="text-sm">Start chatting to generate your app</p>
        </div>
      </Card>
    </div>
  );
}
