/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render } from 'test-utils'
import { Listings } from 'v2/app/pages/authorizer/pages/listings/Listings'

describe('Listings', () => {
  it('renders without throwing', async () => {
    render(<Listings />)
  })
})
