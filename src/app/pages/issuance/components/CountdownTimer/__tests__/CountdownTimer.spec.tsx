import React from 'react'
import { render } from 'test-utils'
import { CountdownTimer } from '../CountdownTimer'
import * as useDSOByIdHook from 'app/pages/invest/hooks/useDSOById'
import * as useCountdown from 'app/pages/issuance/hooks/useCountdown'
import { dso } from '__fixtures__/authorizer'
import Typography from '@material-ui/core/Typography'
import { TimeDisplay } from 'app/pages/issuance/components/CountdownTimer/TimeDisplay'
import { getTimeUnitsToDisplay } from 'helpers/countdownTimer'

jest.mock('@material-ui/core/Typography', () => jest.fn(() => null))
jest.mock('app/pages/issuance/components/CountdownTimer/TimeDisplay', () => ({
  TimeDisplay: jest.fn(() => null)
}))

const mockUnits = {
  days: 0,
  hours: 0,
  minutes: 0,
  months: 0,
  seconds: 0,
  years: 0
}

describe('CountdownTimer', () => {
  const dateNowSpy = jest
    .spyOn(Date, 'now')
    .mockImplementation(() => 1607672045419)

  afterEach(async () => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    dateNowSpy.mockRestore()
  })

  it.skip('renders without data', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: false, data: undefined } as any)

    const { container } = render(<CountdownTimer />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders title with correct props', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: false, data: dso } as any)

    render(<CountdownTimer />)

    expect(Typography).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        children: 'Time Remaining',
        style: { fontWeight: 'initial' }
      }),
      {}
    )
  })

  it('renders title with correct props when isNewThemeOn is true', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: false, data: dso } as any)

    render(<CountdownTimer isNewThemeOn />)

    expect(Typography).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        children: 'Time Remaining',
        style: { fontWeight: 500 }
      }),
      {}
    )
  })

  it('renders TimeDisplay with correct props ', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: false, data: dso } as any)

    jest.spyOn(useCountdown, 'useCountdown').mockReturnValue({
      units: mockUnits
    } as any)

    render(<CountdownTimer />)

    expect(TimeDisplay).toHaveBeenCalledWith(
      expect.objectContaining({
        unitsToDisplay: getTimeUnitsToDisplay(mockUnits),
        units: mockUnits,
        isNewThemeOn: false
      }),
      {}
    )
  })

  it('renders TimeDisplay with correct props when isNewThemeOn is true', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: false, data: dso } as any)

    jest.spyOn(useCountdown, 'useCountdown').mockReturnValue({
      units: mockUnits
    } as any)

    render(<CountdownTimer isNewThemeOn />)

    expect(TimeDisplay).toHaveBeenCalledWith(
      expect.objectContaining({
        unitsToDisplay: getTimeUnitsToDisplay({
          years: 0,
          months: 0,
          days: 1,
          hours: 1,
          minutes: 1,
          seconds: 0
        }),
        units: mockUnits,
        isNewThemeOn: true
      }),
      {}
    )
  })
})
