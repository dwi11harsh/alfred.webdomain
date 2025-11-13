import { PromptInput } from "@/components";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--bg-secondary)] rounded-full blur-3xl opacity-20 animate-pulse" />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--bg-tertiary)] rounded-full blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--bg-secondary)] rounded-full blur-3xl opacity-10" />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(var(--border-color) 1px, transparent 1px),
            linear-gradient(90deg, var(--border-color) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full px-4">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 text-[var(--text-primary)]">
            What will you create today?
          </h1>
          <p className="text-xl text-[var(--text-secondary)]">
            Create stunning apps & websites by chatting with AI
          </p>
        </div>
        <PromptInput />
      </div>
    </main>
  );
}
