import React from 'react'
import { render, cleanup } from 'test-utils'
import { FundSourceHeader } from 'app/pages/identity/components/FinancialInformationForm/FundSourceHeader'

describe('FundSourceHeader', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<FundSourceHeader />)
  })

  it('renders content correctly', () => {
    const { getByText } = render(<FundSourceHeader />)

    expect(getByText('Source of Funds')).toBeTruthy()
    expect(getByText('Select all that apply')).toBeTruthy()
    expect(
      getByText('How much of this source will be used to fund your account?')
    ).toBeTruthy()
  })
})
