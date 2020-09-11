/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { DepositView } from 'v2/app/pages/accounts/pages/banks/DepositCash/DepositView'

import { useDepositStore } from 'v2/app/pages/accounts/pages/banks/context'

jest.mock('v2/app/pages/accounts/pages/banks/context')
jest.mock('v2/app/pages/accounts/pages/banks/DepositCash/Setup', () => ({
  Setup: () => <div data-testid='setup'></div>
}))
jest.mock('v2/app/pages/accounts/pages/banks/DepositCash/Preview', () => ({
  Preview: () => <div data-testid='preview'></div>
}))

describe('DepositView', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders setup if preview is false', () => {
    useDepositStore.mockReturnValue({
      isPreview: false
    })

    const { queryByTestId } = render(<DepositView />)
    expect(queryByTestId('setup')).not.toBeNull()
    expect(queryByTestId('preview')).toBeNull()
  })

  it('renders Preview if preview is true', () => {
    useDepositStore.mockReturnValue({
      isPreview: true
    })

    const { queryByTestId } = render(<DepositView />)
    expect(queryByTestId('setup')).toBeNull()
    expect(queryByTestId('preview')).not.toBeNull()
  })
})
