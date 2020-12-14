import { addLeadingZeros } from 'helpers/numbers'
import { act } from 'react-test-renderer'
import { renderHookWithServiceProvider } from 'test-utils'
import { useCountdown } from '../useCountdown'

describe('useCountdown', () => {
  let dateSpy = jest.spyOn(Date, 'now').mockImplementation(() => 1607672045419)
  let mockLaunchDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)

  afterAll(() => {
    dateSpy.mockRestore()
    jest.useRealTimers()
  })

  it('returns correct time data when there is time left', async () => {
    jest.useFakeTimers()

    const { result } = renderHookWithServiceProvider(
      () => useCountdown(mockLaunchDate),
      {}
    )

    expect(result.current).toEqual({
      days: addLeadingZeros(2, 2),
      hours: addLeadingZeros(0, 2),
      minutes: addLeadingZeros(0, 2)
    })

    dateSpy = jest
      .spyOn(Date, 'now')
      .mockImplementation(() => 1607672045419 + 60 * 1000)
    void act(() => {
      jest.runOnlyPendingTimers()
    })

    expect(result.current).toEqual({
      days: addLeadingZeros(1, 2),
      hours: addLeadingZeros(23, 2),
      minutes: addLeadingZeros(59, 2)
    })

    dateSpy = jest
      .spyOn(Date, 'now')
      .mockImplementation(() => 1607672045419 + 2 * 60 * 1000)
    void act(() => {
      jest.runOnlyPendingTimers()
    })

    expect(result.current).toEqual({
      days: addLeadingZeros(1, 2),
      hours: addLeadingZeros(23, 2),
      minutes: addLeadingZeros(58, 2)
    })
  })

  it('returns correct time data when there is time left', () => {
    mockLaunchDate = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    const { result } = renderHookWithServiceProvider(
      () => useCountdown(mockLaunchDate),
      {}
    )
    expect(result.current).toEqual({
      days: addLeadingZeros(0, 2),
      hours: addLeadingZeros(0, 2),
      minutes: addLeadingZeros(0, 2)
    })
  })
})
