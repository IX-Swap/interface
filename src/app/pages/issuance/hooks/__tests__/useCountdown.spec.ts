import { act } from 'react-test-renderer'
import { renderHookWithServiceProvider } from 'test-utils'
import { useCountdown } from '../useCountdown'

describe('useCountdown', () => {
  let dateSpy = jest.spyOn(Date, 'now').mockImplementation(() => 1607672045419)
  let mockLaunchDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toString()

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
      units: {
        years: 0,
        months: 0,
        days: 1,
        hours: 23,
        minutes: 59,
        seconds: 59
      },
      diff: new Date(mockLaunchDate).getTime() - Date.now()
    })

    dateSpy = jest
      .spyOn(Date, 'now')
      .mockImplementation(() => 1607672045419 + 60 * 1000)
    void act(() => {
      jest.runOnlyPendingTimers()
    })

    expect(result.current).toEqual({
      units: {
        years: 0,
        months: 0,
        days: 1,
        hours: 23,
        minutes: 58,
        seconds: 59
      },
      diff: new Date(mockLaunchDate).getTime() - Date.now()
    })

    dateSpy = jest
      .spyOn(Date, 'now')
      .mockImplementation(() => 1607672045419 + 2 * 60 * 1000)
    void act(() => {
      jest.runOnlyPendingTimers()
    })

    expect(result.current).toEqual({
      units: {
        years: 0,
        months: 0,
        days: 1,
        hours: 23,
        minutes: 57,
        seconds: 59
      },
      diff: new Date(mockLaunchDate).getTime() - Date.now()
    })
  })

  it('returns correct time data when there is no time left', () => {
    mockLaunchDate = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toString()
    const { result } = renderHookWithServiceProvider(
      () => useCountdown(mockLaunchDate),
      {}
    )
    expect(result.current).toEqual({
      units: {
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      },
      diff: new Date(mockLaunchDate).getTime() - Date.now()
    })
  })
})
