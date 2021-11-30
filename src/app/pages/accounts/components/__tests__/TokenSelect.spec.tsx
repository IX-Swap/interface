import React from 'react'
import { render, cleanup } from 'test-utils'
import { TokenSelect } from 'app/pages/accounts/components/TokenSelect'
import * as useGetCustody from 'app/pages/accounts/hooks/useGetCustody'
import { generateQueryResult } from '__fixtures__/useQuery'
import { balance } from '__fixtures__/balance'

describe('TokenSelect', () => {
  beforeEach(() => {
    const objResponse = generateQueryResult({
      data: [balance],
      isLoading: false
    })

    jest
      .spyOn(useGetCustody, 'useGetCustody')
      .mockImplementation(() => objResponse as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<TokenSelect />)
  })

  it('returns null when data is undefined', () => {
    const objResponse = generateQueryResult({
      data: undefined,
      isLoading: false
    })

    jest
      .spyOn(useGetCustody, 'useGetCustody')
      .mockImplementation(() => objResponse as any)

    const { container } = render(<TokenSelect />)

    expect(container).toBeEmptyDOMElement()
  })

  it('returns null when isLoading', () => {
    const objResponse = generateQueryResult({
      data: [balance],
      isLoading: true
    })

    jest
      .spyOn(useGetCustody, 'useGetCustody')
      .mockImplementation(() => objResponse as any)

    const { container } = render(<TokenSelect />)

    expect(container).toBeEmptyDOMElement()
  })
})
