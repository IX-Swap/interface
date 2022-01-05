import React from 'react'
import { render } from 'test-utils'
import { TargetFundraise } from 'app/pages/issuance/components/IssuanceLanding/TargetFundraise'
import * as useDSOByIdHook from 'app/pages/invest/hooks/useDSOById'
import { InsightValue } from 'app/pages/issuance/components/IssuanceLanding/InsightValue'
import { dso } from '__fixtures__/authorizer'
import { LOADING_TEXT } from 'components/form/renderUtils'
import { abbreviateNumber } from 'helpers/numbers'
import { VSpacer } from 'components/VSpacer'

const targetFundraiseProps = {
  isNewThemeOn: true
}

jest.mock('app/pages/issuance/components/IssuanceLanding/InsightValue', () => ({
  InsightValue: jest.fn(() => null)
}))

jest.mock('components/VSpacer', () => ({
  VSpacer: jest.fn(() => null)
}))

describe('TargetFundraise', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders InsightValue correctly if not loaded', () => {
    jest.spyOn(useDSOByIdHook, 'useDSOById').mockReturnValue({
      data: dso,
      isSuccess: false
    } as any)

    render(<TargetFundraise />)

    expect(InsightValue).toHaveBeenCalledTimes(1)
    expect(InsightValue).toHaveBeenCalledWith(
      {
        value: LOADING_TEXT
      },
      {}
    )
  })

  it('renders InsightValue correctly if data is undefined', () => {
    jest.spyOn(useDSOByIdHook, 'useDSOById').mockReturnValue({
      data: undefined,
      isSuccess: false
    } as any)

    render(<TargetFundraise />)

    expect(InsightValue).toHaveBeenCalledTimes(1)
    expect(InsightValue).toHaveBeenCalledWith(
      {
        value: abbreviateNumber(0)
      },
      {}
    )
  })

  it('renders InsightValue correctly', () => {
    jest.spyOn(useDSOByIdHook, 'useDSOById').mockReturnValue({
      data: dso,
      isSuccess: true
    } as any)

    render(<TargetFundraise />)

    expect(InsightValue).toHaveBeenCalledTimes(1)
    expect(InsightValue).toHaveBeenCalledWith(
      {
        value: abbreviateNumber(dso.totalFundraisingAmount, dso.currency.symbol)
      },
      {}
    )
  })

  it('renders VSpacer with correct props if isNewThemeOn is true', () => {
    jest.spyOn(useDSOByIdHook, 'useDSOById').mockReturnValue({
      data: undefined,
      isSuccess: false
    } as any)

    render(<TargetFundraise {...targetFundraiseProps} />)

    expect(VSpacer).toHaveBeenCalledTimes(1)
    expect(VSpacer).toHaveBeenCalledWith(
      {
        size: 'extraSmall'
      },
      {}
    )
  })

  it('renders VSpacer if isNewThemeOn is false', () => {
    jest.spyOn(useDSOByIdHook, 'useDSOById').mockReturnValue({
      data: undefined,
      isSuccess: false
    } as any)

    render(<TargetFundraise />)

    expect(VSpacer).toHaveBeenCalledTimes(0)
  })
})
