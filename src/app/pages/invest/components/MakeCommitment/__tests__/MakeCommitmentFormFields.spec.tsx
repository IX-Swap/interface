import { MakeCommitmentFormFields } from 'app/pages/invest/components/MakeCommitment/MakeCommitmentFormFields'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { dso } from '__fixtures__/authorizer'

describe('MakeCommitmentFormFields', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <MakeCommitmentFormFields dso={dso} />
      </Form>
    )
  })

  it('should match snapshot', () => {
    const { container } = render(
      <Form>
        <MakeCommitmentFormFields dso={dso} />
      </Form>
    )

    expect(container).toMatchSnapshot()
  })
})
