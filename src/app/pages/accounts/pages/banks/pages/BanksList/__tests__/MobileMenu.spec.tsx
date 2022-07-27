import { ActiveElementContext } from 'app/context/ActiveElementContextWrapper'
import { Actions } from 'app/pages/accounts/pages/banks/pages/BanksList/Actions'
import { MobileMenu } from 'app/pages/accounts/pages/banks/pages/BanksList/MobileMenu'
import * as useAppBreakpoints from 'hooks/useAppBreakpoints'
import React from 'react'
import { render } from 'test-utils'
import { bank } from '__fixtures__/authorizer'

jest.mock('app/pages/accounts/pages/banks/pages/BanksList/Actions', () => ({
  Actions: jest.fn(() => null)
}))

describe('MobileMenu', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('Renders Actions with selected item', async () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isTablet: true
    } as any)
    render(
      <ActiveElementContext.Provider
        value={{
          isIndexOpen: jest.fn(),
          toggleRow: jest.fn(),
          hasOpenIndices: true,
          openIndex: bank._id
        }}
      >
        <MobileMenu items={[bank]} />
      </ActiveElementContext.Provider>
    )
    expect(Actions).toHaveBeenCalledWith(
      expect.objectContaining({
        item: bank
      }),
      {}
    )
  })
})
