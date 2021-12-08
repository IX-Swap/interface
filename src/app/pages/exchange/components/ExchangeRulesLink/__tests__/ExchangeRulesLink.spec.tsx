import * as useGetExchangeRules from 'app/pages/admin/hooks/useGetExchangeRules'
import { ExchangeRulesLink } from 'app/pages/exchange/components/ExchangeRulesLink/ExchangeRulesLink'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { generateQueryResult } from '__fixtures__/useQuery'
import { document } from '__fixtures__/identity'

describe('ExchangeRulesLink', () => {
  beforeEach(() => {
    const objResponse = generateQueryResult({
      data: document,
      isLoading: false
    })

    jest
      .spyOn(useGetExchangeRules, 'useGetExchangeRules')
      .mockImplementation(() => objResponse as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<ExchangeRulesLink />)
  })

  it('renders null when data is undefined', () => {
    const objResponse = generateQueryResult({
      data: undefined,
      isLoading: false
    })

    jest
      .spyOn(useGetExchangeRules, 'useGetExchangeRules')
      .mockImplementation(() => objResponse as any)

    const { container } = render(<ExchangeRulesLink />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders null when isLoading', () => {
    const objResponse = generateQueryResult({
      data: document,
      isLoading: true
    })

    jest
      .spyOn(useGetExchangeRules, 'useGetExchangeRules')
      .mockImplementation(() => objResponse as any)

    const { container } = render(<ExchangeRulesLink />)
    expect(container).toBeEmptyDOMElement()
  })
})
