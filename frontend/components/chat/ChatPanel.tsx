'use client'

import { memo, useRef, useEffect } from 'react'
import { useMessages, useIsLoading } from '@/zustand'
import Card from '../ui/Card'

const ChatPanel = memo(function ChatPanel() {
  const messages = useMessages()
  const isLoading = useIsLoading()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="h-full flex flex-col">
      <div className="neo-outset neo-rounded-sm p-4 mb-4">
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">Chat</h2>
      </div>
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.length === 0 ? (
          <div className="text-center text-[var(--text-tertiary)] mt-8">
            Start a conversation to begin building
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`neo-flat neo-rounded-lg p-4 max-w-[80%] ${
                  message.role === 'user'
                    ? 'bg-[var(--bg-tertiary)] text-[var(--text-primary)]'
                    : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="neo-flat neo-rounded-lg p-4 bg-[var(--bg-secondary)]">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-[var(--text-tertiary)] rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-[var(--text-tertiary)] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-[var(--text-tertiary)] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
})

export default ChatPanel

