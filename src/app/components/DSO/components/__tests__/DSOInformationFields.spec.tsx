import React from 'react'
import { DSOInformationFields } from 'app/components/DSO/components/DSOInformationFields'
import { Form } from 'components/form/Form'
import { render } from 'test-utils'

describe('DSOInformationFields', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders DSOInformationFields with no errors', () => {
    render(
      <Form>
        <DSOInformationFields />
      </Form>
    )
  })
})
