/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup, fireEvent, waitFor } from 'test-utils'
import {
  Preview,
  PreviewProps
} from 'v2/app/pages/authorizer/components/Preview'

describe('Preview', () => {
  const props: PreviewProps = { onBack: jest.fn() }
  const children = <div data-testid='children' />

  afterEach(async () => {
    await cleanup()
  })

  it('renders title and children', () => {
    const { getByText, getByTestId } = render(
      <Preview {...props}>{children}</Preview>
    )
    const title = getByText(/preview/i)
    const backButton = getByTestId('back-button')
    const child = getByTestId('children')

    expect(title).toBeTruthy()
    expect(backButton).toBeTruthy()
    expect(child).toBeTruthy()
  })

  it('fires onBack callback when back button is pressed', async () => {
    const { getByTestId } = render(<Preview {...props}>{children}</Preview>)
    const backButton = getByTestId('back-button')

    fireEvent.click(backButton)

    await waitFor(() => {
      expect(props.onBack).toHaveBeenCalledTimes(1)
    })
  })
})
