import React from 'react'
import { render, cleanup } from 'test-utils'
import { ViewListedTokens } from 'app/pages/admin/components/ViewListedTokens/ViewListedTokens'

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
})
