'use client'

import { memo } from 'react'
import { useSidebarOpen, useToggleSidebar } from '@/zustand'
import Button from '../ui/Button'

// This component only subscribes to sidebar state and toggle function
// It will only rerender when sidebarOpen changes
const SidebarToggle = memo(function SidebarToggle() {
  const sidebarOpen = useSidebarOpen()
  const toggleSidebar = useToggleSidebar()
  
  return (
    <Button onClick={toggleSidebar} variant="outline">
      {sidebarOpen ? 'Close' : 'Open'} Sidebar
    </Button>
  )
})

export default SidebarToggle

