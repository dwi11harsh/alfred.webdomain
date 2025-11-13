import Card from '../ui/Card'

export default function CodeTab() {
  return (
    <div className="h-full">
      <Card variant="inset" className="h-full">
        <div className="h-full overflow-auto">
          <pre className="text-sm text-[var(--text-secondary)] font-mono p-4">
            <code>{`// Code will appear here
// Start chatting to generate code`}</code>
          </pre>
        </div>
      </Card>
    </div>
  )
}
