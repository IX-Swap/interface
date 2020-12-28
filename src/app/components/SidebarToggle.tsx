import { useAppActions, useAppState } from 'app/hooks/useAppState'
import { ComponentType, createElement } from 'react'

export interface SidebarToggleRenderProps {
  toggle: () => void
  isOpened: boolean
}

export interface SidebarToggleProps {
  render: ComponentType<SidebarToggleRenderProps>
}

export const SidebarToggle = (props: SidebarToggleProps) => {
  const { render } = props
  const { isSidebarOpened } = useAppState()
  const { setSidebarOpened } = useAppActions()

  const toggleSidebar = () => setSidebarOpened(!isSidebarOpened)

  return createElement(render, {
    isOpened: isSidebarOpened,
    toggle: toggleSidebar
  })
}
