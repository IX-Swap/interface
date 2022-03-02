import React from 'react'
import { render } from 'test-utils'
import { FundSourceHeader } from 'app/pages/identity/components/FinancialInformationForm/FundSourceHeader'

describe('FundSourceHeader', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders content correctly', () => {
    const { getByText } = render(<FundSourceHeader />)

    expect(getByText('Source of Funds')).toBeTruthy()
  })
})
