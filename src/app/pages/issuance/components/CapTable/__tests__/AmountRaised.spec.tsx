import React from 'react'
import { render } from 'test-utils'
import * as useDSOByIdHook from 'app/pages/invest/hooks/useDSOById'
import { dso } from '__fixtures__/authorizer'
import { abbreviateNumber } from 'helpers/numbers'
import { ChartTitle } from 'app/pages/issuance/components/IssuanceLanding/ChartTitle'
import { VSpacer } from 'components/VSpacer'
import { DonutChart } from 'app/pages/issuance/components/IssuanceLanding/DonutChart'
import { AmountRaised } from 'app/pages/issuance/components/CapTable/AmountRaised'

jest.mock('app/pages/issuance/components/IssuanceLanding/ChartTitle', () => ({
  ChartTitle: jest.fn(() => null)
}))

jest.mock('components/VSpacer', () => ({
  VSpacer: jest.fn(() => null)
}))

jest.mock('app/pages/issuance/components/IssuanceLanding/DonutChart', () => ({
  DonutChart: jest.fn(() => null)
}))

const amountRaisedProps = {
  isNewThemeOn: true
}

describe('AmountRaised', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ data: dso, isSuccess: true } as any)

    render(<AmountRaised />)
  })

  it.skip('renders with props without error', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ data: dso, isSuccess: true } as any)

    render(<AmountRaised {...amountRaisedProps} />)
  })

  it('renders ChartTitle with correct props', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ data: dso, isSuccess: true } as any)

    render(<AmountRaised />)

    expect(ChartTitle).toHaveBeenCalledTimes(1)
    expect(ChartTitle).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Amount Raised', small: true }),
      {}
    )
  })

  it('renders VSpacer with correct props if isNewThemeOn is true', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ data: dso, isSuccess: true } as any)

    render(<AmountRaised {...amountRaisedProps} />)

    expect(VSpacer).toHaveBeenCalledTimes(1)
    expect(VSpacer).toHaveBeenCalledWith(
      expect.objectContaining({ size: 'extraSmall' }),
      {}
    )
  })

  it('renders VSpacer if isNewThemeOn is false', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ data: dso, isSuccess: true } as any)

    render(<AmountRaised />)

    expect(VSpacer).toHaveBeenCalledTimes(0)
  })

  it('renders DonutChart with correct props ', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ data: dso, isSuccess: true } as any)

    render(<AmountRaised {...amountRaisedProps} />)

    expect(DonutChart).toHaveBeenCalledTimes(1)
    expect(DonutChart).toHaveBeenCalledWith(
      expect.objectContaining({
        isNewThemeOn: amountRaisedProps.isNewThemeOn,
        percent: 0.4
      }),
      {}
    )
  })

  it('renders 0 if not loaded', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isSuccess: false } as any)

    const { container } = render(<AmountRaised />)

    expect(container).toHaveTextContent(abbreviateNumber(0))
  })
})
