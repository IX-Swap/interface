import { DealClosureAuthorization } from 'app/pages/authorizer/pages/DealClosures/DealClosureAuthorization'
import * as useDSOById from 'app/pages/invest/hooks/useDSOById'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { dso } from '__fixtures__/authorizer'
import { generateQueryResult } from '__fixtures__/useQuery'

jest.mock('app/pages/authorizer/components/AuthorizerView', () => ({
  AuthorizerView: jest.fn(() => null)
}))

jest.mock('app/components/DSO/DSOView', () => ({
  DSOView: jest.fn(() => null)
}))

describe('DealClosureAuthorization', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    const objResponse = generateQueryResult({
      data: dso,
      isLoading: false
    })
    jest
      .spyOn(useDSOById, 'useDSOById')
      .mockImplementation(() => objResponse as any)

    render(<DealClosureAuthorization />)
  })

  it('renders null when data is undefined', () => {
    const objResponse = generateQueryResult({
      data: undefined,
      isLoading: false
    })

    jest
      .spyOn(useDSOById, 'useDSOById')
      .mockImplementation(() => objResponse as any)
    const { container } = render(<DealClosureAuthorization />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders null when isLoading', () => {
    const objResponse = generateQueryResult({
      data: {},
      isLoading: true
    })

    jest
      .spyOn(useDSOById, 'useDSOById')
      .mockImplementation(() => objResponse as any)
    const { container } = render(<DealClosureAuthorization />)
    expect(container).toBeEmptyDOMElement()
  })
})
