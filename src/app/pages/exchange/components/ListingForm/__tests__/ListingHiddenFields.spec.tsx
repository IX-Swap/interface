import { ListingHiddenFields } from 'app/pages/exchange/components/ListingForm/ListingHiddenFields'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('ListingHiddenFields', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <ListingHiddenFields />
      </Form>
    )
  })
})
