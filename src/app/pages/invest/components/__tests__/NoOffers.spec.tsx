import React from 'react'
import { render } from 'test-utils'
import { NoOffers } from 'app/pages/invest/components/NoOffers/NoOffers'

describe('NoOffers', () => {
  it('should match snapshot', () => {
    const { container } = render(<NoOffers />)
    expect(container).toMatchSnapshot()
  })
})
