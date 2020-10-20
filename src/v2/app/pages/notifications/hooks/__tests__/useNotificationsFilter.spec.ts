/**  * @jest-environment jsdom-sixteen  */
import { renderHook, act } from '@testing-library/react-hooks'
import { waitFor, cleanup } from 'test-utils'
import {
  defaultNotificationFilter,
  useNotificationsFilter
} from 'v2/app/pages/notifications/hooks/useNotificationsFilter'
import { NotificationFilter } from 'v2/types/app'

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
      result.current.handleClick(NotificationFilter.Authentication)

      await waitFor(
        () => {
          expect(result.current.filter).toEqual(
            defaultNotificationFilter.filter(
              i => i !== NotificationFilter.Authentication
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
      i => i !== NotificationFilter.Authentication
    )

    await act(async () => {
      result.current.handleClick(NotificationFilter.Authentication)
      await waitFor(
        () => expect(result.current.filter).toEqual(filtersWithoutAuth),
        { timeout: 1000 }
      )
    })

    const filtersWithAuth = [
      ...filtersWithoutAuth,
      NotificationFilter.Authentication
    ]
    await act(async () => {
      result.current.handleClick(NotificationFilter.Authentication)
      await waitFor(
        () => expect(result.current.filter).toEqual(filtersWithAuth),
        { timeout: 1000 }
      )
    })
  })
})
