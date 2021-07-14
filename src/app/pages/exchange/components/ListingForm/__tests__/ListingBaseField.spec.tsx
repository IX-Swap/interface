import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { ListingBaseFields } from 'app/pages/exchange/components/ListingForm/ListingBaseFields'

describe('ListinBaseField', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <ListingBaseFields isLive isNew isDataFromDSO={false} />
      </Form>
    )
  })
})
