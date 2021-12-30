import { ListingHiddenFields } from 'app/pages/exchange/components/ListingForm/ListingHiddenFields'
import { Form } from 'components/form/Form'
import React from 'react'
import { render } from 'test-utils'

describe('ListingHiddenFields', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <Form>
        <ListingHiddenFields />
      </Form>
    )
  })
})
