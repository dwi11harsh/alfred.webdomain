'use client'

import { memo } from 'react'
import { useCount } from '@/zustand'

// This component only subscribes to the count value
// It will only rerender when count changes
const CountDisplay = memo(function CountDisplay() {
  const count = useCount()
  
  return (
    <div className="text-2xl font-bold text-[var(--text-primary)]">
      Count: {count}
    </div>
  )
})

export default CountDisplay

