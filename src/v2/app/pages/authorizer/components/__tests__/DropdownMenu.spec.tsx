/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup, fireEvent, waitFor } from 'test-utils'
import { DropdownMenu } from 'v2/app/pages/authorizer/components/DropdownMenu'

describe('DropdownMenu', () => {
  const props = {
    toggle: <div data-testid='toggle' />,
    content: <div data-testid='content' />
  }

  afterEach(cleanup)

  it('renders toggle', () => {
    const { getByTestId } = render(<DropdownMenu {...props} />)
    const toggle = getByTestId('toggle')

    expect(toggle).toBeTruthy()
  })

  it('does not render content initially', () => {
    const { queryByTestId } = render(<DropdownMenu {...props} />)
    const content = queryByTestId('content')

    expect(content).toBeFalsy()
  })

  it('renders content after toggle has been clicked', async () => {
    const { getByTestId } = render(<DropdownMenu {...props} />)
    const toggle = getByTestId('toggle')

    fireEvent.click(toggle)
    await waitFor(() => {
      const content = getByTestId('content')

      expect(content).toBeTruthy()
    })
  })

  it('hides content on outside click', async () => {
    const { getByTestId, queryByTestId, container } = render(
      <DropdownMenu {...props} />
    )
    const toggle = getByTestId('toggle')

    fireEvent.click(toggle)
    await waitFor(() => {
      const content = getByTestId('content')
      expect(content).toBeTruthy()
    })

    fireEvent.click(container)
    await waitFor(() => {
      const content = queryByTestId('content')
      expect(content).toBeFalsy()
    })
  })
})
