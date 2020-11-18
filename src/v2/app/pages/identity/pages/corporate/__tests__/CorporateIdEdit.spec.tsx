import React from 'react'
import { render, cleanup } from 'test-utils'
import { CorporateIdEdit } from 'v2/app/pages/identity/pages/corporate/CorporateIdEdit'
import { IdentityRoute } from 'v2/app/pages/identity/router'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { corporate } from '__fixtures__/identity'
import { QueryStatus } from 'react-query'
import * as allCorporateIdentitiesHook from 'v2/hooks/identity/useAllCorporateIdentities'
import { history } from 'v2/history'
import { CorporateIdentityForm } from 'v2/app/pages/identity/components/CorporateIdentityForm'

jest.mock('v2/app/pages/identity/components/CorporateIdentityForm', () => ({
  CorporateIdentityForm: jest.fn(() => null)
}))

describe('CorporateIdEdit', () => {
  const identityId = corporate._id

  beforeEach(() => {
    history.push(IdentityRoute.editCorporate, { identityId })
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  afterAll(() => history.push('/'))

  it('renders without error', () => {
    render(<CorporateIdEdit />)
  })

  it('renders nothing if loading', () => {
    jest
      .spyOn(allCorporateIdentitiesHook, 'useAllCorporateIdentities')
      .mockImplementation(() =>
        generateInfiniteQueryResult({ queryStatus: QueryStatus.Loading })
      )
    const { container } = render(<CorporateIdEdit />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders CorporateIdentityForm with correct props', () => {
    jest
      .spyOn(allCorporateIdentitiesHook, 'useAllCorporateIdentities')
      .mockImplementation(() =>
        generateInfiniteQueryResult({ map: { [identityId]: corporate } })
      )

    render(<CorporateIdEdit />)

    expect(CorporateIdentityForm).toHaveBeenCalledWith(
      {
        data: corporate,
        submitButtonText: 'Save',
        onSubmit: expect.any(Function),
        cancelButton: expect.anything()
      },
      {}
    )
  })
})
