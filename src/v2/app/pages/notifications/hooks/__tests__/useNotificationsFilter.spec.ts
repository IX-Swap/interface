/**  * @jest-environment jsdom-sixteen  */
import { renderHook, act } from '@testing-library/react-hooks'
import { waitFor, cleanup } from 'test-utils'
import {
  defaultNotificationFilter,
  useNotificationsFilter
} from 'v2/app/pages/notifications/hooks/useNotificationsFilter'
import { AppFeature } from 'v2/types/app'

describe('useNotificationsFilter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('has correct default values', () => {
    const { result } = renderHook(() => useNotificationsFilter())

    expect(result.current.filter).toBe(defaultNotificationFilter)
  })

  it('removes item from filter on click', async () => {
    const { result } = renderHook(() => useNotificationsFilter())

    await act(async () => {
      result.current.handleClick(AppFeature.Authentication)

      await waitFor(
        () => {
          expect(result.current.filter).toEqual(
            defaultNotificationFilter.filter(
              i => i !== AppFeature.Authentication
            )
          )
        },
        { timeout: 1000 }
      )
    })
  })

  it('adds item from filter on click', async () => {
    const { result } = renderHook(() => useNotificationsFilter())
    const filtersWithoutAuth = defaultNotificationFilter.filter(
      i => i !== AppFeature.Authentication
    )

    await act(async () => {
      result.current.handleClick(AppFeature.Authentication)
      await waitFor(
        () => expect(result.current.filter).toEqual(filtersWithoutAuth),
        { timeout: 1000 }
      )
    })

    const filtersWithAuth = [...filtersWithoutAuth, AppFeature.Authentication]
    await act(async () => {
      result.current.handleClick(AppFeature.Authentication)
      await waitFor(
        () => expect(result.current.filter).toEqual(filtersWithAuth),
        { timeout: 1000 }
      )
    })
  })
})
