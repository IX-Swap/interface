import React from 'react'
import { render, cleanup } from 'test-utils'
import { NoData } from 'app/pages/issuance/components/FinancialReportsTable/NoData'
import * as useDSOsByUserId from 'app/pages/issuance/hooks/useDSOsByUserId'
import { generateQueryResult } from '__fixtures__/useQuery'

describe('NoData', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders null when isLoading', () => {
    const objResponse = generateQueryResult({
      data: undefined,
      isLoading: true
    })

    jest
      .spyOn(useDSOsByUserId, 'useDSOsByUserId')
      .mockImplementation(() => objResponse as any)

    const { container } = render(<NoData />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders correct text when there is no DSO', () => {
    const objResponse = generateQueryResult({
      data: undefined,
      isLoading: false
    })

    jest
      .spyOn(useDSOsByUserId, 'useDSOsByUserId')
      .mockImplementation(() => objResponse as any)

    const { getByText } = render(<NoData />)
    expect(
      getByText(/To create a report it is necessary to have a DSO/i)
    ).toBeTruthy()
    expect(getByText(/Create your first DSO/i)).toBeTruthy()
  })
})
