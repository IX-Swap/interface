import React from 'react'
import { render, cleanup } from 'test-utils'
import { AvailableCash } from 'app/pages/accounts/pages/dashboard/components/AvailableCash/AvailableCash'
import { fakeVirtualAccountInfo } from '__fixtures__/portfolio'

describe('AvailableCash', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<AvailableCash accounts={[fakeVirtualAccountInfo]} />)
  })

  it('renders empty container when accounts is undefined', () => {
    const { container } = render(<AvailableCash accounts={undefined} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders title with correct text', () => {
    const { getByText } = render(
      <AvailableCash accounts={[fakeVirtualAccountInfo]} />
    )

    expect(getByText('Available Cash')).toBeInTheDocument()
  })
})
