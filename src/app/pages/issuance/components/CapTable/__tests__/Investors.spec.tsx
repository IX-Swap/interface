import { Investors } from 'app/pages/issuance/components/CapTable/Investors'
import React from 'react'
import { render } from 'test-utils'
import { generateQueryResult } from '__fixtures__/useQuery'
import * as useDSOById from 'app/pages/invest/hooks/useDSOById'
import { dso } from '__fixtures__/authorizer'
import { history } from 'config/history'

jest.mock('components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => null)
}))

describe('Investors', () => {
  beforeEach(() => {
    const objResponse = generateQueryResult({ data: dso })
    jest
      .spyOn(useDSOById, 'useDSOById')
      .mockImplementation(() => objResponse as any)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', async () => {
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

  it('renders null when dsoid is undefined', () => {
    const objResponse = generateQueryResult({ data: dso, isLoading: true })
    jest
      .spyOn(useDSOById, 'useDSOById')
      .mockImplementation(() => objResponse as any)

    const { container } = render(<Investors />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders null when issuerId is undefined', () => {
    const objResponse = generateQueryResult({ data: dso, isLoading: true })
    jest
      .spyOn(useDSOById, 'useDSOById')
      .mockImplementation(() => objResponse as any)

    const { container } = render(<Investors />)
    expect(container).toBeEmptyDOMElement()
  })
})
