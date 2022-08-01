import { ActiveElementContext } from 'app/context/ActiveElementContextWrapper'
import * as useAppBreakpoints from 'hooks/useAppBreakpoints'
import React from 'react'
import { render } from 'test-utils'
import { bank } from '__fixtures__/authorizer'
import { MobileMenu } from 'app/pages/invest/components/SecondaryMarketTable/MobileMenu'

describe('MobileMenu', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('should match snapshot', async () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isTablet: true
    } as any)
    const { container } = render(
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

    expect(container).toMatchSnapshot()
  })
})
