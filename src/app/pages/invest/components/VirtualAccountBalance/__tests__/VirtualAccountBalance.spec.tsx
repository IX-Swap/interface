import * as useVirtualAccount from 'app/pages/accounts/hooks/useVirtualAccount'
import { VirtualAccountBalance } from 'app/pages/invest/components/VirtualAccountBalance/VirtualAccountBalance'
import React from 'react'
import { render } from 'test-utils'
import { generateMutationResult } from '__fixtures__/useQuery'
import { virtualAccount } from '__fixtures__/virtualAccount'

describe('VirtualAccountBalance', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    const objResponse = {
      ...generateMutationResult({ data: virtualAccount }),
      list: [virtualAccount]
    }

    jest
      .spyOn(useVirtualAccount, 'useVirtualAccount')
      .mockImplementation(() => objResponse as any)
    render(<VirtualAccountBalance />)
  })

  it('returns null when isLoading is true', () => {
    const objResponse = {
      ...generateMutationResult({ data: virtualAccount, isLoading: true }),
      list: [virtualAccount]
    }

    jest
      .spyOn(useVirtualAccount, 'useVirtualAccount')
      .mockImplementation(() => objResponse as any)
    const { container } = render(<VirtualAccountBalance />)
    expect(container).toBeEmptyDOMElement()
  })

  it('returns null when list is undefined is true', () => {
    const objResponse = {
      ...generateMutationResult({ data: virtualAccount }),
      list: undefined
    }

    jest
      .spyOn(useVirtualAccount, 'useVirtualAccount')
      .mockImplementation(() => objResponse as any)
    const { container } = render(<VirtualAccountBalance />)
    expect(container).toBeEmptyDOMElement()
  })

  it('returns null when list length is 0 is true', () => {
    const objResponse = {
      ...generateMutationResult({ data: virtualAccount }),
      list: []
    }

    jest
      .spyOn(useVirtualAccount, 'useVirtualAccount')
      .mockImplementation(() => objResponse as any)
    const { container } = render(<VirtualAccountBalance />)
    expect(container).toBeEmptyDOMElement()
  })
})
