import { VirtualAccountCard } from 'app/pages/accounts/components/VirtualAccountCard/VirtualAccountCard'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('VirtualAccountCard', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<VirtualAccountCard label='Virtual Account Number' info={<></>} />)
  })

  it('renders props correctly', () => {
    const { getByText } = render(
      <VirtualAccountCard label='Virtual Account Number' info='1234567890' />
    )

    expect(getByText('Virtual Account Number')).toBeTruthy()
    expect(getByText('1234567890')).toBeTruthy()
  })
})
