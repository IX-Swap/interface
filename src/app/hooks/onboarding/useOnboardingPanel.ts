import { useAppActions, useAppState } from 'app/hooks/useAppState'

export const useOnboardingPanel = () => {
  const { isOnboardingPanelOpen } = useAppState()
  const { setOnboardingPanelOpened } = useAppActions()

  return {
    open: isOnboardingPanelOpen,
    setOpen: setOnboardingPanelOpened
  }
}
