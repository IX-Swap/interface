import { FormActions } from 'app/pages/invest/components/MakeCommitment/FormActions'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('FormActions', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <FormActions showCommit={true} onSubmit={jest.fn()} />
      </Form>
    )
  })

  it('should match snapshot', () => {
    const { container } = render(
      <Form>
        <FormActions showCommit={true} onSubmit={jest.fn()} />
      </Form>
    )

    expect(container).toMatchSnapshot()
  })
})
