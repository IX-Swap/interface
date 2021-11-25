import React from 'react'
import { render, cleanup } from 'test-utils'
import { ViewListedTokens } from 'app/pages/admin/components/ViewListedTokens/ViewListedTokens'
import { fireEvent } from '@testing-library/dom'

describe('ViewListedTokens', () => {
  const radioHandleChange = jest.fn()
  const buttonHandleClick = jest.fn()

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <ViewListedTokens
        radioValue={'hex'}
        onRadioChange={radioHandleChange}
        onButtonClick={buttonHandleClick}
      />
    )
  })

  it('invokes onButtonClick function on button click', () => {
    const { getByTestId } = render(
      <ViewListedTokens
        radioValue={'hex'}
        onRadioChange={radioHandleChange}
        onButtonClick={buttonHandleClick}
      />
    )

    const button = getByTestId('button')

    fireEvent.click(button)
    expect(buttonHandleClick).toBeCalled()
  })
})
