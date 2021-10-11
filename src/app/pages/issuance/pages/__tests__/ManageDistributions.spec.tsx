import React from 'react'
import { render, cleanup } from 'test-utils'
import { ManageDistributions } from 'app/pages/issuance/pages/ManageDistributions'
import * as useDSOById from 'app/pages/invest/hooks/useDSOById'
import { generateQueryResult } from '__fixtures__/useQuery'
import { dso } from '__fixtures__/authorizer'

describe('ManageDistributions', () => {
  beforeEach(() => {
    const objResponse = generateQueryResult({ data: dso })
    jest
      .spyOn(useDSOById, 'useDSOById')
      .mockImplementation(() => objResponse as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<ManageDistributions />)
  })

  it('renders without errors null when isLoading', () => {
    const objResponse = generateQueryResult({ data: dso, isLoading: true })
    jest
      .spyOn(useDSOById, 'useDSOById')
      .mockImplementation(() => objResponse as any)

    const { container } = render(<ManageDistributions />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders without errors null when data is undefined', () => {
    const objResponse = generateQueryResult({
      data: undefined,
      isLoading: false
    })
    jest
      .spyOn(useDSOById, 'useDSOById')
      .mockImplementation(() => objResponse as any)

    const { container } = render(<ManageDistributions />)

    expect(container).toBeEmptyDOMElement()
  })
})
