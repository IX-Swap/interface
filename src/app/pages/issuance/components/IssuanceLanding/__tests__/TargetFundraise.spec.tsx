import React from 'react'
import { render, cleanup } from 'test-utils'
import { TargetFundraise } from 'app/pages/issuance/components/IssuanceLanding/TargetFundraise'
import * as useDSOByIdHook from 'app/pages/invest/hooks/useDSOById'
import { InsightValue } from 'app/pages/issuance/components/IssuanceLanding/InsightValue'
import { dso } from '__fixtures__/authorizer'
import { LOADING_TEXT } from 'components/form/renderUtils'
import { abbreviateNumber } from 'helpers/numbers'

jest.mock('app/pages/issuance/components/IssuanceLanding/InsightValue', () => ({
  InsightValue: jest.fn(() => null)
}))

describe('TargetFundraise', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    jest.spyOn(useDSOByIdHook, 'useDSOById').mockReturnValue({
      data: dso,
      isSuccess: true
    } as any)

    render(<TargetFundraise />)
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
})
