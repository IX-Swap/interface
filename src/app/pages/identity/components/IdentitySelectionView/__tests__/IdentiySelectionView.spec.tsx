import { SelectionIdentityCard } from 'app/pages/identity/components/SelectionIdentityCard/SelectionIdentityCard'
import React from 'react'
import { render } from 'test-utils'
import { IdentitySelectionView } from 'app/pages/identity/components/IdentitySelectionView/IdentiySelectionView'

jest.mock(
  'app/pages/identity/components/SelectionIdentityCard/SelectionIdentityCard',
  () => ({
    SelectionIdentityCard: jest.fn(() => null)
  })
)

describe('IdentitySelectionView', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('Calls SelectionIdentityCard with the correct parameters', () => {
    render(<IdentitySelectionView />)

    expect(SelectionIdentityCard).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        title: 'Individual',
        description: 'Suitable for users who are individual investors'
      }),
      {}
    )
    expect(SelectionIdentityCard).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        title: 'Corporate',
        description:
          'Suitable for users who want to invest via a corporate capacity'
      }),
      {}
    )
    expect(SelectionIdentityCard).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        title: 'Issuer',
        description:
          'Suitable for users who want to use platform for fundraising'
      }),
      {}
    )
  })
})
