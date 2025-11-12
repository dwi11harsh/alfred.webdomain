'use client'

import { memo, useState, KeyboardEvent, useRef, useEffect } from 'react'
import { useAddMessage, useSetIsLoading } from '@/zustand'

const ChatInput = memo(function ChatInput() {
  const [input, setInput] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const addMessage = useAddMessage()
  const setIsLoading = useSetIsLoading()

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [input])

  const handleSubmit = async () => {
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput('')
    
    addMessage({
      role: 'user',
      content: userMessage,
    })

    setIsLoading(true)
    
    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      addMessage({
        role: 'assistant',
        content: 'I understand you want to create: ' + userMessage + '. Let me help you build that!',
      })
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="neo-outset neo-rounded-sm p-3">
      <div className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-1 bg-transparent border-none outline-none resize-none text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] text-sm min-h-[40px] max-h-[120px] overflow-y-auto"
          rows={1}
        />
        <button
          onClick={handleSubmit}
          disabled={!input.trim()}
          className="neo-pressed neo-rounded-sm px-4 py-2 text-[var(--text-primary)] text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          Send
        </button>
      </div>
    </div>
  )
})

export default ChatInput

