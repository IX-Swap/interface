import { Investors } from 'app/pages/issuance/components/CapTable/Investors'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { history } from 'config/history'
import { generatePath } from 'react-router-dom'
import { generateQueryResult } from '__fixtures__/useQuery'
import * as useDSOById from 'app/pages/invest/hooks/useDSOById'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { dso } from '__fixtures__/authorizer'
import { user } from '__fixtures__/user'

jest.mock('components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => null)
}))

describe('Investors', () => {
  const uri = generatePath(IssuanceRoute.capTable, {
    dsoId: dso._id,
    issuerId: user._id
  })

  beforeEach(() => {
    history.push(uri)

    const objResponse = generateQueryResult({ data: dso })
    jest
      .spyOn(useDSOById, 'useDSOById')
      .mockImplementation(() => objResponse as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  afterAll(() => history.push('/'))

  it('renders without errors', () => {
    render(<Investors />)
  })

  it('renders null when data is undefined', () => {
    const objResponse = generateQueryResult({ data: undefined })
    jest
      .spyOn(useDSOById, 'useDSOById')
      .mockImplementation(() => objResponse as any)

    const { container } = render(<Investors />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders null when isLoading', () => {
    const objResponse = generateQueryResult({ data: dso, isLoading: true })
    jest
      .spyOn(useDSOById, 'useDSOById')
      .mockImplementation(() => objResponse as any)

    const { container } = render(<Investors />)
    expect(container).toBeEmptyDOMElement()
  })
})
