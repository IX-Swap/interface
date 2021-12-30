import React from 'react'
import { render } from 'test-utils'
import { TotalAssetBalance } from 'app/pages/accounts/pages/dashboard/components/TotalAssetBalance/TotalAssetBalance'

const totalAssetBalance = 1000

describe('TotalAssetBalance', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<TotalAssetBalance value={totalAssetBalance} />)
  })

  it('renders title with correct text', () => {
    const { getByText } = render(
      <TotalAssetBalance value={totalAssetBalance} />
    )

    expect(getByText('Total Asset Balance')).toBeInTheDocument()
  })
})
