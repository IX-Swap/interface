import React from 'react'
import { render } from 'test-utils'
import * as useDSOByIdHook from 'app/pages/invest/hooks/useDSOById'
import * as useCountdown from 'app/pages/issuance/hooks/useCountdown'
import { dso } from '__fixtures__/authorizer'
import Typography from '@mui/material/Typography'
import { TimeDisplay } from 'app/pages/issuance/components/CountdownTimer/TimeDisplay'
import { getTimeUnitsToDisplay } from 'helpers/countdownTimer'
import { NextDistributionTimer } from 'app/pages/issuance/components/ManageDistributions/NextDistributionTimer'
import * as useNextDistribution from 'app/pages/issuance/hooks/useNextDistribution'

jest.mock('@mui/material/Typography', () => jest.fn(() => null))
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

describe('NextDistributionTimer', () => {
  const dateNowSpy = jest
    .spyOn(Date, 'now')
    .mockImplementation(() => 1607672045419)

  beforeEach(() => {
    const objResponse = {
      data: {
        distributionDate: '12/21/3000'
      },
      isLoading: false
    }

    jest
      .spyOn(useNextDistribution, 'useNextDistribution')
      .mockImplementation(() => objResponse as any)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    dateNowSpy.mockRestore()
  })

  it('renders title with correct props', () => {
    render(<NextDistributionTimer />)

    expect(Typography).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        children: 'Next Distribution',
        style: { fontWeight: 'initial' }
      }),
      {}
    )
  })

  it('renders title with correct props when isNewThemeOn is true', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: false, data: dso } as any)

    render(<NextDistributionTimer isNewThemeOn />)

    expect(Typography).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        children: 'Next Distribution',
        style: { fontWeight: 500 }
      }),
      {}
    )
  })

  it('renders TimeDisplay with correct props ', () => {
    jest.spyOn(useCountdown, 'useCountdown').mockReturnValue({
      units: mockUnits
    } as any)

    render(<NextDistributionTimer />)

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
    jest.spyOn(useCountdown, 'useCountdown').mockReturnValue({
      units: mockUnits
    } as any)

    render(<NextDistributionTimer isNewThemeOn />)

    expect(TimeDisplay).toHaveBeenCalledWith(
      expect.objectContaining({
        unitsToDisplay: getTimeUnitsToDisplay({
          years: 0,
          months: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        }),
        units: mockUnits,
        isNewThemeOn: true
      }),
      {}
    )
  })
})
