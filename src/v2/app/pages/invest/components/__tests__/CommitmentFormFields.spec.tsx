/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  CommitmentFormFields,
  CommitmentFormFieldsProps
} from 'v2/app/pages/invest/components/CommitmentFormFields'
import { asset } from '__fixtures__/authorizer'
import * as useCommitmentFormHook from 'v2/app/pages/invest/components/CommitmentForm'
import { generateCreateTypedFormResult } from '__fixtures__/createTypedForm'
import { Form } from 'v2/components/form/Form'

describe('CommitmentFormFields', () => {
  const props: CommitmentFormFieldsProps = { symbol: asset.symbol }
  beforeEach(() => {
    jest
      .spyOn(useCommitmentFormHook, 'useCommitmentForm')
      .mockReturnValue(generateCreateTypedFormResult())
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form defaultValues={{ totalAmount: 100, pricePerUnit: 50 }}>
        <CommitmentFormFields {...props} />
      </Form>
    )
  })
})
