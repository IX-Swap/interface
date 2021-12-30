import {} from 'test-utils'
import { getLanguageFromURL, getMovingAverageParams } from '../utils'

describe('getMovingAverageParams', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('Returns correct moving average params', () => {
    const periods = 12
    const color = '#FF0000'
    const expectedResult = [
      'Moving Average Exponential',
      false,
      false,
      [periods],
      {
        'plot.color': color
      }
    ]
    expect(getMovingAverageParams(periods, color)).toEqual(expectedResult)
  })
})

describe('getLanguageFromURL', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('Returns correct language params', () => {
    const windowSpy = jest.spyOn(window as any, 'window', 'get')
    const expectedResult = 'en'
    windowSpy.mockImplementation(() => ({
      location: {
        search: '&lang=en'
      }
    }))

    getLanguageFromURL()
    expect(getLanguageFromURL()).toEqual(expectedResult)
  })
})
