import { OfferingTerms } from 'app/components/DSO/MainInfo/OfferingTerms'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { dso } from '__fixtures__/authorizer'

describe('OfferingsTerms', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    const { container } = render(<OfferingTerms dso={dso} />)
    expect(container).toMatchSnapshot()
  })
})
