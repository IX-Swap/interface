import React from 'react'
import { render, cleanup } from 'test-utils'
import { AmountRaised } from 'app/pages/issuance/components/IssuanceLanding/AmountRaised'
import * as useIssuanceRouterHook from 'app/pages/issuance/router'
import * as useDSOByIdHook from 'app/pages/invest/hooks/useDSOById'
import { dso } from '__fixtures__/authorizer'
import { LOADING_TEXT } from 'components/form/renderUtils'

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

  it('renders LOADING_TEXT if not loaded', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isSuccess: false } as any)

    const { container } = render(<AmountRaised />)

    expect(container).toHaveTextContent(LOADING_TEXT)
  })
})
