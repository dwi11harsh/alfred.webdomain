'use client'

import { memo } from 'react'
import { useIncrement, useDecrement, useReset } from '@/zustand'
import Button from '../ui/Button'

// This component only subscribes to action functions
// It will never rerender because functions are stable references
const CountControls = memo(function CountControls() {
  const increment = useIncrement()
  const decrement = useDecrement()
  const reset = useReset()
  
  return (
    <div className="flex gap-4">
      <Button onClick={increment} variant="primary">
        Increment
      </Button>
      <Button onClick={decrement} variant="primary">
        Decrement
      </Button>
      <Button onClick={reset} variant="secondary">
        Reset
      </Button>
    </div>
  )
})

export default CountControls

