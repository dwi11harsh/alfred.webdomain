'use client'

import { memo } from 'react'
import { useMessage } from '@/zustand'

// This component only subscribes to the message value
// It will only rerender when message changes
const MessageDisplay = memo(function MessageDisplay() {
  const message = useMessage()
  
  if (!message) return null
  
  return (
    <div className="neo-inset neo-rounded-sm p-4 text-[var(--text-secondary)]">
      {message}
    </div>
  )
})

export default MessageDisplay

