import { useState } from 'react'

export const useToggleView = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const toggleView = () => {
    if (view === 'grid') {
      setView('list')
    } else {
      setView('grid')
    }
  }

  return {
    view,
    toggleView
  }
}
