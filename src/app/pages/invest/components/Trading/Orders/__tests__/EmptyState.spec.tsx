import React from 'react'
import { render } from 'test-utils'
import { EmptyState } from 'app/pages/invest/components/Trading/Orders/EmptyState'

describe('EmptyState', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders title and subtitle', () => {
    const { getByText } = render(<EmptyState title='ABC' subtitle='EFG' />)
    const title = getByText(/ABC/)
    const subtitle = getByText(/EFG/)

    expect(title).toBeTruthy()
    expect(subtitle).toBeTruthy()
  })
})
