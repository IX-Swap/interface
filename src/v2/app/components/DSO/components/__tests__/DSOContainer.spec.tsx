import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSOContainer } from 'v2/app/components/DSO/components/DSOContainer'

describe('DSOContainer', () => {
  const children = <div data-testid='children' />

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DSOContainer>{children}</DSOContainer>)
  })

  it('renders title and children', () => {
    const { getByText, getByTestId } = render(
      <DSOContainer title='Test Container'>{children}</DSOContainer>
    )
    const title = getByText(/Test Container/)
    const child = getByTestId('children')

    expect(title).toBeTruthy()
    expect(child).toBeTruthy()
  })
})
