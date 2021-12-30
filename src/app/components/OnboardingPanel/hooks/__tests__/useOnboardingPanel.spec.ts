import { act, renderHook } from '@testing-library/react-hooks'
import { useOnboardingPanel } from 'app/components/OnboardingPanel/hooks/useOnboardingPanel'
import * as useAppState from 'app/hooks/useAppState'
import { waitFor } from 'test-utils'

describe('useOnboardingPanel', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('returns correct value from app state', async () => {
    await act(async () => {
      const appState = {
        isOnboardingPanelOpen: true
      }

      jest
        .spyOn(useAppState, 'useAppState')
        .mockImplementation(() => appState as any)

      const setOpenMock = jest.fn()
      const appActions = {
        setOnboardingPanelOpened: setOpenMock
      }

      jest
        .spyOn(useAppState, 'useAppActions')
        .mockImplementation(() => appActions as any)

      const { result } = renderHook(() => useOnboardingPanel())

      await waitFor(
        () => {
          expect(result.current).toEqual({
            open: true,
            setOpen: setOpenMock
          })
        },
        { timeout: 1000 }
      )
    })
  })
})
