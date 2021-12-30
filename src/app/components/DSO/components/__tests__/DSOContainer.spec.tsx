import React from 'react'
import { render } from 'test-utils'
import { DSOContainer } from 'app/components/DSO/components/DSOContainer'

describe('DSOContainer', () => {
  const children = <div data-testid='children' />

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
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
