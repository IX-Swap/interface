import * as useDSOById from 'app/pages/invest/hooks/useDSOById'
import { CapTablePageHeader } from 'app/pages/issuance/components/CapTable/CapTablePageHeader'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { history } from 'config/history'
import React from 'react'
import { generatePath } from 'react-router-dom'
import { render } from 'test-utils'
import { dso } from '__fixtures__/authorizer'
import { generateQueryResult } from '__fixtures__/useQuery'
import { user } from '__fixtures__/user'

describe('CapTablePageHeader', () => {
  beforeEach(() => {
    history.push(
      generatePath(IssuanceRoute.capTable, {
        dsoId: dso._id,
        issuerId: user._id
      })
    )
    const objResponse = generateQueryResult({ data: dso })

    jest
      .spyOn(useDSOById, 'useDSOById')
      .mockImplementation(() => objResponse as any)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<CapTablePageHeader />)
  })

  it('renders correct token name', () => {
    const { getByText } = render(<CapTablePageHeader />)
    expect(getByText(dso.tokenName)).toBeTruthy()
  })

  it('does not render token name when data is null/undefined', () => {
    jest
      .spyOn(useDSOById, 'useDSOById')
      .mockImplementation(() => generateQueryResult({ data: undefined }))

    const { queryByText } = render(<CapTablePageHeader />)

    expect(queryByText(dso.tokenName)).toBeFalsy()
  })
})
