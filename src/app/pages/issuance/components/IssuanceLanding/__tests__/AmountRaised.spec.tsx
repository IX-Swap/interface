import React from 'react'
import { render, cleanup } from 'test-utils'
import { AmountRaised } from 'app/pages/issuance/components/IssuanceLanding/AmountRaised'
import * as useIssuanceRouterHook from 'app/pages/issuance/router'
import * as useDSOByIdHook from 'app/pages/invest/hooks/useDSOById'
import { dso } from '__fixtures__/authorizer'
import { abbreviateNumber } from 'helpers/numbers'

describe('AmountRaised', () => {
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

    render(<AmountRaised />)
  })

  it('renders 0 if not loaded', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isSuccess: false } as any)

    const { container } = render(<AmountRaised />)

    expect(container).toHaveTextContent(abbreviateNumber(0))
  })
})
