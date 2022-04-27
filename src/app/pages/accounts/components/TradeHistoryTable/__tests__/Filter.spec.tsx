import React from 'react'
import { render } from 'test-utils'
import { CreateListing } from 'app/pages/issuance/pages/CreateListing'
import { Filters } from 'app/pages/accounts/components/TradeHistoryTable/Filter'

describe('Filters', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const { container } = render(<Filters />)

    expect(container).toMatchSnapshot()
  })
})
