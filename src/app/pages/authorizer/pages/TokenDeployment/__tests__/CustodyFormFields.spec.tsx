import { CustodyFormFields } from 'app/pages/authorizer/pages/TokenDeployment/CustodyFormFields'
import { Form } from 'components/form/Form'
import React from 'react'
import { render } from 'test-utils'

describe('CustodyFormFields', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <Form defaultValues={{ custody: 'HEX' }}>
        <CustodyFormFields isLoading={false} />
      </Form>
    )
  })

  it('renders button disabled when custody is undefined', () => {
    const { container } = render(
      <Form defaultValues={{ custody: undefined }}>
        <CustodyFormFields isLoading={false} />
      </Form>
    )

    const applyButton = container.querySelector('button')
    expect(applyButton).toBeDisabled()
  })
})
