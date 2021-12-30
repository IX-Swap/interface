import React from 'react'
import { render } from 'test-utils'
import { ActionContent } from 'app/pages/accounts/pages/banks/pages/BanksList/ActionContent'

describe('ActionContent', () => {
  const editFn = jest.fn()
  const removeFn = jest.fn()
  const viewFn = jest.fn()

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <ActionContent
        edit={editFn}
        view={viewFn}
        remove={removeFn}
        injectedProps={{} as any}
        popperProps={{} as any}
      />
    )
  })
})
