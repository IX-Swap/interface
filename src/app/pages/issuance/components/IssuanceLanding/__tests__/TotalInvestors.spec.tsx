import React from 'react'
import { render, cleanup } from 'test-utils'
import { TotalInvestors } from 'app/pages/issuance/components/IssuanceLanding/TotalInvestors'
import * as useIssuanceRouterHook from 'app/pages/issuance/router'
import * as useDSOByIdHook from 'app/pages/invest/hooks/useDSOById'
import { dso } from '__fixtures__/authorizer'
import { LOADING_TEXT } from 'components/form/renderUtils'
import { InsightValue } from 'app/pages/issuance/components/IssuanceLanding/InsightValue'

jest.mock('app/pages/issuance/components/IssuanceLanding/InsightValue', () => ({
  InsightValue: jest.fn(() => null)
}))

describe('TotalInvestors', () => {
  beforeEach(() => {
    jest
      .spyOn(useIssuanceRouterHook, 'useIssuanceRouter')
      .mockReturnValue({ params: { dsoId: dso._id } } as any)
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ data: dso, isSuccess: true } as any)

    render(<TotalInvestors />)
  })

  it('renders InsightValue correctly if not loaded', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isSuccess: false } as any)

    render(<TotalInvestors />)

    expect(InsightValue).toHaveBeenCalled()
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

    render(<TotalInvestors />)

    expect(InsightValue).toHaveBeenCalled()
    expect(InsightValue).toHaveBeenCalledWith(
      {
        value: `${dso.insight.investorCount}`
      },
      {}
    )
  })
})
