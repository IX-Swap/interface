import { ActiveElementContext } from 'app/context/ActiveElementContextWrapper'
import * as useAppBreakpoints from 'hooks/useAppBreakpoints'
import React from 'react'
import { render } from 'test-utils'
import { MobileMenu } from 'ui/CompactTable/MobileMenu'
import { bank } from '__fixtures__/authorizer'

describe('MobileMenu', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('Renders Actions with selected item', async () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isTablet: true
    } as any)
    const actions = jest.fn(() => <></>)
    render(
      <ActiveElementContext.Provider
        value={{
          isIndexOpen: jest.fn(),
          toggleRow: jest.fn(),
          hasOpenIndices: true,
          openIndex: bank._id
        }}
      >
        <MobileMenu
          items={[bank]}
          actions={actions}
          titleExtractor={jest.fn(() => 'test')}
        />
      </ActiveElementContext.Provider>
    )
    expect(actions).toHaveBeenCalledWith(bank)
  })
})
