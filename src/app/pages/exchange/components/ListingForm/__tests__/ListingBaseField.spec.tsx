import { Form } from 'components/form/Form'
import React from 'react'
import { render } from 'test-utils'
import { ListingBaseFields } from 'app/pages/exchange/components/ListingForm/ListingBaseFields'

describe('ListinBaseField', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <Form>
        <ListingBaseFields isLive isNew isDataFromDSO={false} />
      </Form>
    )
  })
})
